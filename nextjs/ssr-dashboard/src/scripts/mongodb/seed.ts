import { connect } from "@/infraestructure/mongodb";
import { Payment } from "@/infraestructure/mongodb/models/payment";
import { User } from "@/infraestructure/mongodb/models/user";
import { faker } from "@faker-js/faker";

async function seed() {
  await connect();

  await User.deleteMany({});

  const creators = ["alice", "bob", "charlie"];
  const currentYear = new Date().getFullYear();

  const users = Array.from({ length: 100 }).map(() => {
    const createdBy = faker.helpers.arrayElement(creators);

    return {
      name: faker.person.fullName(),
      email: faker.internet.email({ firstName: createdBy }),
      role: faker.helpers.arrayElement(["admin", "editor", "viewer"]),
      createdBy,
      createdAt: faker.date.between({
        from: new Date(currentYear, 0, 1),
        to: new Date(currentYear, 11, 31),
      }),
    };
  });

  const insertedUsers = await User.insertMany(users);

  const payments = [];

  for (const user of insertedUsers) {
    const paymentPerUser = faker.number.int({ min: 1, max: 100 });
    for (let i = 0; i < paymentPerUser; i++) {
      payments.push({
        user: user._id,
        amount: faker.finance.amount({ min: 10, max: 10000, dec: 2 }),
        status: faker.helpers.arrayElement(["pending", "completed", "failed"]),
        createdAt: faker.date.between({
          from: new Date(currentYear, 0, 1),
          to: new Date(currentYear, 11, 31),
        }),
      });
    }
  }

  await Payment.insertMany(payments);

  console.log(
    `✅ Seeded ${users.length} users and ${payments.length} payments with in ${currentYear}`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
