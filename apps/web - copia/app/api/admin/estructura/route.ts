import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Direccion {
  calle: string;
  numero: string;
  ciudad?: string;
}

interface PisoConfig {
  nombre: string;
  dptos: string[];
}

// Función para generar ID único alfanumérico de 8 caracteres
function generateIdUnico(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { direccion, estructura } = await request.json() as { direccion: Direccion; estructura: PisoConfig[] };
    
    // Validar datos requeridos
    if (!direccion?.calle || !direccion?.numero) {
      return NextResponse.json(
        { success: false, error: 'La dirección debe incluir calle y número' },
        { status: 400 }
      );
    }

    if (!estructura || !Array.isArray(estructura) || estructura.length === 0) {
      return NextResponse.json(
        { success: false, error: 'La estructura debe ser un array no vacío' },
        { status: 400 }
      );
    }

    // Generar ID único y asegurarse que no exista
    let idUnico;
    let existingDireccion;
    do {
      idUnico = generateIdUnico();
      existingDireccion = await prisma.direccion.findUnique({
        where: { idUnico }
      });
    } while (existingDireccion);

    // Crear la dirección con todos los campos
    const direccionCreada = await prisma.direccion.create({
      data: {
        idUnico,
        nombre: `${direccion.calle} ${direccion.numero}`,
        calle: direccion.calle,
        numero: direccion.numero,
        ciudad: direccion.ciudad || null,
        estructura: {
          create: estructura.map((piso, index) => ({
            nombre: piso.nombre,
            dptos: JSON.stringify(piso.dptos.filter(d => d.trim())), // Guardar como JSON string
            orden: estructura.length - index // Orden inverso para mostrar PB primero
          }))
        },
        timbres: {
          create: estructura.flatMap(piso => 
            piso.dptos
              .filter(dpto => dpto.trim()) // Solo crear timbres para departamentos no vacíos
              .map(dpto => ({
                nombre: `${piso.nombre}${dpto}`,
                piso: piso.nombre,
                dpto: dpto
              }))
          )
        }
      },
      include: {
        timbres: true,
        estructura: {
          orderBy: { orden: 'desc' }
        }
      }
    });

    return NextResponse.json({
      success: true,
      direccion: direccionCreada,
    });

  } catch (error) {
    console.error('Error guardando estructura:', error);
    return NextResponse.json(
      { success: false, error: 'Error al guardar la estructura' },
      { status: 500 }
    );
  }
} 