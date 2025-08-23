-- Crear vistas para mostrar fechas automáticamente formateadas
-- Ejecutar estas consultas en DBeaver para crear vistas permanentes

-- Vista para ventas con fechas formateadas
CREATE VIEW IF NOT EXISTS v_ventas_formateadas AS
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

-- Vista para direcciones con fechas formateadas
CREATE VIEW IF NOT EXISTS v_direcciones_formateadas AS
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

-- Vista para timbres con fechas formateadas
CREATE VIEW IF NOT EXISTS v_timbres_formateados AS
SELECT 
    id,
    nombre,
    piso,
    dpto,
    numero,
    metodo,
    estado,
    estadoAsignacion,
    direccionId,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Timbre
ORDER BY createdAt DESC;

-- Vista para estructura con fechas formateadas
CREATE VIEW IF NOT EXISTS v_estructura_formateada AS
SELECT 
    id,
    direccionId,
    nombre,
    dptos,
    orden,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Estructura
ORDER BY createdAt DESC;

-- Vista para configuración con fechas formateadas
CREATE VIEW IF NOT EXISTS v_configuracion_formateada AS
SELECT 
    id,
    clave,
    valor,
    descripcion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Configuracion
ORDER BY createdAt DESC;

-- Vista completa de ventas con detalles
CREATE VIEW IF NOT EXISTS v_ventas_completas AS
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

-- Verificar que las vistas se crearon correctamente
SELECT name FROM sqlite_master WHERE type='view' AND name LIKE 'v_%';

