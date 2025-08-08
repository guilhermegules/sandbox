import { connect } from "@/infraestructure/mongodb";
import { User } from "@/infraestructure/mongodb/models/user";
import { faker } from "@faker-js/faker";

async function seed() {
  await connect();

  await User.deleteMany({});

  const creators = ["alice", "bob", "charlie"];
  const currentYear = new Date().getFullYear();

  const docs = Array.from({ length: 100 }).map(() => {
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

  await User.insertMany(docs);

  console.log(`✅ Seeded ${docs.length} users with in ${currentYear}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
