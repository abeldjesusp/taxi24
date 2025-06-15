
# 🚖 Taxi24 API – NestJS + Prisma + PostgreSQL

API REST para la gestión de transporte (conductores, pasajeros, viajes y facturación) usando **NestJS**, **Prisma ORM** y **PostgreSQL**.

---

## 📦 Tecnologías usadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/taxi24-api.git
cd taxi24-api
```

2. Instala dependencias:
```bash
npm install
```

3. Crea un archivo `.env` y configura tu base de datos PostgreSQL:
```
DATABASE_URL="postgresql://usuario:password@localhost:5432/taxi24"
```

---

## 🛠️ Migraciones Prisma

### 1. Generar cliente de Prisma:
```bash
npx prisma generate
```

### 2. Crear y aplicar migraciones:
```bash
npx prisma migrate dev --name init
```

> Si ya existe la base de datos, puedes resetearla:
```bash
npx prisma migrate reset
```

---

## 🌱 Poblar datos de prueba (seed)

1. Verifica que `ts-node` esté instalado:
```bash
npm install -D ts-node
```

2. Ejecuta el seed:
```bash
npx ts-node prisma/seed.ts
```

---

## 🚀 Ejecutar el servidor

```bash
npm run start:dev
```

- API corriendo en: `http://localhost:3000`
- Swagger Docs en: `http://localhost:3000/api`

---

## 📖 Endpoints y ejemplos

### 🔹 Conductores

- **GET /drivers**  
  Retorna todos los conductores.

- **GET /drivers/available**  
  Conductores disponibles.

- **GET /drivers/nearby?lat=18.48&lng=-69.92**  
  Conductores disponibles dentro de 3km.

| Prueba              | lat    | lng     | Resultado esperado        |
| ------------------- | ------ | ------- | ------------------------- |
| Cerca de Juan Pérez | 18.48  | -69.93  | Juan Pérez                |
| Lejos de todos      | 18.52  | -70.00  | Ninguno                   |
| Entre Luis y Juan   | 18.475 | -69.925 | Juan Pérez, Luis Martínez |

- **GET /drivers/:id**  
  Buscar conductor por ID.

### 🔹 Pasajeros

- **GET /riders**  
  Todos los pasajeros.

- **GET /riders/:id**  
  Obtener pasajero por ID.

- **GET /riders/nearby-drivers?lat=18.48&lng=-69.92**  
  3 conductores más cercanos.

### 🔹 Viajes

- **POST /journeys/request**  
  Crear solicitud de viaje.
  ```json
    {
      "driverId": 3,
      "riderId": 2,
      "pickupLocationLat": 18.49,
      "pickupLocationLng": -69.91,
      "dropoffLocationLat": 18.51,
      "dropoffLocationLng": -69.96
    }
  ```

- **PATCH /journeys/:id/complete**  
  Completa el viaje y genera factura.

- **GET /journeys/active**  
  Lista de viajes activos.

### 🔹 Facturas

- **GET /invoices/journey/:id**  
  Factura asociada a un viaje.

- **GET /invoices**  
  Lista todas las facturas.

---

## ✅ Notas finales

- Asegúrate de correr `prisma generate` antes de usar el cliente
- Puedes modificar `prisma/seed.ts` para agregar más datos
- Prisma Client se importa desde `@prisma/client` si usas la ruta por defecto

