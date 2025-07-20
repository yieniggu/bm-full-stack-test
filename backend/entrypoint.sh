#!/bin/sh

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Seeding db"
npx tsx src/prisma/seed.ts

echo "Starting app..."
exec npm run dev
