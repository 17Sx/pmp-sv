import { PrismaClient } from '@prisma/client';

// Déclare une variable globale pour PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Initialise PrismaClient
const prisma = global.prisma || new PrismaClient();

// En développement, on garde une instance dans l'objet global pour éviter 
// de multiples instances de Prisma Client pendant le Hot Reload
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma; 