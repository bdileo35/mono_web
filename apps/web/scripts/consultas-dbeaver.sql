-- ===========================================
-- CONSULTAS PARA DBEAVER - QRing Smart Bell
-- ===========================================

-- 1. VENTAS CON FECHAS LEGIBLES
SELECT 
    id,
    idUnico,
    cantidadTimbres,
    monto,
    estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(updatedAt/1000, 'unixepoch')) as fecha_actualizacion
FROM Venta
ORDER BY createdAt DESC;

-- 2. VENTA ESPECÍFICA POR IDU
SELECT 
    idUnico,
    cantidadTimbres,
    monto,
    estado,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Venta
WHERE idUnico = '1SICAUFN';

-- 3. CONTEO DE REGISTROS POR TABLA
SELECT 'Venta' as tabla, COUNT(*) as registros FROM Venta
UNION ALL
SELECT 'Direccion', COUNT(*) FROM Direccion
UNION ALL
SELECT 'Timbre', COUNT(*) FROM Timbre
UNION ALL
SELECT 'Estructura', COUNT(*) FROM Estructura
UNION ALL
SELECT 'Usuario', COUNT(*) FROM Usuario;

-- 4. DIRECCIONES CON FECHAS
SELECT 
    id,
    idUnico,
    calle,
    numero,
    ciudad,
    provincia,
    codigoPostal,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Direccion
ORDER BY createdAt DESC;

-- 5. TIMBRES CON FECHAS
SELECT 
    id,
    idUnico,
    numero,
    metodo,
    estado,
    esPropio,
    estadoAsignacion,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Timbre
ORDER BY createdAt DESC;

-- 6. ESTRUCTURA CON FECHAS
SELECT 
    id,
    idUnico,
    piso,
    departamento,
    cantidadTimbres,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Estructura
ORDER BY createdAt DESC;

-- 7. USUARIOS CON FECHAS
SELECT 
    id,
    nombre,
    email,
    telefono,
    rol,
    strftime('%Y-%m-%d %H:%M:%S', datetime(createdAt/1000, 'unixepoch')) as fecha_creacion
FROM Usuario
ORDER BY createdAt DESC;

-- 8. VENTA COMPLETA CON RELACIONES
SELECT 
    v.idUnico as venta_idu,
    v.cantidadTimbres,
    v.monto,
    v.estado as estado_venta,
    d.calle,
    d.numero,
    d.ciudad,
    d.provincia,
    strftime('%Y-%m-%d %H:%M:%S', datetime(v.createdAt/1000, 'unixepoch')) as fecha_venta
FROM Venta v
LEFT JOIN Direccion d ON v.idUnico = d.idUnico
ORDER BY v.createdAt DESC;

-- 9. LIMPIAR DATOS (CUIDADO!)
-- DELETE FROM Venta;
-- DELETE FROM Direccion;
-- DELETE FROM Timbre;
-- DELETE FROM Estructura;
-- DELETE FROM Usuario;
-- DELETE FROM UsuarioTimbre;
-- DELETE FROM Configuracion;
