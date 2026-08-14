import { Payment } from "../models/payment";

export async function getPaymentsPerUsersByMonth() {
  const results = await Payment.aggregate([
    {
      $group: {
        _id: {
          user: "$user",
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id.user",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $unwind: "$userInfo",
    },
    {
      $project: {
        _id: 0,
        userId: "$_id.user",
        name: "$userInfo.name",
        email: "$userInfo.email",
        year: "$_id.year",
        month: "$_id.month",
        totalAmount: 1,
        count: 1,
      },
    },
    { $sort: { year: 1, month: 1, name: 1 } },
  ]);

  return results;
}
