import { Product } from "@/interfaces/react-query";
import { fetchData } from "@/services/react-query-service";
import { cn } from "@/utils";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const QueryComponent = () => {
  const [page, setPage] = useState(1);
  const {
    data: listProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchData({ pageParam: page }),
    // keepPreviousData: true,
  });
  const isFetching = useIsFetching();

  if (isLoading) {
    return (
      <p className={cn("text-gray-100 text-center text-lg")}>Loading...</p>
    );
  }
  if (error) {
    return (
      <p className={cn("text-red-300 text-center text-lg")}>
        Error loading data
      </p>
    );
  }

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
        {listProducts?.map((product: Product, index: number) => (
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

export default QueryComponent;
