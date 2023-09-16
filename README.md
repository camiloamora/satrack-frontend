## Getting Started

Para ejecutar el proyecto, primero se debe tener instalado node v16.16.0 no soporta versiones más recientes, luego si se puede hacer la instalación:

```bash
npm install
# or
yarn
```
Para ejecutar el proyecto y verlo en el navegador con este comando:

```bash
npm run dev
# or
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) con el navegador para ver el resultado.

Para la base de datos la url esta configurada en el archivo  ./api/request.js

## Información para la conexión con la api

Se tiene configurada una Api demo en el caso donde el backend no este funcionando, con el comando:
```bash
npm run dev:api
# or
yarn dev:api
```

- Inicia una base de datos basada en Json-server, para modificar los datos iniciales se puede modificar el archivo ./db.json
