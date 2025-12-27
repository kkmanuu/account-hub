# 🎯 Modern SaaS Settings & Account Management Dashboard

A production-grade, enterprise-quality settings and account management dashboard built with React, TypeScript, and Tailwind CSS. Inspired by leading SaaS platforms like Stripe, Vercel, Linear, and Notion.

## ✨ Features

### 👤 Profile Management
- User avatar upload with real-time preview
- Editable profile fields (name, email, role, timezone, language)
- Inline form validation
- Smart save button (disabled until changes detected)
- Success/error feedback with toast notifications

### 🔐 Security & Authentication
- Password change with strength meter
- Two-factor authentication toggle
- Active sessions management
  - View all active devices and locations
  - Last active timestamps
  - Remote session logout capability
- Confirmation modals for sensitive actions
- Security alerts for weak passwords

### 🔔 Notification Preferences
- Granular notification controls
- Multiple channels (Email, In-app, SMS)
- Categorized by type:
  - Product updates
  - Billing alerts
  - Security notifications
- Master toggles per section
- Smooth toggle animations

### 💳 Billing & Subscription
- Current plan overview with highlighted card
- Real-time usage metrics with progress indicators
- Plan upgrade/downgrade options
- Comprehensive billing history table
- Payment method management
- Invoice download functionality

### 🚩 Feature Flags
- Advanced feature toggle system
- Environment badges (Beta, Stable, Experimental)
- Search and filter capabilities
- Detailed feature descriptions
- Confirmation modals for experimental features
- Production-grade feature management

## 🛠 Tech Stack

- **React 18** - Modern React with Hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful, consistent icons
- **Framer Motion** - Smooth animations (optional)
- **Headless UI / Radix UI** - Accessible components

## 🎨 Design System

### Colors
- **Background**: Slate/Gray neutral palette
- **Cards**: White with subtle borders
- **Primary Accent**: Indigo/Blue/Emerald
- **Text**: Hierarchical gray scale

### Components
- Border radius: 8-12px
- Soft shadows for depth
- Smooth hover states and transitions
- Micro-interactions throughout

### Responsive Design
- Desktop-first approach
- Collapsible sidebar on mobile (hamburger menu)
- Stacked card layouts for small screens
- Touch-friendly interactive elements

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/kkmanuu/account-hub

# Navigate to project directory
cd account-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎯 Key Features for Recruiters

### ✅ Production-Ready Code
- TypeScript for type safety
- Component-based architecture
- Reusable UI components
- Clean code organization

### ✅ Advanced UX Patterns
- Optimistic UI updates
- Loading skeletons
- Empty states with illustrations
- Inline validation
- Toast notifications
- Confirmation modals

### ✅ Accessibility
- ARIA labels throughout
- Keyboard navigation support
- Focus management
- Screen reader friendly

### ✅ Performance
- Code splitting
- Lazy loading
- Optimized re-renders
- Efficient state management

### ✅ Enterprise Standards
- Security best practices
- Form validation
- Error handling
- User feedback systems

## 🌙 Additional Features

- **Dark Mode**: Theme toggle with persistence
- **Keyboard Shortcuts**: Quick navigation panel
- **Search**: Global search functionality
- **Animations**: Smooth transitions with Framer Motion
- **Mobile Optimized**: Fully responsive design


## 🔧 Configuration

### Environment Variables

```env
VITE_API_URL=your_api_endpoint
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

### Customization

The dashboard is highly customizable. Modify the following files:

- `tailwind.config.js` - Colors, spacing, breakpoints
- `src/constants/theme.ts` - Theme configuration
- `src/components/ui/` - Base component styles

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@kkmanuu](https://github.com/kkmanuu)
- LinkedIn: [Emmanuel kipngeno](https://www.linkedin.com/in/emmanuel-kipngeno/)
- Portfolio: [kipngeno.com](https://kipngeno-creative-hub.onrender.com/)

## 🙏 Acknowledgments

- Design inspiration from Stripe, Render.
- Built with [Render](https://vitejs.dev)

## 📧 Contact

For questions or feedback, reach out at: kipngenoemmanuel479@gmail.com

---

⭐ **Star this repository if you find it helpful!**

Built with ❤️ by Emmanuel kipngeno