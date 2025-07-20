import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@buildmas.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@buildmas.com",
    },
  });

  console.log("Seeded user:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
