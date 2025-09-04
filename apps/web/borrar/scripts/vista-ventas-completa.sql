-- ===========================================
-- VISTA COMPLETA: VENTAS CON DIRECCIÓN Y ESTRUCTURA
-- ===========================================

-- VISTA PRINCIPAL: VENTAS CON DIRECCIÓN
CREATE VIEW IF NOT EXISTS v_ventas_principal AS
SELECT 
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Timbre t ON v.idUnico = t.idUnico
GROUP BY v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.nombre, d.calle, d.numero
ORDER BY v.createdAt DESC;

-- VISTA ESTRUCTURA POR IDU
CREATE VIEW IF NOT EXISTS v_estructura_por_venta AS
SELECT 
    e.idUnico,
    e.nombre as piso,
    e.dptos,
    e.orden,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha_creacion,
    COUNT(t.id) as timbres_por_piso,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as pendientes
FROM Estructura e
LEFT JOIN Timbre t ON e.idUnico = t.idUnico AND e.nombre = t.piso
GROUP BY e.id, e.idUnico, e.nombre, e.dptos, e.orden, e.createdAt
ORDER BY e.idUnico, e.orden;

-- VISTA TIMBRES POR ESTRUCTURA
CREATE VIEW IF NOT EXISTS v_timbres_por_estructura AS
SELECT 
    t.idUnico,
    t.piso,
    t.dpto,
    t.nombre as timbre_nombre,
    t.numero,
    t.metodo,
    t.estado,
    t.estadoAsignacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha_creacion,
    CASE 
        WHEN t.numero IS NOT NULL THEN '✅ Configurado'
        ELSE '⏳ Pendiente'
    END as estado_configuracion
FROM Timbre t
ORDER BY t.idUnico, t.piso, t.dpto;

-- CONSULTA PRINCIPAL: VENTA CON SUBVISTAS
-- Esta consulta muestra la jerarquía completa
SELECT 
    'VENTA' as nivel,
    v.idUnico,
    v.cantidadTimbres as cantidad,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha,
    '📋 Venta ' || v.idUnico || ' - ' || d.nombre as descripcion,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Timbre t ON v.idUnico = t.idUnico
WHERE v.idUnico = '1SICAUFN'
GROUP BY v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.nombre

UNION ALL

SELECT 
    'ESTRUCTURA' as nivel,
    e.idUnico,
    COUNT(t.id) as cantidad,
    e.nombre as monto,
    e.dptos as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha,
    '🏗️ Piso ' || e.nombre || ' - ' || e.dptos as descripcion,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados
FROM Estructura e
LEFT JOIN Timbre t ON e.idUnico = t.idUnico AND e.nombre = t.piso
WHERE e.idUnico = '1SICAUFN'
GROUP BY e.id, e.idUnico, e.nombre, e.dptos, e.orden, e.createdAt
ORDER BY e.orden

UNION ALL

SELECT 
    'TIMBRE' as nivel,
    t.idUnico,
    CASE WHEN t.numero IS NOT NULL THEN 1 ELSE 0 END as cantidad,
    t.piso as monto,
    t.dpto as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha,
    '🔔 Timbre ' || t.nombre || ' - ' || COALESCE(t.numero, 'Sin configurar') as descripcion,
    1 as timbres_creados,
    CASE WHEN t.numero IS NOT NULL THEN 1 ELSE 0 END as timbres_configurados
FROM Timbre t
WHERE t.idUnico = '1SICAUFN'
ORDER BY t.piso, t.dpto;
