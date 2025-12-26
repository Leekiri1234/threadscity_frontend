# ThreadsCity Frontend

A modern, responsive web application inspired by Threads, built with React, TypeScript, and Vite.

## 🚀 Features

- **User Authentication**: Login, register, and password reset functionality
- **Post Management**: Create, view, and interact with posts
- **Real-time Notifications**: Stay updated with user activities
- **User Profiles**: View and manage user profiles
- **Follow System**: Follow/unfollow other users
- **Search Functionality**: Search for users and posts
- **Responsive Design**: Optimized for desktop and mobile devices
- **Theme Support**: Multiple theme options for personalized experience
- **Feed Selector**: Choose between different feed types

## 🛠️ Tech Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 6.3.1
- **Routing**: React Router DOM 7.5.1
- **HTTP Client**: Axios 1.8.4
- **UI Framework**: React Bootstrap 2.10.9 + Bootstrap 5.3.5
- **Performance Monitoring**: Web Vitals 4.2.4

## 📁 Project Structure

```
threadscity_frontend/
├── public/                 # Static assets
│   └── manifest.json      # PWA manifest
├── src/
│   ├── assets/            # Images, icons, and other static files
│   ├── components/        # Reusable React components
│   │   ├── CreatePostModal.tsx
│   │   ├── FeedSelector.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationsSelector.tsx
│   │   ├── PostItem.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ReplyModal.tsx
│   │   └── ThemeSelector.tsx
│   ├── contexts/          # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useTheme.ts
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Notifications.tsx
│   │   ├── PostDetail.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   └── Search.tsx
│   ├── services/          # API and service integrations
│   │   ├── api.ts
│   │   └── auth.service.ts
│   ├── styles/            # CSS stylesheets
│   │   ├── animations.css
│   │   ├── auth.css
│   │   ├── base.css
│   │   ├── home.css
│   │   ├── index.css
│   │   ├── layout.css
│   │   ├── modal.css
│   │   ├── navbar.css
│   │   ├── notifications.css
│   │   ├── post.css
│   │   ├── profile.css
│   │   ├── search.css
│   │   ├── theme-selector.css
│   │   ├── utilities.css
│   │   └── variables.css
│   ├── types/             # TypeScript type definitions
│   │   └── custom.d.ts
│   ├── App.tsx            # Root application component
│   └── index.tsx          # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.node.json     # TypeScript configuration for Node
└── vite.config.ts         # Vite configuration
```

## 🔧 Prerequisites

Before you begin, ensure you have installed:

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**: Latest version
- **Backend API**: The ThreadsClone backend server running on `http://localhost:3001`

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd threadscity_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## 🚀 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
# or
yarn dev
```

The application will open automatically at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 🔌 API Configuration

The application is configured to proxy API requests to the backend server:

- **API Base URL**: `/api`
- **Backend Server**: `http://localhost:3001`
- **Proxy Configuration**: See `vite.config.ts`

All API requests are automatically routed through the Vite dev server proxy to avoid CORS issues during development.

## 🎨 Styling

The project uses a modular CSS approach with separate stylesheets for different components and pages:

- **CSS Variables**: Defined in `variables.css` for consistent theming
- **Base Styles**: Common styles in `base.css`
- **Component Styles**: Individual CSS files for each major component
- **Animations**: Custom animations in `animations.css`
- **Bootstrap**: Leverages React Bootstrap for UI components

## 🔐 Authentication

Authentication is managed through:

- **AuthContext**: Provides authentication state throughout the app
- **AuthService**: Handles API calls for login, register, and logout
- **ProtectedRoute**: Component wrapper for routes requiring authentication
- **Cookies**: Session management with HTTP-only cookies

## 📱 Key Features

### Pages

- **Home**: Main feed with posts from followed users
- **Login/Register**: User authentication pages
- **Profile**: User profile with posts and follow information
- **Notifications**: Real-time notification center
- **Search**: Search for users and content
- **PostDetail**: Detailed view of individual posts with comments

### Components

- **Navbar**: Main navigation with vertical layout
- **CreatePostModal**: Modal for creating new posts
- **ReplyModal**: Modal for replying to posts
- **PostItem**: Reusable post card component
- **FeedSelector**: Switch between different feed types
- **ThemeSelector**: Theme customization component
- **NotificationsSelector**: Notification filtering options

## 🔧 TypeScript Configuration

The project uses strict TypeScript configuration:

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Inspired by Meta's Threads application
- Built with React and Vite
- UI components from React Bootstrap

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**Made with ❤️ by the ThreadsCity Team**
