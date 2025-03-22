/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useIsFetching,
  useIsMutating,
} from "@tanstack/react-query";
import { cn } from "@/utils";

const fetchData = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://fakestoreapi.com/products?limit=5&offset=${(pageParam - 1) * 5}`
  );
  return res.json();
};

const addData = async (newProduct) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

const HooksDemo: React.FC = () => {
  const [selectedHook, setSelectedHook] = useState("useQuery");

  return (
    <div
      className={cn(
        "flex min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white"
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

const QueryComponent = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchData({ pageParam: page }),
    // keepPreviousData: true,
  });
  const isFetching = useIsFetching();

  if (isLoading)
    return (
      <p className={cn("text-gray-100 text-center text-lg")}>Loading...</p>
    );
  if (error)
    return (
      <p className={cn("text-red-300 text-center text-lg")}>
        Error loading data
      </p>
    );

  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-lg text-gray-900")}>
      <h3 className={cn("text-xl font-semibold mb-1 text-center")}>
        Products - Page {page}
      </h3>
      <p
        className={cn(
          "text-lg text-center mb-3",
          isFetching ? "text-yellow-500" : "text-green-500"
        )}
      >
        {isFetching ? "Fetching data..." : "No active fetch"}
      </p>
      <ul className={cn("grid grid-cols-2 gap-4 mb-4")}>
        {data?.map((product, index: number) => (
          <li
            key={index}
            className={cn(
              "p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-xl transition-all"
            )}
          >
            <img
              src={product.image}
              alt={product.title}
              className={cn("h-32 mx-auto rounded-md")}
            />
            <h3 className={cn("text-lg font-semibold mt-2 text-center")}>
              {product.title}
            </h3>
            <p className={cn("text-gray-600 text-center font-medium")}>
              ${product.price}
            </p>
          </li>
        ))}
      </ul>
      <div className={cn("flex justify-center items-center mt-4 space-x-4")}>
        <button
          className={cn(
            "bg-blue-500 text-white p-3 rounded-lg font-semibold transition-all",
            page === 1 && "bg-gray-400"
          )}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className={cn("text-gray-900 text-lg font-semibold")}>
          Page {page}
        </span>
        <button
          className={cn(
            "bg-blue-500 text-white p-3 rounded-lg font-semibold transition-all"
          )}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const MutationComponent = () => {
  const mutation = useMutation({ mutationFn: addData });
  const isMutating = useIsMutating();

  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg shadow-lg text-gray-900 text-center"
      )}
    >
      <h3 className={cn("text-xl font-semibold mb-4")}>Add a New Product</h3>
      <button
        onClick={() =>
          mutation.mutate({
            title: "New Product",
            price: 29.99,
            description: "A new amazing product",
            category: "electronics",
            image: "https://via.placeholder.com/150",
          })
        }
        disabled={mutation.isPending}
        className={cn(
          "bg-green-500 text-white p-3 rounded-lg w-full font-semibold transition-all",
          mutation.isPending && "bg-gray-400"
        )}
      >
        {mutation.isPending ? "Adding..." : "Add Product"}
      </button>
      {mutation.isSuccess && (
        <p className={cn("text-green-500 mt-4 font-medium")}>
          Product added successfully!
        </p>
      )}
      <p
        className={cn(
          "text-lg text-center",
          isMutating ? "text-yellow-500" : "text-green-500"
        )}
      >
        {isMutating ? "Mutating data..." : "No active mutation"}
      </p>
    </div>
  );
};

const InfiniteQueryComponent = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["infiniteProducts"],
    initialPageParam: 1,
    queryFn: fetchData,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
  });
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg shadow-lg text-gray-900 text-center"
      )}
    >
      <h3 className={cn("text-xl font-semibold mb-4")}>Infinite Query</h3>
      <ul className={cn("grid grid-cols-2 gap-4 mb-4")}>
        {data?.pages.flat().map((product, index: number) => (
          <li
            key={index}
            className={cn(
              "p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-xl transition-all"
            )}
          >
            <img
              src={product.image}
              alt={product.title}
              className={cn("h-32 mx-auto rounded-md")}
            />
            <h3 className={cn("text-lg font-semibold mt-2 text-center")}>
              {product.title}
            </h3>
            <p className={cn("text-gray-600 text-center font-medium")}>
              ${product.price}
            </p>
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "bg-blue-500 text-white p-3 rounded-lg w-full font-semibold transition-all"
        )}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        Load More
      </button>
    </div>
  );
};

export default HooksDemo;
