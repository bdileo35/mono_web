import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface TimbreConfig {
  id: string;
  piso: string;
  dpto: string;
  numero: string;
  metodo: string;
  estado: string;
  esPropio: boolean;
  estadoAsignacion: string;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ idUnico: string }> }
) {
  const { idUnico } = await params;
  try {
    const { timbres } = await request.json() as { timbres: TimbreConfig[] };
    
    if (!idUnico) {
      return NextResponse.json(
        { success: false, error: 'ID único requerido' },
        { status: 400 }
      );
    }

    if (!timbres || !Array.isArray(timbres) || timbres.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Se requieren timbres para guardar' },
        { status: 400 }
      );
    }

    // Buscar la dirección por ID único
    const direccion = await prisma.direccion.findUnique({
      where: { idUnico: idUnico },
      include: { timbres: true }
    });

    if (!direccion) {
      return NextResponse.json(
        { success: false, error: 'Dirección no encontrada' },
        { status: 404 }
      );
    }

    // Actualizar cada timbre con su configuración
    const timbresActualizados = await Promise.all(
      timbres.map(async (timbreConfig) => {
        const nombreTimbre = `${timbreConfig.piso}${timbreConfig.dpto}`;
        
        // Buscar el timbre existente
        const timbreExistente = direccion.timbres.find(t => t.nombre === nombreTimbre);
        
        if (timbreExistente) {
          // Actualizar timbre existente con la configuración
          return await prisma.timbre.update({
            where: { id: timbreExistente.id },
            data: {
              numero: timbreConfig.numero || null,
              metodo: timbreConfig.metodo || 'mensaje',
              estado: timbreConfig.estado || 'activo',
              esPropio: timbreConfig.esPropio || false,
              estadoAsignacion: timbreConfig.estadoAsignacion || 'libre'
            }
          });
        } else {
          // Crear nuevo timbre con configuración completa
          return await prisma.timbre.create({
            data: {
              nombre: nombreTimbre,
              piso: timbreConfig.piso,
              dpto: timbreConfig.dpto,
              direccionId: direccion.id,
              numero: timbreConfig.numero || null,
              metodo: timbreConfig.metodo || 'mensaje',
              estado: timbreConfig.estado || 'activo',
              esPropio: timbreConfig.esPropio || false,
              estadoAsignacion: timbreConfig.estadoAsignacion || 'libre'
            }
          });
        }
      })
    );

    return NextResponse.json({
      success: true,
      timbres: timbresActualizados,
      message: `${timbresActualizados.length} timbres procesados exitosamente`
    });

  } catch (error) {
    console.error('Error guardando timbres:', error);
    return NextResponse.json(
      { success: false, error: 'Error al guardar los timbres' },
      { status: 500 }
    );
  }
} 