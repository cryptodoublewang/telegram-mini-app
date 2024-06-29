"use client";

import KelpIcon from "@/components/KelpIcon";
import DisplayEntry, { TaskEntry } from "@/components/DisplayEntry";

const exampleTasks: Array<TaskEntry> = [
  {
    label: "Follow @kelpfinance",
    isDaily: true,
    kelpReservedReward: 712,
    icon: "/twitter.svg",
    drawerContent: {
      title: "Follow Kelp Twitter",
      description: "Follow Kelp twitter for the latest updates and news.",
      buttonLabel: "Follow on Twitter",
      icon: "/twitter.svg",
      kelpReservedReward: 712,
    },
  },
  {
    label: "Follow @kelpfinance",
    kelpReservedReward: 888,
    icon: "/instagram.svg",
    drawerContent: {
      title: "Follow Kelp Instagram",
      description:
        "Follow us on instagram for the latest updates and news along with exclusive deals",
      buttonLabel: "Follow on Instagram",
      icon: "/instagram.svg",
      kelpReservedReward: 888,
    },
  },
  {
    label: "Join @kelpannouncement",
    kelpReservedReward: 1024,
    icon: "/telegram.svg",
    drawerContent: {
      title: "Join Telegram Channel",
      description:
        "Join our Telegram community channel for early access to news on new features, exclusive deals.",
      buttonLabel: "Join Telegram",
      icon: "/telegram.svg",
      kelpReservedReward: 1024,
    },
  },
];

function TasksScreen() {
  const tasksNumber = exampleTasks.length;

  return (
    <div className="relative w-full h-[calc(100vh_-_100px] overflow-auto">
      <section className="w-full min-h-full flex flex-col py-8 px-5 items-center justify-center gap-6 font-anonymous-pro animate-fade-in-fast mb-[100px]">
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <KelpIcon className="min-w-[64px] min-h-[64px] text-kelp-green" />
          <h1 className="font-bold text-xl leading-6">{`${tasksNumber} tasks available`}</h1>
        </div>

        <p className="leading-5 text-base text-center max-w-[333px]">
          To build the next global currency, we are offering ways to reserve
          Kelp. The more you participate, the more Kelp you can reserve. Check
          back daily for ways you can be part of the global Kelp community!
        </p>

        <div className="flex flex-col gap-6 w-full min-h-full">
          <div className="flex w-full justify-between items-end">
            <h2 className="text-xl leading-6">Tasks</h2>
            <span className="text-kelp-green text-base leading-4">History</span>
          </div>

          {exampleTasks.map((task, index) => (
            <DisplayEntry key={index} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TasksScreen;
