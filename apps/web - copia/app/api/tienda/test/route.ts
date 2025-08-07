import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar variables de entorno
    const accessToken = process.env.MP_ACCESS_TOKEN;
    const publicKey = process.env.MP_PUBLIC_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return NextResponse.json({
      status: 'ok',
      config: {
        hasAccessToken: !!accessToken,
        hasPublicKey: !!publicKey,
        hasBaseUrl: !!baseUrl,
        accessTokenPrefix: accessToken?.substring(0, 5) + '...',
        baseUrl
      },
      message: 'Endpoint de prueba funcionando'
    });

  } catch (error) {
    console.error('Error en test:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
} 