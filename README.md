# Atelier Finance Dashboard

A premium, institutional-grade finance dashboard built with **React** and **Vite**. This project focuses on high-fidelity UI/UX, robust state management, and clear data visualization to meet and exceed all criteria for the Frontend Evaluation assignment.

---

## 📸 Visual Previews & Themes

The application features a sophisticated dual-theme system synchronized with user roles. All screenshots are available in the `./screenshots/` directory.

> [!TIP]
> **Role-Based Themes**:
> - **Dark Mode**: Optimized for the **Universal User** experience, focusing on high-readability financial monitoring.
> - **Light Mode**: Tailored for the **Institutional Admin**, providing a clean, high-precision environment for wealth management.
> - *Users can toggle between themes at any time via the header icon.*

### 🏛️ Dashboard Overview
| Dark Mode (User) | Light Mode (Admin) |
| :--- | :--- |
| ![Dashboard Dark](./screenshots/dashboard_dark_user.png) | ![Dashboard Light](./screenshots/dashboard_light_admin.png) |

### 📒 Financial Ledger
| Dark Mode (User) | Light Mode (Admin) |
| :--- | :--- |
| ![Ledger Dark](./screenshots/ledger_dark_user.png) | ![Ledger Light](./screenshots/ledger_light_admin.png) |

### 🧠 Strategic Insights
| Dark Mode (User) | Light Mode (Admin) |
| :--- | :--- |
| ![Insights Dark](./screenshots/insights_dark_user.png) | ![Insights Light](./screenshots/insights_light_admin.png) |

### 👤 User Profile
| Dark Mode (User) | Light Mode (Admin) |
| :--- | :--- |
| ![Profile Dark](./screenshots/profile_dark_user.png) | ![Profile Light](./screenshots/profile_light_admin.png) |

---

## 🌟 Features Mapping (Assignment Requirements)

### 1. Dashboard Overview
- **Summary Cards**: Real-time calculation of **Total Assets**, **Monthly Income**, and **Monthly Expenses** with percentage delta indicators.
- **Wealth Projection (Time-Based)**: Interactive area chart (Recharts) that adjusts based on the active account and selected time range (6M, 1Y, ALL).
- **Asset Allocation (Categorical)**: High-transparency breakdown of portfolio diversity (Real Estate, Equities, Digital Assets, etc.) with custom icons.

### 2. Transactions Section
- **The Ledger**: A sophisticated data table displaying Date, Description, Category, Type, and Amount.
- **Advanced Filtering**: Filter by Account (Visa/Mastercard), Category, Asset Type, and Status.
- **Live Search**: Global search bar in the header and local search in the ledger for instant result refinement.
- **CSV Export**: (Optional Enhancement) One-click export to download your filtered transaction history as a CSV file.

### 3. Basic Role-Based UI
- **Simulated Roles**: Toggle between **Viewer** and **Admin** directly in the header.
- **Dynamic Behavior**: 
    - **Viewer**: Read-only access to all dashboards and ledgers.
    - **Admin**: Unlocks full CRUD (Create, Read, Update, Delete) capabilities for transactions and financial accounts (Cards).

### 4. Insights Section
- **Portfolio Insights**: Automated alerts based on data trends (e.g., "Tech sector allocation is 12% higher than target").
- **Allocation Analysis**: A dedicated modal that runs a deep-dive analysis of your current financial health.
- **Net Cash Flow**: A summary card showing the real-time profitability of your monthly operations.

### 5. State Management
- **React Context API**: Centralized state in `FinanceContext` and `ThemeContext`.
- **LocalStorage Persistence**: (Optional Enhancement) All transactions, card identities, user profiles, and UI themes persist across page reloads.
- **Real-Time Reactivity**: Changes in any part of the application (e.g., adding a transaction) instantly propagate to the dashboard metrics.

### 6. UI and UX Excellence
- **Institutional Design**: A clean, "Glassmorphic" aesthetic with premium typography (Inter) and a professional dark/light mode engine.
- **Responsiveness**: Fully optimized for mobile, tablet, and desktop using a custom Grid/Flexbox architecture.
- **Empty States**: Gracefully handles scenarios with no data or no matching search results.

---

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS (Modern CSS Variables, custom design system)
- **Visualization**: Recharts
- **Iconography**: Lucide React
- **Persistence**: Browser LocalStorage

---

## 💻 Setup and Installation

1. **Clone and Navigate**
   ```bash
   cd "Finance Dashboard"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗 Key Architectural Decisions

- **Prop-Drilling Avoidance**: Used React Context for global state to ensure the UI remains decoupled and performant.
- **Data Hardening**: Implemented strict numeric and date formats to ensure calculation accuracy across all account views.
- **Component Modularity**: Every UI element (Cards, Modals, Filters) is built as a reusable, focused component for scalability.

---

### Developed for Performance & Precision. 💎
