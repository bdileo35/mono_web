import { NextRequest, NextResponse } from 'next/server';

// Simulación de BD por ahora
let ventasSimuladas: any[] = [];

// GET - Obtener todas las ventas
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ventasSimuladas
    });
  } catch (error) {
    console.error('Error obteniendo ventas:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener ventas' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva venta
export async function POST(request: NextRequest) {
  try {
    const { idUnico, cantidadTimbres, monto, estado = 'PAGADA' } = await request.json();

    if (!idUnico || !cantidadTimbres || !monto) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Crear la venta (simulación)
    const nuevaVenta = {
      id: `venta_${Date.now()}`,
      idUnico,
      cantidadTimbres,
      monto,
      estado,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      direccion: {
        id: `dir_${Date.now()}`,
        idUnico,
        nombre: `Edificio ${idUnico}`,
        calle: 'Pendiente de configuración',
        numero: '',
        ciudad: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timbres: []
      }
    };

    // Agregar a la lista simulada
    ventasSimuladas.unshift(nuevaVenta);

    console.log('Venta creada (simulación):', nuevaVenta.id);

    return NextResponse.json({
      success: true,
      data: nuevaVenta
    });
  } catch (error) {
    console.error('Error creando venta:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear venta' },
      { status: 500 }
    );
  }
} 