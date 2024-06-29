"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Experience } from "./_components/Experience";

import { KeyboardControls } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { UI } from "./_components/UI";
import { AudioManagerProvider } from "./hooks/useAudioManager";
import { GameStateProvider } from "./hooks/useGameState";
import { insertCoin } from "playroomkit";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function GameApp() {
  const [responseInsertCoin, setResponseInsertCoin] = useState(undefined);

  useEffect(() => {
    const handleInsertCoin = () => {
      insertCoin({
        skipLobby: true,
        gameId: "Nrkxf84kYcXG6I3RY6sJ",
        discord: true,
      })
        .then((response) => {
          console.log("Coin inserted successfully:", response);
          setResponseInsertCoin(true);
        })
        .catch((error) => {
          console.error("Error inserting coin:", error);
        });
    };
    handleInsertCoin();
  }, []);

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  if (!responseInsertCoin) {
    return null;
  }

  return (
    <KeyboardControls map={map}>
      <AudioManagerProvider>
        <GameStateProvider>
          <Canvas shadows camera={{ position: [0, 16, 10], fov: 42 }}>
            <color attach="background" args={["#041c0b"]} />
            <Physics>
              <Experience />
            </Physics>
          </Canvas>
          <UI />
        </GameStateProvider>
      </AudioManagerProvider>
    </KeyboardControls>
  );
}

export default GameApp;
