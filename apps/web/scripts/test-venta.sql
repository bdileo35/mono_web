-- Script de prueba para verificar ventas
-- Ejecutar después de crear una venta para verificar que se guardó correctamente

-- 1. Verificar todas las ventas
SELECT 
    id,
    idUnico,
    cantidadTimbres,
    monto,
    estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion,
    direccionId
FROM Venta
ORDER BY createdAt DESC;

-- 2. Verificar direcciones relacionadas
SELECT 
    d.id,
    d.idUnico,
    d.nombre,
    d.calle,
    d.numero,
    d.ciudad,
    strftime('%Y-%m-%d %H:%M:%S', datetime(d.createdAt/1000, 'unixepoch')) as fecha_creacion,
    COUNT(v.id) as ventas_asociadas
FROM Direccion d
LEFT JOIN Venta v ON d.id = v.direccionId
GROUP BY d.id
ORDER BY d.createdAt DESC;

-- 3. Verificar que no hay duplicados de IDU
SELECT 
    idUnico,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id) as ids_duplicados
FROM Venta
GROUP BY idUnico
HAVING COUNT(*) > 1;

-- 4. Verificar que no hay duplicados de IDU en direcciones
SELECT 
    idUnico,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id) as ids_duplicados
FROM Direccion
GROUP BY idUnico
HAVING COUNT(*) > 1;

-- 5. Verificar relación venta-dirección
SELECT 
    v.idUnico as venta_idu,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    d.idUnico as direccion_idu,
    d.nombre as direccion_nombre,
    d.calle,
    d.numero,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
ORDER BY v.createdAt DESC;

-- 6. Contar registros por tabla
SELECT 'Venta' as tabla, COUNT(*) as registros FROM Venta
UNION ALL
SELECT 'Direccion', COUNT(*) FROM Direccion
UNION ALL
SELECT 'Timbre', COUNT(*) FROM Timbre
UNION ALL
SELECT 'Estructura', COUNT(*) FROM Estructura
UNION ALL
SELECT 'Configuracion', COUNT(*) FROM Configuracion;
