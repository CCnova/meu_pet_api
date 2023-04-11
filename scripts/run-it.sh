#!/usr/bin/env bash
echo "-> starting prisma migrations to mysql database...\n"
cd /app
./scripts/wait-for-it.sh mysql:3306 -- echo "database online \n"
sleep 20
npm run db:migrate
npm run db:generate
npm run dev