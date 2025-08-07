## 6. Organización recomendada para código compartido

- `apps/web/app/api/`: Endpoints compartidos entre módulos. Los endpoints generales van aquí. Los específicos de la tienda pueden ir en `api/tienda`.
- `apps/web/app/components/`: Componentes visuales reutilizables para toda la app. Solo los componentes exclusivos de la tienda deben ir en `tienda/components`.
- Mantener la lógica y vistas específicas de la tienda dentro de `apps/web/app/tienda`.

> Esta organización facilita el mantenimiento, la reutilización y la consistencia en todo el proyecto. 