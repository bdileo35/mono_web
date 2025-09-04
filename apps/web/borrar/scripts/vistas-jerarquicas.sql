-- =====================================================
-- VISTAS JERÁRQUICAS EXPANDIBLES PARA QRING
-- =====================================================

-- 1. VISTA PRINCIPAL (AMARILLO) - Resumen por IDU
-- Esta vista muestra el resumen de todas las ventas con estadísticas
DROP VIEW IF EXISTS v_principal_resumen;
CREATE VIEW v_principal_resumen AS
SELECT 
    v.id as venta_id,
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta,
    d.nombre as direccion_nombre,
    d.calle || ' ' || d.numero as direccion_completa,
    d.ciudad,
    COUNT(DISTINCT e.id) as total_pisos,
    COUNT(DISTINCT t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) as timbres_configurados,
    COUNT(CASE WHEN t.numero IS NULL OR t.numero = '' THEN 1 END) as timbres_pendientes,
    ROUND(
        (COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) * 100.0) / 
        COUNT(DISTINCT t.id), 2
    ) as porcentaje_configurado
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Estructura e ON d.id = e.direccionId
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.id, v.idUnico, v.cantidadTimbres, v.monto, v.estado, v.createdAt, d.nombre, d.calle, d.numero, d.ciudad
ORDER BY v.createdAt DESC;

-- 2. VISTA ESTRUCTURA (VIOLETA) - Detalle de pisos por IDU
-- Esta vista se expande al hacer clic en un IDU de la vista principal
DROP VIEW IF EXISTS v_estructura_detalle;
CREATE VIEW v_estructura_detalle AS
SELECT 
    e.id as estructura_id,
    e.direccionId,
    d.idUnico,
    e.nombre as piso,
    e.dptos,
    e.orden,
    strftime('%Y-%m-%d %H:%M:%S', datetime(e.createdAt/1000, 'unixepoch')) as fecha_creacion,
    COUNT(t.id) as timbres_en_piso,
    COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) as configurados_en_piso,
    COUNT(CASE WHEN t.numero IS NULL OR t.numero = '' THEN 1 END) as pendientes_en_piso,
    ROUND(
        (COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) * 100.0) / 
        COUNT(t.id), 2
    ) as porcentaje_configurado_piso
FROM Estructura e
LEFT JOIN Direccion d ON e.direccionId = d.id
LEFT JOIN Timbre t ON e.direccionId = t.direccionId AND e.nombre = t.piso
GROUP BY e.id, e.direccionId, d.idUnico, e.nombre, e.dptos, e.orden, e.createdAt
ORDER BY e.orden DESC, e.nombre;

-- 3. VISTA TIMBRES (VERDE) - Detalle de timbres por piso
-- Esta vista se expande al hacer clic en un piso de la vista estructura
DROP VIEW IF EXISTS v_timbres_detalle;
CREATE VIEW v_timbres_detalle AS
SELECT 
    t.id as timbre_id,
    t.direccionId,
    d.idUnico,
    t.piso,
    t.dpto,
    t.nombre as timbre_nombre,
    t.numero,
    t.metodo,
    t.estado,
    t.esPropio,
    t.estadoAsignacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(t.createdAt/1000, 'unixepoch')) as fecha_creacion,
    CASE 
        WHEN t.numero IS NOT NULL AND t.numero != '' THEN '✅ CONFIGURADO'
        ELSE '❌ PENDIENTE'
    END as estado_configuracion,
    CASE 
        WHEN t.numero IS NOT NULL AND t.numero != '' THEN 'Verde'
        ELSE 'Rojo'
    END as color_estado
FROM Timbre t
LEFT JOIN Direccion d ON t.direccionId = d.id
ORDER BY t.piso DESC, t.dpto ASC;

-- =====================================================
-- VISTAS DE CONSULTA RÁPIDA
-- =====================================================

-- Vista para ver timbres duplicados
DROP VIEW IF EXISTS v_timbres_duplicados;
CREATE VIEW v_timbres_duplicados AS
SELECT 
    direccionId,
    piso,
    dpto,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id, ', ') as ids_duplicados
FROM Timbre 
GROUP BY direccionId, piso, dpto
HAVING COUNT(*) > 1;

-- Vista para ver estructura duplicada
DROP VIEW IF EXISTS v_estructura_duplicada;
CREATE VIEW v_estructura_duplicada AS
SELECT 
    direccionId,
    nombre as piso,
    dptos,
    COUNT(*) as cantidad_duplicados,
    GROUP_CONCAT(id, ', ') as ids_duplicados
FROM Estructura 
GROUP BY direccionId, nombre, dptos
HAVING COUNT(*) > 1;

-- =====================================================
-- INSTRUCCIONES DE USO EN DBEAVER
-- =====================================================

/*
INSTRUCCIONES PARA USAR LAS VISTAS JERÁRQUICAS:

1. VISTA PRINCIPAL (AMARILLO):
   - Ejecutar: SELECT * FROM v_principal_resumen;
   - Muestra resumen de todas las ventas con estadísticas
   - Hacer clic en un IDU para expandir

2. VISTA ESTRUCTURA (VIOLETA):
   - Ejecutar: SELECT * FROM v_estructura_detalle WHERE idUnico = 'JOVDPN4U';
   - Muestra pisos y departamentos por IDU
   - Hacer clic en un piso para expandir

3. VISTA TIMBRES (VERDE):
   - Ejecutar: SELECT * FROM v_timbres_detalle WHERE idUnico = 'JOVDPN4U' AND piso = '4';
   - Muestra timbres detallados por piso
   - Filtros disponibles por IDU y piso

4. VISTAS DE LIMPIEZA:
   - v_timbres_duplicados: Para identificar duplicados
   - v_estructura_duplicada: Para identificar estructura duplicada

COLORES EN DBEAVER:
- Amarillo: Vista principal (resumen)
- Violeta: Vista estructura (pisos)
- Verde: Vista timbres (detalle)
*/
