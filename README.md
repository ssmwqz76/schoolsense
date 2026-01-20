<p align="center">
  <img src="public/assets/schoolsense.png" alt="SchoolSense Logo" width="120" />
</p>

<h1 align="center">SchoolSense</h1>

<p align="center">
  <strong>Stop waste before it's spent — simple, smart, and fast.</strong>
</p>

<p align="center">
  AI-powered procurement audit platform for school districts and municipalities
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Overview

SchoolSense is a government procurement audit and efficiency platform designed to combat wasteful spending through AI-powered receipt analysis and purchase review workflows. Built for school districts and municipalities, it leverages Google's Gemini AI to automatically analyze purchase receipts, detect financial anomalies, and guide procurement teams through evidence-based spending decisions.

### Why SchoolSense?

- **$500 Hammers No More**: Automatically detects purchases priced significantly above market value
- **Zombie Spend Detection**: Identifies recurring subscriptions and unused services draining budgets
- **Streamlined Workflows**: Role-based system for submitters, reviewers, and administrators
- **Audit-Ready**: Complete transaction history with timestamps and user attribution

---

## Features

### AI-Powered Receipt Analysis

- **Automatic Data Extraction**: Vendor, amount, date, description, and GL code classification
- **Market Price Benchmarking**: Flags purchases exceeding fair market value by 20%+
- **Confidence Scoring**: 0-100 reliability score for each analysis
- **Smart Categorization**: Automatic expense categorization and GL code suggestions

### Intelligent Anomaly Detection

| Flag | Description |
|------|-------------|
| `DUPLICATE` | Similar purchases detected within 60-day window |
| `PRICE_ANOMALY` | Pricing significantly above category average |
| `MARKET_DEVIATION` | Purchase price exceeds market benchmark |
| `ZOMBIE_SPEND` | Unused or underutilized subscription detected |
| `RENEWAL` | Subscription renewal requiring review |
| `UNUSUAL_ITEM` | Unexpected purchase for department category |

### Role-Based Workflows

**Submitter** — Department staff
- Upload receipt images with drag-and-drop
- Track submission status in real-time
- Receive AI-powered coaching on procurement best practices

**Reviewer** — Finance/procurement auditors
- Process flagged purchases efficiently
- Approve or reject with AI-generated professional emails
- Access detailed analytics and spending patterns

**Viewer** — Administrators (read-only)
- Executive dashboards with spending insights
- System-wide analytics and reports
- Complete audit log access

### Additional Features

- Real-time Firebase synchronization
- Dark mode support
- Mobile-responsive design
- Professional rejection email generation
- Comprehensive audit logging

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- Google Gemini API key
- Firebase project (optional for full functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/schoolsense.git
cd schoolsense

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

### Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your API keys:

```env
# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase (from Firebase Console > Project Settings)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Architecture

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript 5.8, Vite 6 |
| **Styling** | TailwindCSS, Lucide React icons |
| **AI** | Google Gemini 3.0 Flash |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Hosting** | Firebase Hosting |

### Project Structure

```
schoolsense/
├── App.tsx                 # Main application with routing
├── index.tsx               # React entry point
├── types.ts                # TypeScript interfaces & enums
├── constants.tsx           # Configuration & mock data
│
├── components/
│   ├── Layout.tsx          # Navigation & sidebar
│   ├── Dashboard.tsx       # Role-specific dashboards
│   ├── Upload.tsx          # Receipt upload & processing
│   ├── Review.tsx          # Approval workflow
│   ├── MySubmissions.tsx   # Submission history
│   ├── ReviewQueue.tsx     # Reviewer queue
│   ├── Reports.tsx         # Analytics dashboards
│   ├── AuditLog.tsx        # Transaction history
│   ├── Landing.tsx         # Public home page
│   ├── Login.tsx           # Authentication
│   └── Common.tsx          # Reusable UI components
│
├── services/
│   ├── firebase.ts         # Firebase configuration
│   └── geminiService.ts    # AI analysis functions
│
└── public/
    └── assets/
        └── schoolsense.png # Logo
```

### Data Model

```typescript
interface PurchaseDocument {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  department: string;
  submittedBy: string;
  status: ReviewStatus;
  flags: Flag[];
  fileUrl: string;
  aiConfidence: number;
  suggestedGlCode: string;
  marketPriceEstimate?: number;
  isSubscription: boolean;
  rejectionFlags?: string[];
  rejectionNotes?: string;
  rejectedBy?: string;
  rejectedAt?: string;
}

enum ReviewStatus {
  PENDING = 'pending',
  FLAGGED = 'flagged',
  VALIDATED = 'validated',
  RESOLVED = 'resolved',
  REJECTED = 'rejected'
}
```

---

## Usage

### Uploading Receipts

1. Navigate to **Upload** from the sidebar
2. Drag and drop a receipt image or click to browse
3. AI automatically extracts purchase details
4. Review extracted data and submit for approval

### Reviewing Purchases

1. Access the **Review Queue** (Reviewer role required)
2. Review flagged items with AI-generated insights
3. Approve valid purchases or reject with reasons
4. AI generates professional rejection emails automatically

### Generating Reports

1. Navigate to **Reports** (Viewer/Reviewer access)
2. View spending trends and anomaly patterns
3. Export data for external analysis
4. Monitor department-level spending metrics

---

## API

### Gemini Service

#### `analyzeReceipt(imageData: string): Promise<ReceiptAnalysis>`

Analyzes a receipt image and returns structured data.

```typescript
const analysis = await analyzeReceipt(base64ImageData);

// Returns:
{
  vendor: "Office Supplies Inc",
  amount: 245.99,
  date: "2024-01-15",
  description: "Printer cartridges (4-pack)",
  category: "Office Supplies",
  suggestedGlCode: "6100-001",
  aiConfidence: 92,
  marketPriceEstimate: 189.99,
  isSubscription: false,
  flags: [
    { type: "MARKET_DEVIATION", severity: "medium", message: "Price 30% above market average" }
  ]
}
```

#### `generateRejectionEmail(purchase: PurchaseDocument, flags: string[]): Promise<string>`

Generates a professional rejection email based on selected flags.

---

## Deployment

### Firebase Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase Hosting
firebase deploy
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | Yes |
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |

### Firebase Configuration

The project uses the following Firebase services:
- **Authentication**: Email/password auth
- **Firestore**: Document database for purchases and users
- **Storage**: Receipt image storage
- **Hosting**: Static site hosting

---

## Security

- **Authentication**: Firebase Auth with email/password
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Firestore security rules enforce user-scoped access
- **Storage**: User-scoped image uploads with Firebase Storage rules
- **API Security**: Environment variables for sensitive keys

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI-powered analysis
- [Firebase](https://firebase.google.com/) for backend services
- [Lucide](https://lucide.dev/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling

---

<p align="center">
  Built with care for efficient government spending
</p>
