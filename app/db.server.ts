import { PrismaClient } from "@prisma/client";

import { singleton } from "./singleton.server";

// Hard-code a unique key, so we can look up the client when this module gets re-imported
const prisma = singleton("prisma", () => new PrismaClient());
prisma.$connect();

// Enable WAL mode and set busy timeout
async function configureDatabase() {
  await prisma.$executeRaw`PRAGMA journal_mode = WAL;`;
  await prisma.$executeRaw`PRAGMA busy_timeout = 5000;`; // Waits up to 5 seconds
}

configureDatabase()
  .then(() => console.log("Database configured with WAL mode and busy timeout"))
  .catch((error) => console.error("Error configuring database:", error));

export default prisma;

export { prisma };
