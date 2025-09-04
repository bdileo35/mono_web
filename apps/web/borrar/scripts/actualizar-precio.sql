-- Script para actualizar el precio por timbre a $6,900
UPDATE Configuracion 
SET valor = '6900', 
    descripcion = 'Precio por timbre en pesos',
    updatedAt = CURRENT_TIMESTAMP
WHERE clave = 'precioPorTimbre';

-- Si no existe, crearlo
INSERT OR IGNORE INTO Configuracion (id, clave, valor, descripcion, createdAt, updatedAt)
VALUES (
    'config_precio_' || datetime('now', 'unixepoch'),
    'precioPorTimbre',
    '6900',
    'Precio por timbre en pesos',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Verificar el cambio
SELECT clave, valor, descripcion, datetime(updatedAt/1000, 'unixepoch', 'localtime') as fecha_actualizacion
FROM Configuracion 
WHERE clave = 'precioPorTimbre';

