import prisma from '@/lib/prisma';
import { Venta } from '@prisma/client';

// Función para generar ID único alfanumérico de 8 caracteres
function generateIdUnico(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface VentaData {
  cantidadTimbres: number;
  precioTotal: number;
  precioUnitario: number;
  email: string;
  nombre: string;
}

export async function simularYCrearVenta(data: VentaData): Promise<Venta> {
  const { cantidadTimbres, precioTotal, precioUnitario, email, nombre } = data;

  // Generar ID único para la venta, asegurando que no exista
  let idUnico;
  let existingVenta;
  do {
    idUnico = generateIdUnico();
    existingVenta = await prisma.venta.findFirst({
      where: { idUnico },
    });
  } while (existingVenta);

  // Crear la venta en la base de datos
  const venta = await prisma.venta.create({
    data: {
      idUnico,
      email: email.trim(),
      nombre: nombre.trim(),
      cantidadTimbres,
      precioUnitario,
      precioTotal,
      estado: 'PAGADA',
      mpPaymentId: `sim_${Date.now()}`,
      mpPreferenceId: `pref_sim_${Date.now()}`,
    },
  });

  return venta;
} 