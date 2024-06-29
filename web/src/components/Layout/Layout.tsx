"use client";

import { ScreenName, useGeneralStore } from "@/lib/stores/general";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import TasksScreen from "@/components/TasksScreen";
import Image from "next/image";
// import GameApp from "../GameApp";

export type ScreenInformation = {
  key: ScreenName;
  label: string;
  icon: ReactNode;
  render: ReactNode;
};

const screens: Array<ScreenInformation> = [
  {
    key: "tasks",
    label: "Tasks",
    icon: (
      <Image src="/tasks.svg" width={30} height={30} alt="Tasks display icon" />
    ),
    render: <TasksScreen />,
  },
  {
    key: "play",
    label: "Play",
    icon: (
      <Image src="/play.svg" width={30} height={30} alt="Play display icon" />
    ),
    render: <div>play</div>,
    // render: <GameApp />,
  },
  {
    key: "balance",
    label: "Balance",
    icon: (
      <Image
        src="/balance.svg"
        width={30}
        height={30}
        alt="Balance display icon"
      />
    ),
    render: <div>balance</div>,
  },
  {
    key: "friends",
    label: "Friends",
    icon: (
      <Image
        src="/friends.svg"
        width={30}
        height={30}
        alt="Balance display icon"
      />
    ),
    render: <div>friends</div>,
  },
];

function Layout({ children }: { children?: ReactNode }) {
  const { selectedScreen, setSelectedScreen } = useGeneralStore((s) => ({
    selectedScreen: s.selectedScreen,
    setSelectedScreen: s.setSelectedScreen,
  }));
  const screen = screens.find((screen) => screen.key === selectedScreen);

  return (
    <main className="w-[100vw] h-[100vh] flex flex-col bg-primary/80 overflow-hidden">
      {screen ? screen.render : ""}

      {children ? children : ""}

      <nav className="fixed bottom-0 left-0 bg-primary w-full">
        <div className="relative w-full h-full flex justify-between">
          {screens.map((screen, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center justify-center w-full max-w-[96px] border-t-2 p-3 transition-all duration-200 ease-in-out border-transparent opacity-40 cursor-pointer gap-1",
                screen.key === selectedScreen && "border-kelp-green opacity-100"
              )}
              onClick={() => setSelectedScreen(screen.key)}
            >
              {screen.icon}
              <span className="font-anonymous-pro text-sm leading-4">
                {screen.label}
              </span>
            </div>
          ))}

          <div className="absolute -top-[6px] left-0 bg-gradient-to-t from-primary/60 to-transparent h-[6px] w-full" />
        </div>
      </nav>
    </main>
  );
}

export default Layout;
