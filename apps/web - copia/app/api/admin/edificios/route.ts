import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Obtener todas las direcciones con sus timbres y estructura
    const direcciones = await prisma.direccion.findMany({
      include: {
        timbres: true,
        estructura: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calcular estadísticas para cada edificio
    const edificiosConStats = direcciones.map(direccion => {
      const totalTimbres = direccion.timbres.length;
      const timbresActivos = direccion.timbres.filter(t => t.estado === 'activo').length;
      const timbresConfigurados = direccion.timbres.filter(t => t.estadoAsignacion === 'configurado').length;
      
      // Calcular total de departamentos desde la estructura
      const totalDptos = direccion.estructura.reduce((total, piso) => {
        try {
          const dptos = JSON.parse(piso.dptos);
          return total + dptos.length;
        } catch {
          return total;
        }
      }, 0);

      return {
        id: direccion.id,
        idUnico: direccion.idUnico,
        nombre: direccion.nombre,
        calle: direccion.calle,
        numero: direccion.numero,
        ciudad: direccion.ciudad,
        createdAt: direccion.createdAt,
        stats: {
          totalTimbres,
          timbresActivos,
          timbresConfigurados,
          totalDptos,
          cantPisos: direccion.estructura.length
        }
      };
    });

    return NextResponse.json({
      success: true,
      edificios: edificiosConStats
    });

  } catch (error) {
    console.error('Error obteniendo edificios:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener los edificios' },
      { status: 500 }
    );
  }
} 