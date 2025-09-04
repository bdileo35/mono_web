-- ===========================================
-- VISTAS SQL PARA PANEL DE ADMINISTRACIÓN
-- ===========================================

-- VISTA 1: VENTAS CON DIRECCIÓN COMPLETA
CREATE VIEW IF NOT EXISTS v_ventas_con_direccion AS
SELECT 
    v.id,
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    d.ciudad,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.id, v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.nombre, d.calle, d.numero, d.ciudad
ORDER BY v.createdAt DESC;

-- VISTA 2: ESTRUCTURA CON TIMBRES AGRUPADOS POR PISO
CREATE VIEW IF NOT EXISTS v_estructura_timbres_por_piso AS
SELECT 
    e.id as estructura_id,
    e.nombre as piso,
    e.dptos,
    e.orden,
    d.idUnico,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes,
    GROUP_CONCAT(t.nombre, ', ') as timbres_lista,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Estructura e
LEFT JOIN Direccion d ON e.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId AND e.nombre = t.piso
GROUP BY e.id, e.nombre, e.dptos, e.orden, d.idUnico, d.nombre, d.calle, d.numero
ORDER BY d.idUnico, e.orden;

-- VISTA 3: RESUMEN COMPLETO POR IDU
CREATE VIEW IF NOT EXISTS v_resumen_completo AS
SELECT 
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    COUNT(DISTINCT e.id) as total_pisos,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes,
    ROUND((COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) * 100.0 / COUNT(t.id)), 2) as porcentaje_configurado
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Estructura e ON d.id = e.direccionId
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.nombre, d.calle, d.numero
ORDER BY v.createdAt DESC;

-- ===========================================
-- VISTAS JERÁRQUICAS PARA DBeaver
-- ===========================================

-- VISTA PRINCIPAL: DIRECCIONES CON RESUMEN
CREATE VIEW IF NOT EXISTS v_direcciones_principal AS
SELECT 
    d.id as direccion_id,
    d.idUnico,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    d.ciudad,
    strftime('%Y-%m-%d %H:%M:%S', datetime(d.createdAt/1000, 'unixepoch')) as fecha_creacion,
    COUNT(DISTINCT e.id) as total_pisos,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes
FROM Direccion d
LEFT JOIN Estructura e ON d.id = e.direccionId
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY d.id, d.idUnico, d.nombre, d.calle, d.numero, d.ciudad, d.createdAt
ORDER BY d.createdAt DESC;

-- VISTA HIJA: ESTRUCTURA POR DIRECCIÓN
CREATE VIEW IF NOT EXISTS v_estructura_hija AS
SELECT 
    e.id as estructura_id,
    e.nombre as piso,
    e.dptos,
    e.orden,
    COUNT(t.id) as timbres_en_piso,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as configurados_en_piso,
    GROUP_CONCAT(t.dpto || CASE WHEN t.numero IS NOT NULL THEN ' (' || t.metodo || ')' ELSE '' END, ', ') as departamentos
FROM Estructura e
LEFT JOIN Timbre t ON e.direccionId = t.direccionId AND e.nombre = t.piso
WHERE e.direccionId = :direccion_id
GROUP BY e.id, e.nombre, e.dptos, e.orden
ORDER BY e.orden DESC;

-- VISTA NIETA: TIMBRES POR ESTRUCTURA
CREATE VIEW IF NOT EXISTS v_timbres_hija AS
SELECT 
    t.id as timbre_id,
    t.nombre as timbre_nombre,
    t.piso,
    t.dpto,
    t.numero,
    t.metodo,
    t.estado,
    CASE WHEN t.numero IS NOT NULL THEN '✅ Configurado' ELSE '⏳ Pendiente' END as estado_configuracion
FROM Timbre t
WHERE t.direccionId = :direccion_id AND t.piso = :piso_nombre
ORDER BY t.dpto;

-- CONSULTA DE PRUEBA: Ver datos de JOVDPN4U
SELECT 
    'VENTA' as tipo,
    v.idUnico,
    v.cantidadTimbres as cantidad,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha,
    d.calle || ' ' || d.numero as direccion_completa
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
WHERE v.idUnico = 'JOVDPN4U'

UNION ALL

SELECT 
    'ESTRUCTURA' as tipo,
    d.idUnico,
    COUNT(t.id) as cantidad,
    e.nombre as monto,
    e.dptos as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha,
    d.calle || ' ' || d.numero as direccion_completa
FROM Estructura e
LEFT JOIN Direccion d ON e.direccionId = d.id
LEFT JOIN Timbre t ON d.id = t.direccionId AND e.nombre = t.piso
WHERE d.idUnico = 'JOVDPN4U'
GROUP BY e.id, e.nombre, e.dptos, e.orden, e.createdAt, d.idUnico, d.calle, d.numero
ORDER BY e.orden

UNION ALL

SELECT 
    'TIMBRE' as tipo,
    d.idUnico,
    CASE WHEN t.numero IS NOT NULL THEN 1 ELSE 0 END as cantidad,
    t.piso as monto,
    t.dpto as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha,
    t.nombre as direccion_completa
FROM Timbre t
LEFT JOIN Direccion d ON t.direccionId = d.id
WHERE d.idUnico = 'JOVDPN4U'
ORDER BY t.piso, t.dpto;
