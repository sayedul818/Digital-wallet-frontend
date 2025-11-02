# Digital Wallet Frontend

A modern, responsive digital wallet application built with React, TypeScript, Vite, and Shadcn UI components.

## Project Structure

```
digital-wallet-frontend/
├── src/
│   ├── App.tsx           # Root component
│   ├── main.tsx         # Application entry point
│   ├── assets/          # Static assets
│   ├── components/      # React components
│   │   ├── GuidedTour.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Route components
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── agent/      # Agent dashboard pages
│   │   ├── auth/       # Authentication pages
│   │   └── user/       # User dashboard pages
│   └── store/          # State management
├── components.json     # Shadcn UI configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── vite.config.ts     # Vite configuration
```

## Features

- **Modern Stack**: Built with React 18, TypeScript, and Vite
- **Beautiful UI**: Utilizes Shadcn UI components with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling
- **Authentication**: Complete auth flow with protected routes
- **Responsive Design**: Mobile-first approach
- **Role-based Access**: Admin, Agent, and User dashboards
- **Real-time Updates**: Transaction notifications
- **Guided Tours**: Interactive user onboarding

## Prerequisites

- Node.js (v14 or higher)
- npm or bun package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd digital-wallet-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Components

### Authentication
- Login form with validation
- Registration with role selection
- Protected route wrapper
- Authentication state management

### Dashboard Layouts
- Admin dashboard with user management
- Agent dashboard for transaction processing
- User dashboard for wallet operations

### UI Components
- Custom Shadcn UI components
- Responsive navigation
- Transaction forms
- Balance display
- Activity history

## State Management

The application uses Redux Toolkit for state management:
- Authentication state
- User information
- Transaction history
- Wallet balance
- Notifications

## Routing

Routes are organized by user roles:

### Public Routes
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/dashboard` - User dashboard
- `/admin/*` - Admin routes
- `/agent/*` - Agent routes
- `/user/*` - User routes

## Styling

- Tailwind CSS for utility-first styling
- Shadcn UI for consistent design system
- Custom theme configuration
- Dark mode support

## API Integration

The frontend communicates with the backend through:
- Axios for HTTP requests
- Redux Toolkit Query for API state management
- Request/response interceptors
- Error handling

## Performance Optimization

- Code splitting with React.lazy
- Memorized components
- Optimized bundle size
- Asset optimization

## Security Features

- JWT token management
- XSS protection
- CSRF protection
- Secure HTTP headers
- Input sanitization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add appropriate documentation
- Include unit tests for new features
- Ensure responsive design
- Maintain accessibility standards

## Deployment

The frontend is configured for deployment on Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
