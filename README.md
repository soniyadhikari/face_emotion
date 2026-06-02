# EmotionAI

EmotionAI is a premium AI-powered emotion detection SaaS built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, TensorFlow.js, and Framer Motion.

## Features

- Modern landing page with glassmorphism visuals and animated interactions
- Google authentication via NextAuth.js
- Live webcam emotion detection experience
- Image upload emotion analysis with confidence scoring
- Analytics dashboard with charts and emotion trends
- Admin panel, pricing, settings, and fully responsive UI
- Prisma ORM schema ready for production database integration

## Local setup

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Prisma

Run database migrations:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

## Available pages

- `/` - Landing page
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - User dashboard
- `/webcam` - Live webcam detection
- `/upload` - Image upload detection
- `/analytics` - Analytics dashboard
- `/settings` - Account settings
- `/pricing` - Pricing page
- `/admin` - Admin panel
- `/features` - Product features
- `/about` - About EmotionAI

## Notes

- The project is built with UI-first detection experiences and mock analytics flows ready for AI model integration.
- For production, configure a PostgreSQL database, set a secure `NEXTAUTH_SECRET`, and add Google OAuth credentials.
