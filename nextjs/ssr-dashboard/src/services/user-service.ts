import { getUsersGroupedByMonth } from "@/infraestructure/mongodb/repository/users-repository";
import { userByMonthMapper } from "@/mappers/user/user-by-month-mapper";

export async function getUserByMonth() {
  const users = await getUsersGroupedByMonth();
  return userByMonthMapper(users);
}
