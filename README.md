# AgendaMe - React Frontend

Professional calendar application for organizing activities with time blocks and priorities.

## Features

- 📅 **Custom Calendar Component** - Month/Week/Day views similar to Google Calendar
- 👤 **Guest & Registered Users** - Guest mode with localStorage, full features with registration
- ⏱️ **Activity Management** - Create, edit, delete activities with status tracking
- 🎯 **Priority System** (Registered Users) - 5-level priority system for activities
- 🔄 **Recurring Events** (Registered Users) - Daily, weekly, biweekly, monthly, yearly patterns
- 📊 **Completion History** (Registered Users) - Track completed activities over time
- 🎨 **Accessible Design** - WCAG compliant with semantic HTML, ARIA labels, keyboard navigation
- 📱 **PWA Support** - Offline functionality, installable on mobile and desktop
- 🔐 **Secure Authentication** - JWT tokens for registered users, guest sessions with tokens
- 💾 **LocalStorage Sync** - Offline draft saving with background sync

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file (optional):
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── Calendar/        # Calendar component
│   ├── ActivityForm/    # Form for creating/editing activities
│   ├── TaskSidebar/     # Task list sidebar
│   ├── Auth/            # Authentication components
│   ├── Header/          # Application header
│   └── shared/          # Reusable UI components
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   └── LoginPage.tsx    # Authentication page
├── redux/               # Redux state management
│   ├── store.ts         # Redux store configuration
│   ├── slices/          # Redux slices (auth, activities, etc.)
│   └── selectors.ts     # Redux selectors
├── api/                 # API service layer
│   ├── apiClient.ts     # Axios client with interceptors
│   └── *Service.ts      # Service files for each resource
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication hook
│   ├── useActivities.ts # Activities data hook
│   └── useRedux.ts      # Redux hooks
├── types/               # TypeScript interfaces
├── utils/               # Utility functions
│   ├── dateUtils.ts     # Date formatting and calculations
│   ├── validators.ts    # Form validation
│   └── constants.ts     # App constants
├── styles/              # CSS files
│   └── globals.css      # Global styles with Tailwind
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **date-fns** - Date manipulation
- **Lucide React** - Icon library
- **Workbox** - PWA support
- **Axios** - HTTP client

## API Integration

The frontend connects to the Flask backend at `http://localhost:5000/api`

All requests include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation (Tab, Arrow keys, Enter)
- ✅ Focus indicators on all interactive elements
- ✅ Color contrast ratios 4.5:1 (WCAG AA)
- ✅ Reduced motion support
- ✅ Form validation with accessible error messages
- ✅ Screen reader friendly

## PWA Features

- 📴 Offline support with service workers
- 🔄 Background sync for pending activities
- 📥 Install prompt for web app
- 🚀 Fast loading with aggressive caching

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Contributing

1. Follow TypeScript and ESLint rules
2. Use semantic HTML and ARIA labels
3. Ensure accessibility compliance
4. Test on multiple browsers and devices

## License

MIT
