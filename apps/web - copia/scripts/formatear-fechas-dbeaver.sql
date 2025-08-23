-- Script para formatear fechas en DBeaver
-- Ejecutar estas consultas para ver fechas legibles en formato YYYY-MM-DD HH:MM:SS

-- 1. Ventas con fechas formateadas
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

-- 2. Direcciones con fechas formateadas
SELECT 
    id,
    idUnico,
    nombre,
    calle,
    numero,
    ciudad,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Direccion
ORDER BY createdAt DESC;

-- 3. Timbres con fechas formateadas
SELECT 
    id,
    nombre,
    piso,
    dpto,
    numero,
    metodo,
    estado,
    estadoAsignacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Timbre
ORDER BY createdAt DESC;

-- 4. Estructura con fechas formateadas
SELECT 
    id,
    direccionId,
    nombre,
    dptos,
    orden,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Estructura
ORDER BY createdAt DESC;

-- 5. Configuración con fechas formateadas
SELECT 
    id,
    clave,
    valor,
    descripcion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Configuracion
ORDER BY createdAt DESC;

-- 6. Vista completa de venta con detalles y fechas legibles
SELECT 
    v.idUnico as venta_idu,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion,
    d.calle,
    d.numero,
    d.ciudad,
    strftime('%Y-%m-%d %H:%M:%S', datetime(d.createdAt/1000, 'unixepoch')) as fecha_direccion,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.id, d.id
ORDER BY v.createdAt DESC;

-- 7. Verificar duplicados de ventas
SELECT 
    idUnico,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id) as ids_duplicados
FROM Venta
GROUP BY idUnico
HAVING COUNT(*) > 1;

-- 8. Verificar duplicados de direcciones
SELECT 
    idUnico,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id) as ids_duplicados
FROM Direccion
GROUP BY idUnico
HAVING COUNT(*) > 1;

-- 9. Contar registros por tabla
SELECT 'Venta' as tabla, COUNT(*) as registros FROM Venta
UNION ALL
SELECT 'Direccion', COUNT(*) FROM Direccion
UNION ALL
SELECT 'Timbre', COUNT(*) FROM Timbre
UNION ALL
SELECT 'Estructura', COUNT(*) FROM Estructura
UNION ALL
SELECT 'Configuracion', COUNT(*) FROM Configuracion;

-- 10. Verificar la venta específica 1SICAUFN
SELECT 
    v.idUnico as venta_idu,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion,
    d.calle,
    d.numero,
    d.ciudad,
    strftime('%Y-%m-%d %H:%M:%S', datetime(d.createdAt/1000, 'unixepoch')) as fecha_direccion,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId
WHERE v.idUnico = '1SICAUFN'
GROUP BY v.id, d.id;
