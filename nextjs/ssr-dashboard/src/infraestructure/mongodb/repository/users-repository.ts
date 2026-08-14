import { User } from "../models/user";

export async function getUsersGroupedByMonth() {
  const users = await User.aggregate([
    {
      $group: {
        _id: {
          createdBy: "$createdBy",
          month: { $dateToString: { format: "%m", date: "$createdAt" } },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        createdBy: "$_id.createdBy",
        month: "$_id.month",
        count: 1,
      },
    },
    { $sort: { month: 1, createdBy: 1 } },
  ]);
  return users;
}
