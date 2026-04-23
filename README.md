# Dr. Nishanth S - Professional Medical Portfolio

Production-ready full-stack portfolio website built with Next.js App Router, Prisma, PostgreSQL and NextAuth.

## Stack

- Next.js 15 + TypeScript + App Router
- Tailwind CSS v4
- Framer Motion animations
- shadcn-style reusable UI components
- Prisma ORM + PostgreSQL (Supabase or Neon)
- NextAuth v5 (Credentials provider)
- Google Places sync for reviews
- Vercel Cron (`/api/google-sync` every 6 hours)

## Features

- Public pages: Home, About, Specialities, Procedures, Research, Testimonials, Gallery, Contact
- Professional responsive medical design system with light/dark support
- Review submission form with Zod validation + sanitization + rate limiting (5/IP/hour)
- Public testimonials display with tabs, average rating, and load more pagination
- Google review sync with deduplication using `googleReviewId`
- Protected admin dashboard and moderation workflow
- SEO metadata, sitemap and robots

## Setup

1. Install dependencies

```bash
npm install
```

2. Configure environment values in `.env.local`

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=

GOOGLE_PLACES_API_KEY=
GOOGLE_PLACE_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_ACCESS_TOKEN=
```

3. Generate admin password hash

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

4. Prepare database

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```

5. Start development server

```bash
npm run dev
```

## Quick Local Setup

Option 1 - Free cloud DB (recommended, no install)

1. Go to https://neon.tech and sign up free
2. Create a new project called `dr-nishanth`
3. Copy the connection string (looks like `postgresql://user:pass@host.neon.tech/dbname?sslmode=require`)
4. Paste it as `DATABASE_URL` in `.env.local`

Option 2 - Local PostgreSQL

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/drnishtanth"
```

Then run:

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Generate `NEXTAUTH_SECRET` (run this once in terminal):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Generate `ADMIN_PASSWORD_HASH` (run this once in terminal):

```bash
node -e "const b=require('bcryptjs');console.log(b.hashSync('YourPassword123',10))"
```

## Google Place ID

1. Open: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Use Place ID finder for your hospital listing
3. Set value in `GOOGLE_PLACE_ID`

## Google Places API Key

1. In Google Cloud Console, enable **Places API**
2. Create API key and restrict by API + HTTP referrer/IP
3. Set value in `GOOGLE_PLACES_API_KEY`

## Vercel Cron Configuration

`vercel.json` includes:

```json
{
	"crons": [
		{
			"path": "/api/google-sync",
			"schedule": "0 */6 * * *"
		}
	]
}
```

Deploy on Vercel and ensure environment variables are configured in project settings.

Set NEXT_PUBLIC_SITE_URL to your production domain in the Vercel dashboard before deploying (for example, https://your-domain.com).

## Google My Business API Limitation

Google APIs do not reliably allow third-party direct posting of customer reviews. The admin toggle attempts API integration, but success depends on verified Google Business access and permissions. Manual reviews will always appear inside this portfolio even if Google publishing is not possible.

## Deployment

- Frontend/API: Vercel
- Database: Supabase PostgreSQL or Neon PostgreSQL
- Run database migrations in deployment pipeline before promoting production
