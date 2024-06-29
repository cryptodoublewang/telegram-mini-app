import axios, { AxiosInstance } from "axios";

import { httpsAgent, StrapiBaseUrl } from "./constants/Urls";
import { parseAirdropTaskListDailyAware } from "./parser";

// import {
//   STORAGE_SERVICE_KEYS,
//   StorageService,
// } from "../services/StorageService";
//import StringHelper from "./helpers/StringHelper";
import { IUserAirdropCampaignData } from "./types/airdrop.types";

export const airdropAPI: AxiosInstance = axios.create({
  baseURL: StrapiBaseUrl,
  timeout: 10000,
  httpsAgent,
  headers: {
    Accept: "application/json",
  },
});

export const getAirdropTasks = async (
  referral_id: string,
  bothDevAndProd?: boolean
) => {
  const includeDevAndProd = bothDevAndProd;
  try {
    const { data } = await airdropAPI.post(
      `/tma/user-details/${referral_id}`,
      includeDevAndProd ? {} : { data: { task_status: "production" } },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
      }
    );
    if (data) {
      //return parsed data. It should be changed according to the backend services.
      // const parsedData = await parseAirdropTaskListDailyAware(
      //   data,
      //   address,
      //   includeDevAndProd
      // );
      // return parsedData;
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message ?? "Failed to complete task";
    console.error(errorMessage);
    return null;
  }
};

export const getUserTaskInfo = async (tg_user_id: string) => {
  const { data } = await airdropAPI.get<IUserAirdropCampaignData>(
    `/tma-users?filters[tg_user_id][$eq]=${tg_user_id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );

  if (data) {
    return data;
  }
};

export const markTaskAsComplete = async (referral_id: string, id: number) => {
  try {
    const { data } = await airdropAPI.post(
      `/tma/action-completed/${referral_id}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
      }
    );

    if (data) {
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message ?? "Failed to complete task";
    console.error(errorMessage);
    return null;
    //throw new Error(errorMessage);
  }
};
export const registerTMAUser = async (
  tg_user_id: string,
  referral_id: string
) => {
  try {
    const { data } = await airdropAPI.post(
      "/tma/register",
      { data: { tg_user_id, referral_id } },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
      }
    );
    if (data) {
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message ?? "Failed to register a new user";
    console.error(errorMessage);
    return null;
    //throw new Error(errorMessage);
  }
};

export const subscribeEmailList = async (
  referral_id: string,
  email: string
) => {
  try {
    const { data } = await airdropAPI.post(
      `tma/subscribe-email/${referral_id}`,
      { data: { email } },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        },
      }
    );
    if (data) {
      return data;
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error?.message ?? "Email subscription failed";
    console.error(errorMessage);
    return null;
    //throw new Error(errorMessage);
  }
};

export const getVerifyCredit = async (address: string) => {
  const { data } = await airdropAPI.get(
    `airdrop-campaign-v2/verify-credit/${address}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    }
  );

  if (data) {
    return data;
  }
};

export const saveCompletedMultiTaskStep = async (
  tg_user_id: string,
  taskId: string,
  step: number
) => {
  //This should be replaced with new services according to the backend
  // return StorageService.saveString(
  //   STORAGE_SERVICE_KEYS.MULTI_TASK_COMPLETED_STEP(address, taskId),
  //   step?.toString()
  // );
};
export const getCompletedMultiTaskStep = async (
  referral_id: string,
  taskId: string
) => {
  //This should be replaced with new service according to the backend.
  // return StringHelper
  //   .safeCastToNumber
  // await StorageService.loadString(
  //   STORAGE_SERVICE_KEYS.MULTI_TASK_COMPLETED_STEP(address, taskId)
  // )
  //();
};
