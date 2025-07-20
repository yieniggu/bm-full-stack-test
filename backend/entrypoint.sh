#!/bin/sh

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Starting app..."
exec npm run dev
