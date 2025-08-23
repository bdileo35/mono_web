-- ===========================================
-- CONSULTAS AVANZADAS PARA DBEAVER - FLUJO COMPLETO
-- ===========================================

-- 1. VISTA PRINCIPAL: VENTAS CON DETALLES
CREATE VIEW IF NOT EXISTS v_ventas_completas AS
SELECT 
    v.id,
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.calle,
    d.numero,
    d.ciudad,
    d.provincia,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Timbre t ON v.idUnico = t.idUnico
GROUP BY v.id, v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.calle, d.numero, d.ciudad, d.provincia
ORDER BY v.createdAt DESC;

-- 2. VISTA: ESTRUCTURA POR EDIFICIO
CREATE VIEW IF NOT EXISTS v_estructura_edificio AS
SELECT 
    e.idUnico,
    e.piso,
    e.departamento,
    e.cantidadTimbres,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha_creacion,
    COUNT(t.id) as timbres_por_piso,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as pendientes
FROM Estructura e
LEFT JOIN Timbre t ON e.idUnico = t.idUnico AND e.piso = t.piso
GROUP BY e.id, e.idUnico, e.piso, e.departamento, e.cantidadTimbres, e.createdAt
ORDER BY e.idUnico, e.piso;

-- 3. VISTA: TIMBRES POR PISO
CREATE VIEW IF NOT EXISTS v_timbres_por_piso AS
SELECT 
    t.id,
    t.idUnico,
    t.piso,
    t.numero,
    t.metodo,
    t.estado,
    t.esPropio,
    t.estadoAsignacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha_creacion,
    CASE 
        WHEN t.numero IS NOT NULL THEN '✅ Configurado'
        ELSE '⏳ Pendiente'
    END as estado_configuracion
FROM Timbre t
ORDER BY t.idUnico, t.piso, t.numero;

-- 4. CONSULTA: FLUJO COMPLETO DE UNA VENTA
-- Ejecutar esta consulta para ver todo el flujo de una venta específica
SELECT 
    'VENTA' as tipo,
    v.idUnico,
    v.cantidadTimbres as cantidad,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha
FROM Venta v
WHERE v.idUnico = '1SICAUFN'

UNION ALL

SELECT 
    'DIRECCION' as tipo,
    d.idUnico,
    d.numero as cantidad,
    d.calle || ', ' || d.ciudad as monto,
    d.provincia as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(d.createdAt/1000, 'unixepoch')) as fecha
FROM Direccion d
WHERE d.idUnico = '1SICAUFN'

UNION ALL

SELECT 
    'ESTRUCTURA' as tipo,
    e.idUnico,
    e.cantidadTimbres as cantidad,
    e.piso || ' - ' || e.departamento as monto,
    'Piso' as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha
FROM Estructura e
WHERE e.idUnico = '1SICAUFN'

UNION ALL

SELECT 
    'TIMBRE' as tipo,
    t.idUnico,
    t.numero as cantidad,
    t.piso as monto,
    CASE 
        WHEN t.numero IS NOT NULL THEN '✅ Configurado'
        ELSE '⏳ Pendiente'
    END as estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha
FROM Timbre t
WHERE t.idUnico = '1SICAUFN'
ORDER BY tipo, fecha;

-- 5. CONSULTA: RESUMEN DEL SISTEMA
SELECT 
    'RESUMEN SISTEMA' as seccion,
    COUNT(DISTINCT v.idUnico) as ventas,
    COUNT(DISTINCT d.idUnico) as direcciones,
    COUNT(DISTINCT e.id) as pisos,
    COUNT(t.id) as timbres_total,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes,
    SUM(v.monto) as monto_total
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Estructura e ON v.idUnico = e.idUnico
LEFT JOIN Timbre t ON v.idUnico = t.idUnico;

-- 6. CONSULTA: TIMBRES POR PISO (DETALLADA)
SELECT 
    t.idUnico,
    t.piso,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as pendientes,
    GROUP_CONCAT(t.numero, ', ') as numeros_configurados,
    GROUP_CONCAT(CASE WHEN t.numero IS NULL THEN 'Pendiente' END, ', ') as pendientes_lista
FROM Timbre t
GROUP BY t.idUnico, t.piso
ORDER BY t.idUnico, t.piso;

-- 7. CONSULTA: ESTADO DE CONFIGURACIÓN
SELECT 
    'ESTADO CONFIGURACIÓN' as tipo,
    v.idUnico,
    v.cantidadTimbres as timbres_comprados,
    COUNT(t.id) as timbres_creados,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as pendientes,
    ROUND(
        (COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) * 100.0 / v.cantidadTimbres), 
        1
    ) as porcentaje_configurado
FROM Venta v
LEFT JOIN Timbre t ON v.idUnico = t.idUnico
GROUP BY v.id, v.idUnico, v.cantidadTimbres
ORDER BY v.createdAt DESC;
