# EcoTrack - AI-Powered Supply Chain Management

**EcoTrack** is an intelligent inventory and supply chain management platform powered by AI. It helps businesses automate stock tracking, predict demand, and eliminate stockouts with real-time analytics and smart recommendations.

## Live Demo

[https://eco-track-frontend-delta.vercel.app/](https://eco-track-frontend-delta.vercel.app/)

## Repositories

- **Frontend:** [https://github.com/sorifulhasan300/eco-track-frontend](https://github.com/sorifulhasan300/eco-track-frontend)
- **Backend:** [https://github.com/sorifulhasan300/eco-track-backend-new](https://github.com/sorifulhasan300/eco-track-backend-new)

## Features

### Public Website
- **Landing Page** - Hero section with feature highlights and CTA
- **AI Features** - Overview of AI capabilities (demand forecasting, auto-restocking, sentiment analysis)
- **Platform** - Detailed module breakdown and architecture
- **Docs** - Step-by-step platform usage guide
- **Contact** - Contact form with company information
- **Pricing** - Transparent pricing tiers
- **Authentication** - Login/Register with demo credentials

### Dashboard (Role-Based)
- **Admin Analytics** - AI-powered business health insights, summary cards, category distribution charts, sales growth suggestions
- **Manager View** - Inventory management, order tracking, team oversight
- **Staff View** - Product browsing, quick orders, task management
- **Real-time Data** - All dashboard data fetched via TanStack Query with optimistic updates

### AI Capabilities
- Demand Forecasting with predictive analytics
- Smart Auto-Restocking recommendations
- Customer Sentiment Analysis
- Automated inventory categorization
- Sales growth suggestions with impact scoring

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Zustand (auth), TanStack Query (server state)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **AI Integration:** Gemini AI
- **Authentication:** JWT

## Demo Credentials

Use these accounts to explore role-based dashboard views:

| Role    | Email              | Password         |
|---------|-------------------|------------------|
| Admin   | jhon@gmail.com    | jhon@gmail.com   |
| Manager | hasan@gmail.com   | hasan@gmail.com  |
| Staff   | user@test.com     | user@test.com    |

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended)
- PostgreSQL database

### Installation

1. Clone the frontend repository:
```bash
git clone https://github.com/sorifulhasan300/eco-track-frontend.git
cd eco-track-frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
pnpm run build
```

## Project Structure

```
eco-track-frontend/
├── src/
│   ├── app/
│   │   ├── (main-layout)/      # Public pages (landing, features, docs, contact)
│   │   ├── (dashboard-layout)/ # Dashboard pages with sidebar
│   │   ├── login/              # Auth pages
│   │   └── register/
│   ├── components/
│   │   ├── module/             # Feature modules
│   │   ├── dashboard/          # Dashboard-specific components
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/                  # Custom React Query hooks
│   ├── services/               # API service layer
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript interfaces
├── public/
└── package.json
```

## Key Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/products` | Product catalog | Authenticated |
| `/ai-features` | AI capabilities overview | Public |
| `/platform` | Platform documentation | Public |
| `/docs` | Usage guide | Public |
| `/contact` | Contact form | Public |
| `/pricing` | Pricing tiers | Public |
| `/login` | Sign in | Public |
| `/register` | Sign up | Public |
| `/dashboard` | Role-based dashboard | Authenticated |
| `/dashboard/analytics` | AI analytics | Admin only |

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## License

This project is open source and available under the MIT License.

## Contact

- **LinkedIn:** [https://www.linkedin.com/in/sorifulhasan](https://www.linkedin.com/in/sorifulhasan)
- **X (Twitter):** [https://x.com/hasan_soriful](https://x.com/hasan_soriful)
- **Facebook:** [https://www.facebook.com/sorifulhasan300](https://www.facebook.com/sorifulhasan300)
