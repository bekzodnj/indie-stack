import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = singleton("prisma", () => new PrismaClient());
prisma.$queryRaw`PRAGMA journal_mode = WAL;`
  .then(() => {
    console.log("ENABLED WAL MODE FOR DATABASE");
  })
  .catch((err) => {
    console.log("DB SETUP FAILED", err);
    process.exit(1);
  });
prisma.$connect();

export default prisma;

export { prisma };
