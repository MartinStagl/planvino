# PlanVino - Vineyard Management App

PlanVino is a comprehensive mobile application designed to help winegrowers manage their vineyard operations efficiently. The app provides tools for task management, calendar organization, and collaboration with other winegrowers.

## Features

### 📅 Calendar Management
- Weekly task view with color-coded modules
- Add, edit, and delete tasks
- Share tasks with other winegrowers
- Copy tasks from other users
- Module-based organization (vineyard, cellar, marketing)

### ⚙️ Settings & Preferences
- Profile management
- Module preferences
- Notification settings (email, WhatsApp, push)
- Privacy controls

### 👤 User Management
- Email/phone registration
- Google account integration
- Vineyard information setup
- Friend connections

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/planvino.git
cd planvino
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
planvino/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # Main app screens
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API and other services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── assets/             # Images and other static assets
└── App.tsx            # Root component
```

## Technology Stack

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Paper
- React Native Calendars
- Date-fns

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@planvino.com or join our Slack channel. 