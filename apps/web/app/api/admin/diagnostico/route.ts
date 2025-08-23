import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idUnico = searchParams.get('idUnico');

    if (!idUnico) {
      return NextResponse.json({ 
        success: false, 
        error: 'IDU requerido' 
      });
    }

    console.log('🔍 Iniciando diagnóstico para IDU:', idUnico);

    // 1. Obtener venta
    const venta = await prisma.venta.findUnique({
      where: { idUnico },
      include: {
        direccion: {
          include: {
            estructura: {
              orderBy: { orden: 'desc' }
            },
            timbres: {
              orderBy: [
                { piso: 'asc' },
                { dpto: 'asc' }
              ]
            }
          }
        }
      }
    });

    if (!venta) {
      return NextResponse.json({ 
        success: false, 
        error: 'Venta no encontrada' 
      });
    }

    // 2. Formatear fechas para legibilidad
    const formatearFecha = (fecha: Date) => {
      return {
        iso: fecha.toISOString(),
        local: fecha.toLocaleString('es-ES'),
        timestamp: fecha.getTime()
      };
    };

    // 3. Preparar respuesta estructurada
    const diagnostico = {
      venta: {
        id: venta.id,
        idUnico: venta.idUnico,
        cantidadTimbres: venta.cantidadTimbres,
        monto: venta.monto,
        estado: venta.estado,
        createdAt: formatearFecha(venta.createdAt),
        updatedAt: formatearFecha(venta.updatedAt)
      },
      direccion: venta.direccion ? {
        id: venta.direccion.id,
        idUnico: venta.direccion.idUnico,
        nombre: venta.direccion.nombre,
        calle: venta.direccion.calle,
        numero: venta.direccion.numero,
        ciudad: venta.direccion.ciudad,
        createdAt: formatearFecha(venta.direccion.createdAt),
        updatedAt: formatearFecha(venta.direccion.updatedAt),
        estructura: venta.direccion.estructura.map(piso => ({
          id: piso.id,
          nombre: piso.nombre,
          dptos: JSON.parse(piso.dptos),
          orden: piso.orden,
          createdAt: formatearFecha(piso.createdAt)
        })),
        timbres: venta.direccion.timbres.map(timbre => ({
          id: timbre.id,
          nombre: timbre.nombre,
          piso: timbre.piso,
          dpto: timbre.dpto,
          numero: timbre.numero,
          metodo: timbre.metodo,
          estado: timbre.estado,
          esPropio: timbre.esPropio,
          estadoAsignacion: timbre.estadoAsignacion,
          createdAt: formatearFecha(timbre.createdAt),
          updatedAt: formatearFecha(timbre.updatedAt)
        }))
      } : null,
      resumen: {
        totalPisos: venta.direccion?.estructura.length || 0,
        totalTimbres: venta.direccion?.timbres.length || 0,
        timbresConNumero: venta.direccion?.timbres.filter(t => t.numero).length || 0,
        timbresConfigurados: venta.direccion?.timbres.filter(t => t.estadoAsignacion === 'configurado').length || 0
      }
    };

    console.log('✅ Diagnóstico completado para IDU:', idUnico);
    console.log('📊 Resumen:', diagnostico.resumen);

    return NextResponse.json({
      success: true,
      diagnostico
    });

  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
}

