-- Script para limpiar timbres duplicados
-- Mantener solo los timbres originales (34) y eliminar los duplicados

-- 1. Ver cuántos timbres hay por direccionId
SELECT 
    direccionId,
    COUNT(*) as total_timbres,
    COUNT(CASE WHEN numero IS NOT NULL AND numero != '' THEN 1 END) as configurados
FROM Timbre 
GROUP BY direccionId;

-- 2. Ver los timbres duplicados
SELECT 
    direccionId,
    piso,
    dpto,
    COUNT(*) as cantidad
FROM Timbre 
GROUP BY direccionId, piso, dpto
HAVING COUNT(*) > 1;

-- 3. Eliminar timbres duplicados (mantener solo el más antiguo)
DELETE FROM Timbre 
WHERE id IN (
    SELECT id FROM (
        SELECT id,
               ROW_NUMBER() OVER (
                   PARTITION BY direccionId, piso, dpto 
                   ORDER BY createdAt ASC
               ) as rn
        FROM Timbre
    ) t
    WHERE t.rn > 1
);

-- 4. Verificar resultado
SELECT 
    direccionId,
    COUNT(*) as total_timbres,
    COUNT(CASE WHEN numero IS NOT NULL AND numero != '' THEN 1 END) as configurados
FROM Timbre 
GROUP BY direccionId;
