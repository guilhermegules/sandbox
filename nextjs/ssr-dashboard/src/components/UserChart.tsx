"use client";

import { User } from "@/types/user";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Usuários e pagamentos por Mês" },
  },
};

function getMonthNames(
  locale = "en-US",
  format:
    | "long"
    | "numeric"
    | "2-digit"
    | "short"
    | "narrow"
    | undefined = "short"
) {
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: format }).format(new Date(2000, i))
  );
}

const labels = getMonthNames();

type UserChartProps = {
  users: number[];
};

export default function UserChart({ users }: UserChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: users,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Payments",
        data: [],
        backgroundColor: "rgba(59, 246, 130, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
