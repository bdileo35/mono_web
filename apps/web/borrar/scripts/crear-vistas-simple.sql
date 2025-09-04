-- Crear vistas básicas que faltan
CREATE VIEW v_principal_resumen AS
SELECT 
    v.idUnico,
    v.cantidadTimbres,
    v.monto,
    v.estado,
    d.nombre as direccion_nombre,
    COUNT(t.id) as total_timbres,
    COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) as timbres_configurados
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
LEFT JOIN Timbre t ON d.id = t.direccionId
GROUP BY v.idUnico, v.cantidadTimbres, v.monto, v.estado, d.nombre;

CREATE VIEW v_estructura_detalle AS
SELECT 
    d.idUnico,
    e.nombre as piso,
    e.dptos,
    COUNT(t.id) as timbres_en_piso,
    COUNT(CASE WHEN t.numero IS NOT NULL AND t.numero != '' THEN 1 END) as configurados_en_piso
FROM Estructura e
LEFT JOIN Direccion d ON e.direccionId = d.id
LEFT JOIN Timbre t ON e.direccionId = t.direccionId AND e.nombre = t.piso
GROUP BY d.idUnico, e.nombre, e.dptos;

CREATE VIEW v_timbres_detalle AS
SELECT 
    d.idUnico,
    t.piso,
    t.dpto,
    t.nombre,
    t.numero,
    t.metodo,
    t.estado,
    CASE 
        WHEN t.numero IS NOT NULL AND t.numero != '' THEN '✅ CONFIGURADO'
        ELSE '❌ PENDIENTE'
    END as estado_configuracion
FROM Timbre t
LEFT JOIN Direccion d ON t.direccionId = d.id
ORDER BY t.piso DESC, t.dpto ASC;
