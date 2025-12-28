# MovieApp Dashboard

A modern, responsive admin dashboard for managing the MovieApp platform, built with React 19, TypeScript, and Tailwind CSS. This dashboard provides administrators with powerful tools to manage users, premium subscriptions, purchase requests, payment methods, and platform settings.

## Features

- **User Management**: Complete user administration with role-based access control (user, admin, superAdmin)
- **Premium Subscription Management**: Create, update, and manage premium plans with expiration tracking
- **Purchase Request Processing**: Review and approve/reject premium purchase requests with image uploads
- **Payment Method Management**: Configure multiple payment types and bank account details
- **Real-time Notifications**: Socket.io integration for instant updates on new purchase requests
- **Advanced Data Tables**: Sortable, filterable tables with pagination for efficient data management
- **Responsive Design**: Modern UI built with shadcn/ui components and Tailwind CSS
- **Role-based Access Control**: Different permission levels for admin and superAdmin users
- **Session Management**: Multi-device session handling with JWT authentication

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.io Client
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Data Tables**: TanStack Table
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Forms**: Custom form components with validation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MovieApp Backend API running (see MovieAppBackend README)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieAppDashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - The dashboard connects to the MovieApp Backend API
   - Ensure the backend is running and accessible
   - Configure API base URL in `src/axios.ts` if needed

4. **Start the development server**
   ```bash
   npm run dev
   ```

The dashboard will start on `http://localhost:5173` (or the configured port).

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
MovieAppDashboard/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── myComponents/        # Custom components
│   │   ├── app-sidebar.tsx  # Main sidebar navigation
│   │   ├── data-table.tsx   # Reusable data table component
│   │   └── dataColumn/      # Table column definitions
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Main layout with sidebar
│   │   ├── Users.tsx        # User management page
│   │   ├── PurchaseRequest.tsx # Purchase request management
│   │   ├── Plans.tsx        # Premium plans management
│   │   ├── Payment.tsx      # Payment methods management
│   │   ├── Login.tsx        # Admin login page
│   │   └── Index.tsx        # Dashboard overview
│   ├── reducer/             # Redux reducers
│   │   ├── user.reducer.ts  # User state management
│   │   └── purchase.reducer.ts # Purchase request state
│   ├── store/               # Redux store configuration
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   ├── route.tsx            # Route definitions
│   ├── protectRoute.tsx     # Route protection logic
│   ├── axios.ts             # API client configuration
│   └── socket.tsx           # Socket.io client setup
├── components.json          # shadcn/ui configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Key Features Explained

### User Management
- View all users with pagination and filtering (All, User, Admin, Premium)
- Promote users to admin role (superAdmin only)
- Extend premium subscriptions manually
- Monitor user activity and premium status

### Premium Plans Management
- Create new premium subscription plans
- Update existing plans (pricing, duration, features)
- Delete plans (with appropriate checks)
- View all active plans

### Purchase Request Processing
- Review pending premium purchase requests
- View payment proof images uploaded by users
- Approve or reject requests with status updates
- Real-time notifications for new requests

### Payment Methods Management
- Configure multiple payment types (Bank Transfer, etc.)
- Manage bank account details for each payment method
- Toggle payment method availability
- Admin-only access for security

## Authentication & Authorization

The dashboard implements role-based access control:

- **superAdmin**: Full access to all features including user promotion
- **admin**: Access to most features except user role management
- **user**: No access to admin dashboard (automatically redirected)

### Authentication Flow
1. Admin logs in through `/login` route
2. JWT tokens are stored in cookies
3. Protected routes check authentication and role permissions
4. Automatic logout on token expiration or role mismatch

## API Integration

The dashboard communicates with the MovieApp Backend API:

- **Base URL**: Configured in `src/axios.ts`
- **Authentication**: JWT tokens in cookies
- **Real-time Updates**: Socket.io for purchase request notifications
- **Error Handling**: Toast notifications for user feedback

### Key API Endpoints Used
- `/api/auth/*` - Authentication endpoints
- `/api/user/*` - User management
- `/api/plan/*` - Premium plans
- `/api/purchase/*` - Purchase requests
- `/api/payment/*` - Payment methods
- `/api/bankAccount/*` - Bank accounts

## UI Components

### shadcn/ui Components
The dashboard uses shadcn/ui for consistent, accessible components:
- Dialog, Dropdown Menu, Select, Tabs, Tooltip
- Radio Group, Separator, Slot for complex interactions
- Custom styling with Tailwind CSS

### Custom Components
- **AppSidebar**: Main navigation with collapsible sidebar
- **DataTable**: Reusable table with sorting, filtering, pagination
- **Data Columns**: Type-safe column definitions for different data types

## State Management

### Redux Toolkit
- **user.reducer**: Manages authentication state and user data
- **purchase.reducer**: Handles purchase request data and real-time updates
- Centralized state for consistent data flow

### Custom Hooks
- `useStoreSelector`: Typed selector for Redux state
- `useStoreDispatch`: Typed dispatch function
- `useAdminSocket`: Socket.io integration for admin notifications

## Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint configuration for code quality
- Consistent naming conventions
- Component composition over inheritance

### State Management
- Use Redux for global state (user, purchases)
- Local state for component-specific data
- Immer for immutable state updates

### Component Patterns
- Functional components with hooks
- Custom hooks for reusable logic
- Props interfaces for type safety
- Error boundaries for resilience

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
- Follow existing code patterns and TypeScript types
- Test components in isolation
- Ensure responsive design works on all screen sizes
- Add proper error handling and loading states
- Update documentation for new features

## Build & Deployment

### Development
```bash
npm run dev
```
Starts the development server with hot reload and error overlay.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your web server
3. Ensure the backend API is accessible
4. Configure environment variables for production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

**API Connection Issues**
- Verify the backend API is running
- Check CORS configuration in backend
- Ensure correct API base URL in axios configuration

**Authentication Problems**
- Clear browser cookies and local storage
- Check JWT token expiration
- Verify user role permissions

**Real-time Updates Not Working**
- Check Socket.io server configuration
- Verify network connectivity
- Check browser console for connection errors

**Build Issues**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

## License

This project is licensed under the ISC License.

## Support

For support or questions, please contact the development team or create an issue in the repository.
