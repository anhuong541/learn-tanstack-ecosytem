import { Product } from "@/interfaces/react-query";
import { fetchData } from "@/services/react-query-service";
import { cn } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";

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
        {data?.pages.flat().map((product: Product, index: number) => (
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

export default InfiniteQueryComponent;
