-- Script para formatear fechas en DBeaver
-- Ejecutar estas consultas para ver fechas legibles

-- 1. Ventas con fechas formateadas
SELECT 
    id,
    idUnico,
    cantidadTimbres,
    monto,
    estado,
    datetime(createdAt/1000, 'unixepoch', 'localtime') as fecha_creacion,
    datetime(updatedAt/1000, 'unixepoch', 'localtime') as fecha_actualizacion
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
    datetime(createdAt/1000, 'unixepoch', 'localtime') as fecha_creacion,
    datetime(updatedAt/1000, 'unixepoch', 'localtime') as fecha_actualizacion
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
    datetime(createdAt/1000, 'unixepoch', 'localtime') as fecha_creacion,
    datetime(updatedAt/1000, 'unixepoch', 'localtime') as fecha_actualizacion
FROM Timbre
ORDER BY createdAt DESC;

-- 4. Estructura con fechas formateadas
SELECT 
    id,
    direccionId,
    nombre,
    dptos,
    orden,
    datetime(createdAt/1000, 'unixepoch', 'localtime') as fecha_creacion
FROM Estructura
ORDER BY createdAt DESC;

-- 5. Configuración con fechas formateadas
SELECT 
    id,
    clave,
    valor,
    descripcion,
    datetime(createdAt/1000, 'unixepoch', 'localtime') as fecha_creacion,
    datetime(updatedAt/1000, 'unixepoch', 'localtime') as fecha_actualizacion
FROM Configuracion
ORDER BY createdAt DESC;

-- 6. Vista completa de venta con detalles
SELECT 
    v.idUnico as venta_idu,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    datetime(v.createdAt/1000, 'unixepoch', 'localtime') as fecha_venta,
    d.nombre as direccion,
    d.calle,
    d.numero,
    d.ciudad,
    datetime(d.createdAt/1000, 'unixepoch', 'localtime') as fecha_direccion,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.id, d.id
ORDER BY v.createdAt DESC;

