import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-4">
        <Link
          href="/react-query"
          className="py-2 px-3 flex justify-center bg-gradient-to-r from-orange-500 to-orange-300 text-white rounded-xl font-semibold text-lg"
        >
          Tanstack React Query
        </Link>
      </div>
    </main>
  );
}
