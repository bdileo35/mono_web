import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { cantidadTimbres, idUnico } = await request.json();

    // Validar datos
    if (!cantidadTimbres || !idUnico) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Calcular precio ($1000 por timbre)
    const precioPorTimbre = 1000;
    const montoTotal = cantidadTimbres * precioPorTimbre;

    // SIMULACIÓN - Sin credenciales reales de MP
    console.log('Simulando creación de preferencia MP...');
    console.log('ID Único:', idUnico);
    console.log('Cantidad timbres:', cantidadTimbres);
    console.log('Monto total:', montoTotal);

    // SIMULAR CREACIÓN EN BD
    console.log('Simulando creación de venta en BD:', idUnico);
    
    // En una implementación real, aquí se guardaría en la BD
    // Por ahora, solo simulamos que se creó correctamente

    // Simular respuesta de MP
    const preferenceId = `pref_${Date.now()}`;
    const initPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;

    console.log('Preferencia creada:', preferenceId);

    return NextResponse.json({
      preferenceId,
      initPoint,
      simulation: true,
      message: 'Simulación de MP - Usa credenciales reales para producción',
      idUnico,
      montoTotal,
      cantidadTimbres
    });

  } catch (error) {
    console.error('Error creando preferencia:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 