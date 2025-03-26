# 🎟️ Event Management Platform MVP

A modern and responsive Event Management Platform built with **Next.js**, **Tailwind CSS**, **TypeScript**, and **shadcn/ui**. This MVP enables event organizers to create, promote, and manage events, while customers can browse, register, and review events with ease.

## 🎯 Objective

The main goal of this MVP is to deliver a simple yet functional platform for:
- Organizers to publish events, manage ticket sales, and monitor attendee engagement.
- Customers to discover events, register using points or discount coupons, and leave event reviews.

## ⚙️ Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js (API), PostgreSQL, Prisma ORM
- **Payment Gateway**: TBA
- **Authentication**: Role-based login (Customer & Organizer)
- **Testing**: Unit tests implemented for critical flows
- **Deployment**: Vercel (Frontend)

## 🧩 Core Features

### 🔍 Event Discovery, Details, Creation, and Promotion
- Responsive landing page with upcoming events list
- Filter by category and location + debounce search bar
- Event creation form for organizers (with ticket types, prices, etc.)
- Support for free and paid events
- Voucher-based discounts with date ranges

### 💳 Event Transaction
- Purchase flow with 2-hour countdown for payment proof
- 6 transaction statuses: `waiting_payment`, `waiting_confirmation`, `done`, `rejected`, `expired`, `canceled`
- Automatic rollback for expired/canceled transactions (restore seats, points, and vouchers)
- Point system for payment reduction
- All pricing uses IDR

### 🌟 Event Reviews & Ratings
- Customers can rate and review after attending an event
- Ratings displayed on organizer profile

### 🔐 Authentication & Authorization
- Account registration with optional referral code
- Role-based protected routes for Customer and Organizer
- Referral codes auto-generated and immutable

### 🏆 Referral System & Profile Management
- Referral rewards: 10,000 points for referrer, discount coupon for new user
- Points and coupons expire after 3 months
- Editable profile + password reset

### 📊 Event Management Dashboard
- Organizer dashboard for managing events, transactions, and attendees
- Real-time charts for analytics by year/month/day
- Accept/reject payment proofs with email notification
- Attendee list with ticket details

## 🛠️ Developer Notes

- All data modifications involving multiple actions are wrapped in SQL transactions
- Popup confirmation dialogs on edit/delete actions
- Handles empty states in search & filters gracefully
- Protected routes implemented via middleware
- Fully responsive UI
- Debounced search bar for better UX

## 📚 References

Inspired by:
- [Eventbrite](https://www.eventbrite.com/)
- [Eventbookings](https://www.eventbookings.com/)
- [TicketTailor](https://www.tickettailor.com/)
- [Viagogo](https://www.viagogo.com/)
- [Loket](https://www.loket.com/)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yudhafrebian/event-management-platform.git
cd event-management-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DUITKU_MERCHANT_CODE=your_merchant_code
DUITKU_API_KEY=your_api_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run Dev Server
```bash
npm run dev
```

### 5. Run Backend (if separated)
Jalankan server Express terpisah untuk API dan webhook.

## ✅ Status

🚧 MVP in development — contributions welcome!

## 📂 Folder Structure (Frontend)
```
/app
  /events
  /dashboard
  /auth
/components
  /ui (shadcn components)
  /event-card.tsx
  /search-bar.tsx
/lib
  /utils.ts
  /hooks.ts
```

---

For questions or contributions, feel free to open an issue or pull request 🙌

