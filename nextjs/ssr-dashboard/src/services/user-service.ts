import { getUsersGroupedByMonth } from "@/infraestructure/mongodb/repository/get-users-grouped-by-month";
import { userByMonthMapper } from "@/mappers/user/user-by-month-mapper";

export async function getUserByMonth() {
  const users = await getUsersGroupedByMonth();
  return userByMonthMapper(users);
}
