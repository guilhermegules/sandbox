import { connect } from "@/infraestructure/mongodb";
import { getUserByMonth } from "@/services/user-service";
import dynamic from "next/dynamic";

const UserChart = dynamic(() => import("@/components/UserChart"));

export default async function Home() {
  await connect();

  const users = await getUserByMonth();

  const usersChartData = Array.from({ length: 12 }, (_, i) => i + 1).map(
    (month) => {
      const userAddInTheMonth = users.find((user) => user.month === month);
      if (userAddInTheMonth) return userAddInTheMonth.count;
      return 0;
    }
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <UserChart users={usersChartData} />
      </div>
    </main>
  );
}
