const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      loginId: "principal0",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  910",
    },
    {
      loginId: "principal1",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  915",
    },
    {
      loginId: "principal2",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  917",
    },
    {
      loginId: "principal3",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  920",
    },
    {
      loginId: "principal4",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  924",
    },
    {
      loginId: "principal5",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  926",
    },
    {
      loginId: "principal6",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  928",
    },
    {
      loginId: "principal7",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  929",
    },
    {
      loginId: "principal8",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  930",
    },
    {
      loginId: "principal9",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  931",
    },
    {
      loginId: "principal10",
      password: "abcdefgh",
      role: Role.Principal,
      udiseId: "29  20  01  23  934",
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
