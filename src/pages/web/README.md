
---

# 📊 Dashboard and chartbar Feature

### 🧑‍💻 Developed by: Lidiya Gezahegn

**ID:** UGR/23809/13

---

## 🔧 Framework & Tech Stack

* **Framework**: React.js
* **Architecture**: Modular Monorepo structure
* **Languages**: TypeScript, JavaScript
* **Styling**: Tailwind CSS / Custom styles (assumed from context)
* **Package Management**: npm

---

## 📁 Project Structure

```
app/
├── dashboard/                 # Contains main dashboard components
│   ├── Dashboard.tsx          # Main dashboard UI and logic
│   └── data.json              # Static/mock data for dashboard
├── layout.tsx                 # Shared layout for pages
├── pages.tsx                  # Page routing and main layout logic
├── favicon.ico                # App icon

components/                    # Reusable UI components
├── Accordion.tsx
├── app-sidebar.tsx
├── chart-area-interactive.tsx
├── data-table.tsx
├── nav-documents.tsx
├── nav-main.tsx
├── nav-user.tsx
├── providers.tsx
├── section-cards.tsx
├── site-header.tsx

hooks/                         # Custom React hooks (future use)

lib/                           # Shared utility libraries
├── .gitkeep

public/                        # Static assets (not shown here)

.gitignore                     # Ignored files
components.json                # Component configurations
eslint.config.js               # Linting config
next-env.d.ts                  # Next.js TypeScript types
next.config.mjs                # Next.js config
package.json                   # Project metadata & dependencies
postcss.config.mjs             # PostCSS config
README.md                      # Project documentation
```

---

## 🚀 Features

### ✅ Dashboard (Implemented by Lidiya Gezahegn)

* **File:** `pages/app/dashboard/Dashboard.tsx`
* **File:** `pages/Chartbar.tsx`
* **Data Source:** `data.json`
* **Functionality:**

  * Visualizes core metrics and interactive charts.
  * Pulls static data from a JSON file.
  * Integrates components like tables, charts, and cards.
  * Provides responsive layout through shared `layout.tsx`.

### 📊 Charts

* **File:** `components/chart-area-interactive.tsx`
* Displays dynamic chart data.
* Likely used in the dashboard to visualize trends.

### 📋 Data Table

* **File:** `components/data-table.tsx`
* Structured display of tabular data with possible sorting and filtering.

### 🧭 Navigation

* **Files:**

  * `components/nav-main.tsx` - Main navigation bar
  * `components/nav-documents.tsx` - Sidebar/document navigation
  * `components/nav-user.tsx` - User navigation (profile, logout)

### 📁 Layout

* **File:** `app/layout.tsx`
* Handles global layout setup for consistent structure across pages.

### 🔗 Providers

* **File:** `components/providers.tsx`
* Handles app-wide providers (contexts, theme, session, etc.)

### 🧩 Section Cards / Accordion

* **Files:** `components/section-cards.tsx`, `Accordion.tsx`
* Provides collapsible sections and card-based UI to organize content cleanly.

### 🧭 Sidebar

* **File:** `components/app-sidebar.tsx`
* Sidebar component for navigating between app modules.

---

## 🏁 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **View the app**
   Open [http://localhost:3000/Dashboard](http://localhost:3000/Dashboard) and (http://localhost:3000/Chartbar)  in your browser.
   
   

---

## 🧪 Testing & Debugging

* Ensure TypeScript types are correctly used.
* Use console logs or React Developer Tools for debugging components.
* Validate responsiveness and interactivity of dashboard features.

---




