import {
  IAirdropTaskObject,
  ICompletedTaskInfo,
  TaskStatus,
  TaskType,
} from "./types/airdrop.types";
// import {
//   CrowdSaleEvent,
//   SaleEvent,
//   SaleEventStatus,
// } from '../apis/types/crowdsale.types';
import { getCompletedMultiTaskStep } from "./airdrop";
import DateTimeHelper from "./helpers/DateTimeHelper";

export const parseAirdropTaskListDailyAware = async (
  task: IAirdropTaskObject[],
  address: string,
  includeAllTasks: boolean = false // New optional parameter with a default value of false
) => {
  const completedTasks: Map<String, ICompletedTaskInfo[] | ICompletedTaskInfo> =
    task?.length && task?.[task?.length - 1]
      ? (task?.[task?.length - 1] as any)
      : {};

  task = await handleMultiTask(task, address);

  const sorted = task.sort(function (a, b) {
    return a.attributes?.Order > b.attributes?.Order
      ? 1
      : b.attributes?.Order > a.attributes?.Order
        ? -1
        : 0;
  });

  const incomplete: typeof task = [];
  const complete: typeof task = [];

  const now = DateTimeHelper.getCurrentMoment("en", true);

  sorted.forEach((t) => {
    if (!t?.attributes || t?.attributes?.isStepOfMultiTask) {
      //There are some Items from API that not follow the format(lis)
      return t;
    } else if (
      !includeAllTasks &&
      (t.attributes?.Status === TaskStatus.DISABLED ||
        (!__DEV__ && t.attributes?.Status === TaskStatus.DEVELOPMENT))
    ) {
      // Don't add the task unless includeAllTasks is true
    } else {
      //Auto update isCompleted for daily Task using list completed tasks from BE response
      const checkCompletedTasks = completedTasks?.[t?.id];
      const lastCompletedInfo: ICompletedTaskInfo = Array.isArray(
        checkCompletedTasks
      )
        ? checkCompletedTasks?.sort(
            (a, b) =>
              DateTimeHelper.getMoment(b?.timestamp)?.valueOf() -
              DateTimeHelper.getMoment(a?.timestamp)?.valueOf()
          )?.[0]
        : checkCompletedTasks;

      if (t.attributes?.isDailyTask) {
        t.attributes.isCompleted =
          lastCompletedInfo?.timestamp &&
          DateTimeHelper.getMoment(lastCompletedInfo?.timestamp)
            ?.add(1, "day")
            .isAfter(now);
        t.attributes.lastCompletedAt = lastCompletedInfo?.timestamp;
      }

      // Split data into 2 types
      if (t.attributes?.isCompleted) {
        complete.push(t);
      } else {
        incomplete.push(t);
      }
    }
  });

  return [...incomplete, ...complete].map((t) => {
    return {
      attributes: {
        ...t.attributes,
        id: t.id,
        Logo: t.attributes?.Logo,
      },
      id: t.id,
    };
  });
};

const handleMultiTask = async (
  list: IAirdropTaskObject[],
  referral_id: string
) => {
  //Filter remove task `type` multi and its sub tasks
  let finalList = list?.filter(
    (it) =>
      !it?.attributes?.isStepOfMultiTask &&
      it?.attributes?.Type !== TaskType.MULTI &&
      !it?.attributes?.ids?.length
  );

  const listMultiTasks = list?.filter(
    (it) =>
      it?.attributes?.Type === TaskType.MULTI || it?.attributes?.ids?.length
  );
  const listSubTasks = list?.filter((it) => it?.attributes?.isStepOfMultiTask);

  for (let it of listMultiTasks) {
    const subTasks = it?.attributes?.ids
      ?.map((id) => {
        const idx = listSubTasks?.findIndex((sub) => sub?.id === id);

        if (idx >= 0) {
          return listSubTasks[idx];
        }
        return undefined;
      })
      ?.filter((sub) => !!sub) as IAirdropTaskObject[];
    const completedStep = await getCompletedMultiTaskStep(referral_id, it?.id);

    finalList.push({
      id: it?.id,
      attributes: {
        ...(it?.attributes ?? {}),
        subTasks: subTasks,
        //multiTaskCompletedStep: completedStep,
      },
    });
  }

  return finalList;
};
