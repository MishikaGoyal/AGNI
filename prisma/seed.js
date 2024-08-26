const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      loginId: "principal_user",
      password: "securePassword123",
      role: Role.Principal,
      udiseId: "UDISE123456",
    },
    {
      loginId: "admin_user",
      password: "anotherSecurePassword456",
      role: Role.Admin,
      udiseId: "UDISE789012",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        loginId: user.loginId,
        password: hashedPassword,
        role: user.role,
        udiseId: user.udiseId,
      },
    });
  }

  console.log("Users seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
