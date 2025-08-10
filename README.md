# Collaborator Portal

A comprehensive web application for managing collaborator relationships, payments, and project tracking. Built with React, TypeScript, and Tailwind CSS.

## Features

### Staff Portal
- **Dashboard Overview**: Activity tracking and performance metrics
- **Invoice Management**: Upload and submit invoices with file attachments
- **Payment Requests**: Submit expense reimbursements, advances, and bonus requests
- **Time Tracking**: Live timer and manual time entry with project association
- **Submission History**: Track status of all submissions with filtering options

### Admin Dashboard
- **Payment Management**: Review, approve, and process payments with bulk actions
- **Staff Management**: Manage collaborator profiles, rates, and performance
- **Project Analytics**: Budget tracking, progress monitoring, and resource allocation
- **Financial Reports**: Comprehensive spending analysis with trends and insights
- **Platform Integration**: Support for Wise, PayPal, and Veem payment platforms

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload with TypeScript support

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd collaborator-portal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

**Admin Access:**
- Email: `admin@company.com`
- Password: `admin123`

**Staff Access:**
- Email: `sarah@company.com`
- Password: `staff123`

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── staff/          # Staff portal components
│   ├── AdminDashboard.tsx
│   ├── StaffDashboard.tsx
│   └── LoginForm.tsx
├── hooks/
│   └── useAuth.ts      # Authentication logic
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx
└── main.tsx
```

## Features in Detail

### Authentication & Authorization
- Role-based access control (Admin/Staff)
- Secure login with session management
- Protected routes and component-level permissions

### Payment Processing
- Multi-platform payment support (Wise, PayPal, Veem)
- Bulk payment processing capabilities
- Manual payment tracking and reconciliation
- Automated status updates and notifications

### Analytics & Reporting
- Real-time financial dashboards
- Project performance metrics
- Spending trends and budget analysis
- Exportable reports in multiple formats

### File Management
- Secure file upload for invoices and receipts
- Document versioning and history
- File type validation and size limits
- Cloud storage integration ready

## Customization

### Styling
The application uses a comprehensive design system built with Tailwind CSS:
- Primary colors: Blue (#2563eb)
- Secondary colors: Slate (#64748b)
- Success: Green (#059669)
- Warning: Amber (#d97706)
- 8px spacing system for consistent layouts

### Configuration
Key configuration options can be found in:
- `tailwind.config.js` - Design system and styling
- `src/types/index.ts` - Data models and interfaces
- `src/hooks/useAuth.ts` - Authentication settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Advanced analytics and AI insights
- [ ] Multi-currency support
- [ ] API documentation and SDK
- [ ] Third-party integrations (Slack, Teams, etc.)

---

Built with ❤️ for modern collaborator management
