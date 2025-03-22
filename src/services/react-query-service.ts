import { Product } from "@/interfaces/react-query";

export const fetchData = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://fakestoreapi.com/products?limit=5&offset=${(pageParam - 1) * 5}`
  );
  return res.json();
};

export const addData = async (
  newProduct: Omit<Product, "id">
): Promise<Product> => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
