# store-creation-and-domain-check

A modern Next.js application that allows users to set up their own online store by choosing a store name, checking domain availability, and selecting preferences like location, category, currency, and contact email. The app features client-side validation, real-time domain availability checks, and clean form-driven UX.

---

## Project Overview

This project was developed to streamline the onboarding process for users who want to create their own eCommerce store using a subdomain (e.g., yourstore.expressitbd.com). It ensures an intuitive flow where the user can:

- Enter and validate store details
- Check domain availability live
- Submit data to create the store via an API

---

## Features

- Store creation form with full input validation
- Real-time domain availability check
- Country, category, and currency selection from JSON data
- Debounced form validation for performance
- Built using modern tools and best practices (Next.js 15, TypeScript, Tailwind CSS)

---

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Phosphor Icons
- **API Integration**: Vercel-hosted domain check and store creation APIs

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit the app in your browser: http://localhost:3000

---

## Environment

This app does not require any secret environment variables as all API requests are handled through open endpoints. If needed, you can configure API base URLs inside:

```
src/libs/axiosInstance.ts
```

---

## Folder Structure

    src/
    ├── app/                    # Pages and layouts
    ├── components/             # Form components
    ├── data/                   # Static JSON data (countries, currencies, categories)
    ├── hooks/                  # Custom hooks
    ├── libs/                   # Axios configuration
    ├── utils/                  # Validation utilities
    └── types.ts                # TypeScript types

## License

This project is licensed under the MIT License.
