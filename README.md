# 🏛️ Sugbuk Platform

**Sugbuk** is the official digital platform of the Student Union Government of Bayero University Kano (BUK). Designed with a mobile-first approach and a vibrant, youthful design, it enables students to engage with their government, access important updates, and report issues or feedback—anonymously or otherwise.

---

## 🚀 Features

- 📰 **News & Announcements** — Stay updated with campus-wide events, policies, and news.
- 📅 **Events** — Discover and track upcoming SUG-related events and activities.
- 📤 **Anonymous Feedback & Reporting** — Empower students to share complaints, ideas, or issues without fear of identity exposure.
- 📊 **Admin Dashboard** — Moderators can view reports, respond, and publish announcements in real time.
- 🎨 **School-Branded UI** — Themed to reflect Bayero University’s visual identity with a modern, intuitive interface.

---

## 📱 Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, TypeScript
- **Backend**: Supabase (Database, Auth, Storage)
<!-- - **UI/UX**: Mobile-first design, inspired by [stuysu.org](https://stuysu.org) and [edquity.ng](https://edquity.ng) -->
- **Hosting**: Vercel (CI/CD enabled)

---

## 🛠️ Local Development

### Prerequisites

- Node.js (v18+)
- Yarn or npm
- Supabase CLI (optional for local db)

### Clone and Setup

```bash
git clone https://github.com/ahmad-cod/sugbuk.git
cd sugbuk
cp .env.example .env.local
# fill in your environment variables
npm install
npm run dev
