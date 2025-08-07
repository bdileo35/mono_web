import { NextRequest, NextResponse } from 'next/server';

// Simulación de configuración del sistema
let configuracionSistema = {
  precioPorTimbre: '10'
};

// GET: obtener configuración
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idUnico = searchParams.get('idUnico');

    // Si se proporciona idUnico, obtener configuración específica
    if (idUnico) {
      // Aquí iría la lógica para obtener la configuración desde la base de datos
      // Por ahora simulamos la respuesta
      const configuracionSimulada = {
        idUnico,
        userAdmin: 'admin@edificio.com',
        direccionCompleta: 'Av. Corrientes 1234, CABA',
        fechaCreacion: new Date().toISOString(),
        estado: 'ACTIVO'
      };

      return NextResponse.json({
        success: true,
        data: configuracionSimulada
      });
    }

    // Si no se proporciona idUnico, obtener configuración general del sistema
    return NextResponse.json({ 
      success: true, 
      configuracion: configuracionSistema 
    });
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener configuración' }, { status: 500 });
  }
}

// POST: actualizar configuración
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idUnico, userAdmin, password, direccionCompleta, clave, valor } = body;

    // Si es configuración del sistema (precio por timbre)
    if (clave && valor) {
      configuracionSistema[clave as keyof typeof configuracionSistema] = valor;
      return NextResponse.json({
        success: true,
        message: 'Configuración del sistema actualizada'
      });
    }

    // Si es configuración de edificio
    if (!idUnico || !userAdmin || !password || !direccionCompleta) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Aquí iría la lógica para guardar en la base de datos
    // Por ahora simulamos el guardado
    console.log('Guardando configuración:', {
      idUnico,
      userAdmin,
      password: '***', // No logear la contraseña real
      direccionCompleta,
      fechaCreacion: new Date().toISOString()
    });

    // Simular respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Configuración guardada exitosamente',
      data: {
        idUnico,
        userAdmin,
        direccionCompleta,
        fechaCreacion: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error al guardar configuración:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 