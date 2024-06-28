# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar `nmp install`
5. Ejecutar `npm run dev`
6. Ejecutar el seed para [crear la base de datos](localhost:3000/api/seed)

## Nota

usuario: test1@google.com
password: 123456

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage
