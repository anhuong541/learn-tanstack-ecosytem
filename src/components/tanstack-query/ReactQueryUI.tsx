/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { cn } from "@/utils";
import QueryComponent from "./Query";
import MutationComponent from "./Mutation";
import InfiniteQueryComponent from "./InfiniteQuery";

const ReactQueryHooks: React.FC = () => {
  const [selectedHook, setSelectedHook] = useState("useQuery");

  return (
    <div
      className={cn(
        "flex min-h-screen bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 p-6 text-white"
      )}
    >
      <div
        className={cn(
          "w-1/4 bg-white p-6 rounded-lg shadow-lg text-gray-800 h-[calc(100vh-3rem)]"
        )}
      >
        <h2 className={cn("text-xl font-bold mb-4 text-center")}>
          Select Hook
        </h2>
        {["useQuery", "useMutation", "useInfiniteQuery"].map((hook) => (
          <button
            key={hook}
            className={cn(
              "w-full p-3 my-2 rounded-lg font-semibold transition-all",
              selectedHook === hook
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => setSelectedHook(hook)}
          >
            {hook}
          </button>
        ))}
      </div>
      <div className={cn("w-3/4 px-6")}>
        {selectedHook === "useQuery" && <QueryComponent />}
        {selectedHook === "useMutation" && <MutationComponent />}
        {selectedHook === "useInfiniteQuery" && <InfiniteQueryComponent />}
      </div>
    </div>
  );
};

export default ReactQueryHooks;
