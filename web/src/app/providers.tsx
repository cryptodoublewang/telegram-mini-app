"use client";

import { SDKProvider } from "@tma.js/sdk-react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // @ts-ignore
    <SDKProvider acceptCustomStyles debug>
      {children}
    </SDKProvider>
  );
}
