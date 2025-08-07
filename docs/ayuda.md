
 # 📝 Ayuda-memoria QRing Pro

| Título                                  | Comando                  | ¿Para qué sirve?                                          | ¿Dónde?                                      |
|------------------------------------ ----|--------------------------|-----------------------------------------------------------|----------------------------------------------|
| Iniciar servidor de desarrollo (Next.js)| `npm run dev`            | Levanta la app web en modo desarrollo (`localhost:3000`)  | `apps/web`                                   |
| Exponer servidor local con ngrok        | `ngrok http 3000`        | Crea una URL pública temporal para pruebas reales con QR  | Cualquier terminal (servidor local corriendo)|
| Generar cliente de Prisma               | `npx prisma generate`    | Actualiza el cliente Prisma según `schema.prisma`         | Raíz del monorepo                            |
| Ejecutar migraciones de Prisma          | `npx prisma migrate dev` | Aplica cambios del schema a la base de datos              | Raíz del monorepo                            |
| Ver la base de datos (Prisma Studio)    | `npx prisma studio`      | Abre una interfaz web para ver/editar datos               | Raíz del monorepo                            |
| Instalar dependencias                   | `npm install`            | Instala todas las dependencias del proyecto               | Carpeta con `package.json`                   |
| Ver estado de Git                       | `git status`             | Muestra el estado de los archivos en el repositorio       | Cualquier carpeta del repo                   |
| Agregar cambios a Git                   | `git add .`              | Agrega todos los cambios al área de staging               | Cualquier carpeta del repo                   |
| Commit de cambios en Git                | `git commit -m "Mensaje"`| Guarda los cambios en el historial local                  | Cualquier carpeta del repo                   |
| Subir cambios a remoto (Git)            | `git push`               | Sube los commits al repositorio remoto                    | Cualquier carpeta del repo                   |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Notas
- El QR debe apuntar a la URL de ngrok para pruebas reales.
- Si cambiás el schema de Prisma, corré `npx prisma generate` y `npx prisma migrate dev`.
- Para pruebas en el celu, usá la URL pública de ngrok.        