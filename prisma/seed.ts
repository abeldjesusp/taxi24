import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear algunos conductores
  await prisma.driver.createMany({
    data: [
      {
        name: 'Juan Pérez',
        latitude: 18.48,
        longitude: -69.93,
        isAvailable: true,
      },
      {
        name: 'Ana Gómez',
        latitude: 18.49,
        longitude: -69.91,
        isAvailable: false,
      },
      {
        name: 'Luis Martínez',
        latitude: 18.47,
        longitude: -69.92,
        isAvailable: true,
      },
    ],
  });

  // Crear algunos pasajeros
  await prisma.rider.createMany({
    data: [{ name: 'Carlos Romero' }, { name: 'Diana Méndez' }],
  });

  // Crear algunos viajes de ejemplo
  await prisma.journey.createMany({
    data: [
      {
        riderId: 1, // Asumiendo que el primer pasajero es Carlos Romero
        driverId: 1, // Asumiendo que el primer conductor es Juan Pérez
        pickupLocationLat: 18.48,
        pickupLocationLng: -69.93,
        dropoffLocationLat: 18.5,
        dropoffLocationLng: -69.95,
        status: 'completed',
      },
      {
        riderId: 2, // Asumiendo que el segundo pasajero es Diana Méndez
        driverId: 2, // Asumiendo que el segundo conductor es Ana Gómez
        pickupLocationLat: 18.49,
        pickupLocationLng: -69.91,
        dropoffLocationLat: 18.51,
        dropoffLocationLng: -69.96,
        status: 'active',
      },
      {
        riderId: 1, // Carlos Romero
        driverId: 3, // Luis Martínez
        pickupLocationLat: 18.47,
        pickupLocationLng: -69.92,
        dropoffLocationLat: 18.52,
        dropoffLocationLng: -69.97,
        status: 'active',
      },
    ],
  });

  // Crear algunas facturas de ejemplo
  await prisma.invoice.createMany({
    data: [
      {
        journeyId: 1,
        amount: 20.0,
        status: 'paid',
      },
      {
        journeyId: 2,
        amount: 15.0,
        status: 'unpaid',
      },
    ],
  });

  console.log('Datos de ejemplo insertados con éxito ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
