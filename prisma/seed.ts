// prisma/seed.ts
import { PrismaClient } from '../apps/web/node_modules/.prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes
  await prisma.venta.deleteMany();
  await prisma.timbre.deleteMany();
  await prisma.estructura.deleteMany();
  await prisma.direccion.deleteMany();
  await prisma.configuracion.deleteMany();

  // Crear configuración inicial
  await prisma.configuracion.upsert({
    where: { clave: 'precioPorTimbre' },
    update: { valor: '6900' },
    create: {
      clave: 'precioPorTimbre',
      valor: '6900',
      descripcion: 'Precio por timbre en pesos argentinos'
    }
  });

  console.log('✅ Configuración inicial creada');
  console.log('🌱 Base de datos completamente limpia. Lista para el flujo de prueba.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
