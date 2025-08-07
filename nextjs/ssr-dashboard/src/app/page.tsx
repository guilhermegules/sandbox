import dynamic from "next/dynamic";

const UserChart = dynamic(() => import("@/components/UserChart"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <UserChart />
      </div>
    </main>
  );
}
