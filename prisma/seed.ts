// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const venta = await prisma.venta.create({
    data: {
      fecha: new Date(),
      monto: 9990,
      idProducto: 1, // asegurate de tener un producto con ID 1
      idUnico: 'qr_abc123',
      cantidadTimbres: 10,
    },
  });

  for (let i = 1; i <= 10; i++) {
    await prisma.timbre.create({
      data: {
        nombre: `Timbre ${i}`,
        usuario: `usuario${i}@correo.com`,
        idVenta: venta.id,
      },
    });
  }

  console.log('🌱 Datos de prueba insertados correctamente.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
