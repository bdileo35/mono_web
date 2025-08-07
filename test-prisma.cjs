// Este archivo es una alternativa al 'seed' para ejecutar la lógica de Prisma
// de forma aislada y probar la conexión con la base de datos.
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testPrisma() {
  console.log('--- Iniciando Test de Prisma (versión .cjs) ---');
  
  try {
    // 1. Limpieza de datos
    console.log('Limpiando la base de datos...');
    await prisma.timbre.deleteMany();
    await prisma.direccion.deleteMany();
    await prisma.venta.deleteMany();
    await prisma.usuario.deleteMany();
    console.log('Datos antiguos eliminados.');
    
    // 2. Creación de datos de prueba
    console.log('Creando nuevos datos de prueba...');
    const usuarioVenta = await prisma.usuario.create({
      data: {
        email: 'comprador@test.com',
        nombre: 'Comprador de Prueba',
        rol: 'ADMIN',
      },
    });

    await prisma.venta.create({
      data: {
        idUnico: 'venta-test-pagada',
        email: usuarioVenta.email,
        nombre: usuarioVenta.nombre,
        cantidadTimbres: 5,
        precioUnitario: 100,
        precioTotal: 500,
        estado: 'PAGADA',
        usuarioId: usuarioVenta.id,
      },
    });
    console.log('✅ Venta de prueba creada con idUnico: "venta-test-pagada"');

    const direccionExistente = await prisma.direccion.create({
      data: {
        idUnico: 'qr-demo-existente',
        nombre: 'Edificio Demo',
        calle: 'Av. Siempreviva',
        numero: '742',
        ciudad: 'Springfield',
      },
    });
    console.log('✅ Dirección de demo creada con idUnico: "qr-demo-existente"');

    console.log('\n--- Test de Prisma finalizado con éxito ---');
    console.log('Ahora puedes usar los siguientes IDs en la URL:');
    console.log('-> Para el Wizard: /admin/venta-test-pagada');
    console.log('-> Para el Editor: /admin/qr-demo-existente');

  } catch (e) {
    console.error('❌ Ha ocurrido un error durante el test de Prisma:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma(); 