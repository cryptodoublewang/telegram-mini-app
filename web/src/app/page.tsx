"use client";

import Layout from "@/components/Layout";
import { useWebAppChat, useWebAppUser } from "@/hooks/telegram";
import {
  registerTMAUser,
  getUserTaskInfo,
  getAirdropTasks,
  markTaskAsComplete,
  subscribeEmailList,
} from "./utils/airdrop";
import { useEffect } from "react";

export default function Home() {
  const chat = useWebAppChat();
  const user = useWebAppUser();

  console.log({ chat, user });
  const testTask = async () => {
    let newUser = await registerTMAUser(user?.username || "123", "123456");
    if (!newUser) {
      newUser = await getUserTaskInfo(user?.username || "123");
    }
    console.log(newUser);
    const completedTask = await markTaskAsComplete("123456", 1);
    console.log(completedTask);

    const userDetail = await getAirdropTasks("123456", true);
    console.log(userDetail);

    const subscribe = await subscribeEmailList("123456", "test@test.com");
    console.log(subscribe);
  };

  useEffect(() => {
    testTask();
  }, []);
  return <Layout />;
}
