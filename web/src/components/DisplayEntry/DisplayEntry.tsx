"use client";

import {
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactNode,
  useState,
} from "react";
import KelpIcon from "@/components/KelpIcon";
import useInterval from "@/hooks/interval";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export type DrawerContent = {
  title: string;
  description: string;
  buttonLabel: string;
  icon: string;
  kelpReservedReward: number;
};

export type TaskEntry = {
  icon: string;
  kelpReservedReward: number;
  label: string;
  isDaily?: boolean;
  drawerContent: DrawerContent;
  isDone?: boolean;
};

function DisplayEntry({
  task,
  drawerButtonOnClick,
  ...props
}: {
  task: TaskEntry;
  drawerButtonOnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ComponentPropsWithoutRef<"div">) {
  const [stringTimer, setStringTimer] = useState<string>("");

  useInterval(() => {
    if (!task.isDaily) return;

    const currentTime = new Date();
    const endOfDay = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate() + 1,
      0,
      0,
      0
    );
    const timeLeft = endOfDay.getTime() - currentTime.getTime();

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    setStringTimer(formattedTime);
  }, 1000);

  return (
    <Drawer fixed>
      <DrawerTrigger asChild>
        <div
          className="border p-4 border-white/40 rounded-lg flex gap-4 items-center cursor-pointer transition-all duration-200 bg-transparent hover:bg-gray-700/20"
          {...props}
        >
          <Image
            src={task.icon}
            width={20}
            height={20}
            alt={`${task.label} icon`}
          />

          <div className="flex flex-col">
            <p className="font-medium text-base leading-6">{task.label}</p>
            {task.isDaily && (
              <p className="text-xs text-muted-foreground">Daily task</p>
            )}
          </div>

          <div className="ml-auto flex flex-col gap-2 self-start">
            <div className="flex gap-2 items-center">
              <KelpIcon className="w-[16px] h-[16px] text-kelp-green" />
              <span className="font-medium text-sm leading-4">
                {task.kelpReservedReward}
              </span>
            </div>

            {task.isDaily && <span className="text-xs">{stringTimer}</span>}
          </div>
        </div>
      </DrawerTrigger>

      <DrawerContent className="flex flex-col gap-6 border-none p-2 px-4 pb-4 pt-0 rounded-[20px_20px_0px_0px] bg-primary items-center">
        <div className="flex justify-between w-full p-6 font-anonymous-pro">
          <Image src={task.icon} width={40} height={40} alt="Task icon" />

          <div className="flex items-center gap-3">
            <KelpIcon className="w-[24px] h-[24px] text-kelp-green" />
            <span className="font-medium text-xl">
              {task.kelpReservedReward}
            </span>
          </div>
        </div>

        <h2 className="font-bold text-xl font-anonymous-pro">
          {task.drawerContent.title}
        </h2>

        <p className="font-medium text-xl font-anonymous-pro leading-5 text-center max-w-[333px]">
          {task.drawerContent.description}
        </p>

        <button
          type="button"
          className="w-full px-4 py-3 rounded-[28px] bg-white/40 font-anonymous-pro font-bold text-xl text-white"
          onClick={drawerButtonOnClick}
        >
          {task.drawerContent.buttonLabel}
        </button>
      </DrawerContent>
    </Drawer>
  );
}

export default DisplayEntry;
