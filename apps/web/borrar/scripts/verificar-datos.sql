-- ===========================================
-- VERIFICACIÓN DE DATOS RUVQOARC
-- ===========================================

-- 1. VERIFICAR VENTA
SELECT 
    'VENTA' as tipo,
    idUnico,
    cantidadTimbres,
    monto,
    estado,
    datetime(createdAt/1000, 'unixepoch') as fecha
FROM Venta 
WHERE idUnico = 'RUVQOARC';

-- 2. VERIFICAR DIRECCIÓN
SELECT 
    'DIRECCIÓN' as tipo,
    idUnico,
    nombre,
    calle || ' ' || numero as direccion_completa,
    datetime(createdAt/1000, 'unixepoch') as fecha
FROM Direccion 
WHERE idUnico = 'RUVQOARC';

-- 3. VERIFICAR ESTRUCTURA
SELECT 
    'ESTRUCTURA' as tipo,
    e.nombre as piso,
    e.dptos,
    e.orden,
    d.idUnico,
    datetime(e.createdAt/1000, 'unixepoch') as fecha
FROM Estructura e
JOIN Direccion d ON e.direccionId = d.id
WHERE d.idUnico = 'RUVQOARC'
ORDER BY e.orden;

-- 4. VERIFICAR TIMBRES
SELECT 
    'TIMBRE' as tipo,
    t.nombre,
    t.piso,
    t.dpto,
    t.numero,
    t.metodo,
    t.estado,
    d.idUnico,
    datetime(t.createdAt/1000, 'unixepoch') as fecha
FROM Timbre t
JOIN Direccion d ON t.direccionId = d.id
WHERE d.idUnico = 'RUVQOARC'
ORDER BY t.piso, t.dpto;

-- 5. RESUMEN COMPLETO
SELECT 
    'RESUMEN' as tipo,
    v.idUnico,
    v.cantidadTimbres as timbres_comprados,
    COUNT(t.id) as timbres_creados,
    COUNT(DISTINCT e.id) as total_pisos,
    COUNT(CASE WHEN t.numero IS NOT NULL THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL THEN 1 END) as timbres_pendientes
FROM Venta v
LEFT JOIN Direccion d ON v.direccionId = d.id
LEFT JOIN Estructura e ON d.id = e.direccionId
LEFT JOIN Timbre t ON d.id = t.direccionId
WHERE v.idUnico = 'RUVQOARC'
GROUP BY v.idUnico, v.cantidadTimbres;
