# Prime Property

Next.js + Prisma + Supabase Postgres.

## Setup Database (Supabase)

1. Buat project baru di [supabase.com](https://supabase.com).
2. Di dashboard Supabase: **Project Settings → Database → Connection string**.
3. Copy dua connection string ke `.env`:
   - `DATABASE_URL` → mode **Transaction pooler** (port `6543`). Tambahkan `?pgbouncer=true&connection_limit=1` di akhir URL.
   - `DIRECT_URL` → mode **Session** atau direct (port `5432`). Hanya dipakai oleh Prisma migrate / db push.
4. Lihat `.env.example` untuk format lengkap.

## Setup Awal

```bash
npm install
npm run db:setup     # push schema ke Supabase + seed data
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Fungsi                                          |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Jalankan Next.js dev server                     |
| `npm run build`     | Build production                                |
| `npm run db:generate` | Generate Prisma Client                        |
| `npm run db:push`   | Sync schema ke Supabase (no migration history)  |
| `npm run db:migrate` | Buat & apply migration baru (dev)              |
| `npm run db:seed`   | Seed user + 50 dummy properties                 |
| `npm run db:setup`  | `db:push` + `db:seed`                           |
| `npm run db:studio` | Buka Prisma Studio                              |

## Login Default (setelah seed)

| Role       | Email                            | Password        |
| ---------- | -------------------------------- | --------------- |
| Superadmin | superadmin@primeproperty.id      | superadmin123   |
| Admin      | admin@primeproperty.id           | admin123        |

> **Penting:** Ganti password ini di production, dan ganti `JWT_SECRET` di `.env` dengan random string yang panjang.

## Stack

- Next.js 16 (App Router)
- React 19
- Prisma 5 + Supabase Postgres
- TailwindCSS 4
- JWT auth via httpOnly cookie
