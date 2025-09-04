-- Script para limpiar todas las tablas y reiniciar
-- ⚠️ ADVERTENCIA: Esto eliminará TODOS los datos

-- 1. Eliminar datos de todas las tablas
DELETE FROM UsuarioTimbre;
DELETE FROM Timbre;
DELETE FROM Estructura;
DELETE FROM Direccion;
DELETE FROM Venta;
DELETE FROM Usuario;
DELETE FROM Configuracion;

-- 2. Reiniciar contadores de ID (si es necesario)
-- DELETE FROM sqlite_sequence WHERE name IN ('Venta', 'Direccion', 'Timbre', 'Estructura', 'Usuario', 'Configuracion', 'UsuarioTimbre');

-- 3. Verificar que las tablas estén vacías
SELECT 'Venta' as tabla, COUNT(*) as registros FROM Venta
UNION ALL
SELECT 'Direccion', COUNT(*) FROM Direccion
UNION ALL
SELECT 'Timbre', COUNT(*) FROM Timbre
UNION ALL
SELECT 'Estructura', COUNT(*) FROM Estructura
UNION ALL
SELECT 'Usuario', COUNT(*) FROM Usuario
UNION ALL
SELECT 'Configuracion', COUNT(*) FROM Configuracion
UNION ALL
SELECT 'UsuarioTimbre', COUNT(*) FROM UsuarioTimbre;

-- 4. Recrear configuración por defecto
INSERT INTO Configuracion (id, clave, valor, descripcion, createdAt, updatedAt)
VALUES (
    'config_precio_default',
    'precioPorTimbre',
    '6900',
    'Precio por timbre en pesos',
    strftime('%s', 'now') * 1000,
    strftime('%s', 'now') * 1000
);

-- 5. Verificar configuración
SELECT clave, valor, descripcion FROM Configuracion;
