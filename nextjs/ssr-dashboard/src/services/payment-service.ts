import { getPaymentsPerUsersByMonth } from "@/infraestructure/mongodb/repository/payments-repository";

export async function getPaymentsByMonth() {
  const payments = await getPaymentsPerUsersByMonth();
  return payments;
}
