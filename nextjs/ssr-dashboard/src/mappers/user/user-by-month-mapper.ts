import { User } from "@/types/user";

export function userByMonthMapper(users: User[]) {
  return users.map((user) => ({
    ...user,
    month: Number(user.month),
  }));
}
