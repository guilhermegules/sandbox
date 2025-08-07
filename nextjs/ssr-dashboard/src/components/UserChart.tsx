"use client";

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

const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

const data = {
  labels,
  datasets: [
    {
      label: "Users",
      data: [5, 10, 6, 8, 12, 15],
      backgroundColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      label: "Payments",
      data: [5, 10, 6, 8, 12, 15],
      backgroundColor: "rgba(59, 246, 130, 0.5)",
    },
  ],
};

export default function UserChart() {
  return <Bar options={options} data={data} />;
}
