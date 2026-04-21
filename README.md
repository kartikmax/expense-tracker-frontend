# 💰 FinSync — Expense Tracker Frontend

A modern expense tracking web application built with **Angular 19** and **Angular Material**, connected to a Node.js + MongoDB backend.

***

## 🔗 Related Repositories & Links

| | Link |
|---|---|
| **Backend Repo** | [https://github.com/kartikmax/tracker-api](https://github.com/kartikmax/tracker-api) |
| **Backend Live API** | [https://tracker-api-kappa.vercel.app](https://tracker-api-kappa.vercel.app) |
| **Frontend Live** | [https://expense-tracker-frontend-puce-seven.vercel.app](https://expense-tracker-frontend-puce-seven.vercel.app) |

***

## 🛠️ Tech Stack

- **Framework:** Angular 19 (Standalone Components)
- **UI Library:** Angular Material 19
- **Charts:** ApexCharts + ng-apexcharts
- **HTTP:** Angular HttpClient
- **Styling:** SCSS
- **Backend:** Node.js + Express + MongoDB Atlas

***

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── summary-cards/        # KPI summary cards
│   │   ├── expense-table/        # Transactions table with filter, sort, paginate
│   │   ├── charts/               # Donut chart for category breakdown
│   │   └── expense-form/         # Add expense dialog form
│   ├── pages/
│   │   └── dashboard/            # Main dashboard page
│   ├── services/
│   │   └── expense.service.ts    # API calls to backend
│   └── environments/
│       ├── environment.ts         # Development config
│       └── environment.prod.ts    # Production config
├── public/
│   └── _redirects                # Netlify/Vercel SPA routing fix
```

***

## 🚀 Local Development Setup

### Prerequisites
- Node.js v18+
- Angular CLI v19

```bash
npm install -g @angular/cli
```

### 1. Clone the repo

```bash
git clone https://github.com/kartikmax/expense-tracker-frontend.git
cd expense-tracker-frontend
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment

Open `src/environments/environment.ts` — it already points to localhost:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

> Make sure the backend is running locally on port 5000.
> Backend setup: [https://github.com/kartikmax/tracker-api](https://github.com/kartikmax/tracker-api)

### 4. Run the app

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200)

***

## 🏗️ Production Build

```bash
ng build --configuration=production
```

Output is in `dist/expense-tracker-frontend/browser/`

The production build automatically uses `environment.prod.ts` which points to the live backend API.

***

## ☁️ Deployment (Vercel)

This frontend is deployed on Vercel.

### Vercel Settings

| Field | Value |
|---|---|
| **Framework Preset** | Angular |
| **Build Command** | `ng build --configuration=production` |
| **Output Directory** | `dist/expense-tracker-frontend/browser` |

### Environment

No environment variables needed in Vercel for the frontend — the API URL is baked into `environment.prod.ts` at build time.

***

## 🔌 API Endpoints Used

Base URL: `https://tracker-api-kappa.vercel.app/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses` | Fetch all expenses |
| `POST` | `/expenses` | Create new expense |
| `DELETE` | `/expenses/:id` | Delete expense by ID |

***

## ✨ Features

- 📊 Live dashboard with summary cards (total expenses, income, pending, savings %)
- 🍩 Donut chart for category-wise expense breakdown
- 📋 Transactions table with search, sort and pagination
- ➕ Add expense via dialog form
- 🗑️ Delete expense with instant UI update
- 📱 Responsive layout with Angular Material sidenav
- 🔗 Connected to live MongoDB Atlas database

***

## 📦 Key Dependencies

```json
"@angular/material": "^19.2.19",
"apexcharts": "^3.54.1",
"ng-apexcharts": "^1.7.4"
```

***

## 👤 Author

**Kartik Yadav**
GitHub: [@kartikmax](https://github.com/kartikmax)
