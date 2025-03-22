import { Product } from "@/interfaces/react-query";
import { addData } from "@/services/react-query-service";
import { cn } from "@/utils";
import { useIsMutating, useMutation } from "@tanstack/react-query";

const MutationComponent = () => {
  const mutation = useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: addData,
  });
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

export default MutationComponent;
