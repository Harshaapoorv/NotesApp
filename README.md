<div align="center">

<img src="src/assets/Notes.svg" alt="NotesApp Logo" width="120"/>

# NotesApp


**A production-ready cross-platform note-taking application built with React Native, FastAPI, and PostgreSQL.**

Create rich notes • Manage tasks • Organize ideas • Export data • Stay productive

---

[![Download APK](https://img.shields.io/badge/Download-Android%20APK-34A853?style=for-the-badge&logo=android)](https://drive.google.com/file/d/156IJTUGU9DmAqLCqRPfJvK8wy4Hiz6Rf/view?usp=drive_link)
![React Native](https://img.shields.io/badge/React%20Native-0.8x-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.11x-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens)
![Google OAuth](https://img.shields.io/badge/Google-OAuth-4285F4?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
[![Frontend](https://img.shields.io/badge/Frontend-React_Native-61DAFB?style=for-the-badge&logo=react)](https://github.com/Harshaapoorv/NotesApp)
[![Backend](https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi)](https://github.com/Harshaapoorv/notes-backend)

</div>

---

## 📖 Overview

NotesApp is a modern, cloud-powered productivity application designed to help users capture ideas, organize information, manage tasks, and write beautifully formatted notes through an intuitive mobile experience.

Built using **React Native**, **FastAPI**, and **PostgreSQL**, the application combines a responsive cross-platform interface with a scalable backend architecture, enabling secure authentication, cloud synchronization, rich text editing, and productivity-focused workflows.

Unlike many note-taking applications that primarily demonstrate CRUD operations, NotesApp was engineered with production-oriented architecture in mind. The project emphasizes modular design, reusable components, secure authentication, clean API design, and extensibility for future AI-powered productivity features.

Whether you're documenting ideas, maintaining technical notes with code snippets, tracking personal tasks, or organizing day-to-day work, NotesApp provides a clean and distraction-free experience while ensuring your data remains secure and accessible across sessions.

## 🔗 Part of the NotesApp Ecosystem

This repository contains the **React Native mobile application** for NotesApp.

| Repository | Technology | Purpose |
|------------|------------|---------|
| **[NotesApp](https://github.com/Harshaapoorv/NotesApp)** | React Native | Cross-platform mobile application |
| **[notes-backend](https://github.com/Harshaapoorv/notes-backend)** | FastAPI | Authentication, Notes APIs, User Management, App Configuration |

---

## 📚 Table of Contents

- ✨ [Highlights](#highlights)
- 📲 [Try the App](#try-the-app)
- 📸 [Screenshots](#screenshots)
- 🚀 [Why NotesApp Stands Out](#why-notesapp-stands-out)
- 🏗️ [Architecture](#architecture)
- ⚙️ [Technology Stack](#technology-stack)
- 📂 [Project Structure](#project-structure)
- 🔐 [Authentication & Security](#authentication--security)
- ✍️ [Rich Text Formatting System](#rich-text-formatting-system)
- ⚡ [State Management](#state-management)
- 🚀 [Performance Optimizations](#performance-optimizations)
- 📤 [Excel Export](#excel-export)
- 🌐 [Connectivity & Session Management](#connectivity--session-management)
- 📱 [User Experience](#user-experience)
- 💡 [Engineering Challenges Solved](#engineering-challenges-solved)
- 🌟 [Repository Highlights](#repository-highlights)
- 🎯 [Lessons Learned](#lessons-learned)
- 🚀 [Getting Started](#getting-started)
- 📦 [Building Release](#building-release)
- 🛣️ [Roadmap](#roadmap)
- 🤝 [Contributing](#contributing)
- 🙏 [Acknowledgements](#acknowledgements)
- 👨‍💻 [Developer](#developer)
- 📄 [License](#license)

---

<a id="highlights"></a>
## ✨ Highlights

- 🔐 Secure Email & Google Authentication
- 📧 Email OTP Verification & Password Recovery
- 📝 Rich Text Editor with Markdown-style Formatting
- 💻 Code Blocks with Programming Language Support
- 📖 Built-in Formatting Guide for Rich Text & Code Syntax
- ⭐ Starred Notes for Quick Access
- 📊 Export Notes to Excel
- ☁️ Secure Cloud Synchronization
- 📈 Task Status Tracking *(Pending → In Progress → Completed)*
- 🔒 JWT-based Authentication with Session Persistence
- 📱 Cross-Platform Mobile Application *(Android & iOS)*
- ⚡ FastAPI REST Backend with PostgreSQL

---

<a id="try-the-app"></a>
## 📲 Try the App

Experience NotesApp without setting up the development environment.

> ### 📱 Download APK

You can download and install the latest Android APK from the GitHub Releases page.

👉 [Github Release](https://github.com/Harshaapoorv/NotesApp/releases/latest)

> **Requirements**
> - Android 8.0 (API 26) or later
> - Internet connection for authentication and cloud synchronization

> **Note: **
> This APK is intended for demonstration purposes and showcases the latest stable build of NotesApp.

---

<a id="screenshots"></a>
## 📸 Screenshots

> **Authentication**

| Splash | Login / Signup | Email Verification | Launch |
|---------|----------------|--------------------|--------|
| <img width="120" height="120" alt="Splash" src="https://github.com/user-attachments/assets/c2e57b85-af2d-4747-b423-cef063575845" /> | <img width="120" height="120" alt="SignUp" src="https://github.com/user-attachments/assets/a8ffce2e-697d-43ba-8d34-c94983a020b6" /> | <img width="120" height="120" alt="VerifyEmail" src="https://github.com/user-attachments/assets/5463ae49-b8a8-4c7b-846f-349621a6cbfc" /> | <img width="120" height="120" alt="Launch" src="https://github.com/user-attachments/assets/484b2666-745d-4e85-b745-9ae638541109" /> |

---

> **Core Experience**

| Notes List | Rich Text Editor |
|------------|------------------|
| <img width="120" height="120" alt="Home" src="https://github.com/user-attachments/assets/d8bf33d6-cee6-41cd-97ec-0168f0b6415c" /> | <img width="120" height="120" alt="View Note Formatting Guide" src="https://github.com/user-attachments/assets/3c559668-60f8-4a9a-ac2f-719c046c5a61" /> |

| Formatting Guide | Code Blocks |
|------------------|-------------|
| <img width="120" height="120" alt="Create Note Formatting Guide" src="https://github.com/user-attachments/assets/a41ee5fa-6ac2-4ac2-90ef-8da88084e08b" /> | <img width="120" height="120" alt="View Note Code Block" src="https://github.com/user-attachments/assets/70935b56-78d3-487a-82fb-83a8deb62a90" /> |

| Task Status | Edit Note |
|-------------|-----------------|
| <img width="120" height="120" alt="Starred Notes" src="https://github.com/user-attachments/assets/7dbb266e-b300-49fb-aed4-464a921f9007" /> | <img width="120" height="120" alt="Edit Note" src="https://github.com/user-attachments/assets/3009ae24-e2b5-4842-8e2e-b6010c41abab" /> |

| No Internet | Export Excel |
|-------------|-----------------|
| <img width="120" height="120" alt="No Internet" src="https://github.com/user-attachments/assets/7981a6f2-404c-47a7-85f8-a71b6b3f180e" />| <img width="120" height="120" alt="ExportExcel" src="https://github.com/user-attachments/assets/aa78d3b1-8801-4ece-8ccd-b5dd306b7b8c" /> |


---

> **More**

| Profile | About | Privacy Policy | Contact |
|---------|--------|----------------|---------|
| <img width="120" height="120" alt="More" src="https://github.com/user-attachments/assets/4ae3b618-b3db-4785-9c7b-e1e36e3cebf0" /> | <img width="120" height="120" alt="About" src="https://github.com/user-attachments/assets/e28a36f2-986b-468d-ae05-13143bc4f34b" /> | <img width="120" height="120" alt="Privacy Policy" src="https://github.com/user-attachments/assets/76e2fea4-bd83-4de1-8a6b-58c3429aa691" /> | <img width="120" height="120" alt="Contact Me" src="https://github.com/user-attachments/assets/3b1f3c0e-f362-4702-a9a0-9f338258f879" /> |

---

<a id="why-notesapp-stands-out"></a>
## 🚀 Why NotesApp Stands Out

NotesApp goes beyond a traditional note-taking application by combining a modern mobile experience with production-grade backend architecture.

Some of the engineering decisions that distinguish the project include:

- Production-ready authentication architecture supporting Email, Google OAuth, OTP verification, and secure JWT session management.
- A custom rich text editing experience supporting headings, hyperlinks, lists, quotes, and language-aware code blocks.
- A dedicated **Formatting Guide** integrated into both the note creation and viewing flows, allowing users to discover formatting capabilities without leaving the application.
- Secure cloud-backed storage with user-specific authorization and persistent synchronization.
- RESTful backend architecture built using FastAPI, SQLAlchemy, Alembic, and PostgreSQL.
- An extensible foundation designed for upcoming AI-powered productivity features, offline synchronization, syntax highlighting, reminders, and advanced editor capabilities.

Rather than being developed solely as a portfolio CRUD application, NotesApp was built as a scalable software engineering project focused on maintainability, extensibility, and real-world user experience.

---

<a id="architecture"></a>
## 🏗 Architecture

NotesApp follows a modular full-stack architecture that separates concerns across the mobile application, backend services, and database layer. The project was designed with scalability, maintainability, and extensibility in mind, making it easy to introduce new features without major architectural changes.

```
                           Mobile Application
                    (React Native + Redux Toolkit)

                                   │
                                   │
                             RTK Query APIs
                                   │
                                   │
                            RESTful HTTP APIs
                                   │
        ┌──────────────────────────┴──────────────────────────┐
        │                                                     │
        ▼                                                     ▼
 Authentication APIs                               Notes & User APIs
        │                                                     │
        └──────────────────────────┬──────────────────────────┘
                                   │
                              FastAPI Backend
                                   │
                            Service Layer Pattern
                                   │
                              SQLAlchemy ORM
                                   │
                           PostgreSQL Database
                                   │
                           Alembic Migrations
```

The architecture intentionally keeps the presentation layer, business logic, and persistence layer independent, allowing each component to evolve without tightly coupling the application.

---

<a id="technology-stack"></a>
## ⚙️ Technology Stack

### 📱 Mobile Application

| Technology | Purpose |
|------------|---------|
| React Native CLI | Cross-platform mobile application |
| JavaScript | Application development |
| Redux Toolkit | Global state management |
| RTK Query | API communication & caching |
| React Navigation | Navigation system |
| React Native SVG | SVG rendering |
| Lucide React Native | Icon library |
| React Native Config | Environment configuration |
| React Native Keychain | Secure token storage |
| React Native NetInfo | Internet connectivity detection |
| Day.js | Date & time utilities |
| XLSX-JS-Style | Excel generation |

---

### ⚡ Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API framework |
| SQLAlchemy | ORM |
| Alembic | Database migrations |
| PostgreSQL | Relational database |
| Python-JOSE | JWT authentication |
| Passlib + Bcrypt | Password hashing |
| Google Auth | Google Sign-In verification |
| Resend | Email delivery |
| Pydantic | Schema validation |

---

### ☁ Cloud Infrastructure

| Technology | Purpose |
|------------|---------|
| Render | Backend hosting |
| Neon | PostgreSQL hosting |
| Firebase | Google Authentication configuration |

---

<a id="project-structure"></a>
<details>
<summary><strong>📂 Project Structure</strong></summary>

```
NotesApp
│
├── android/
├── ios/
│
├── src/
│   ├── assets/
│       ├── Notes.svg
│   │   ├── icons/
│   │   ├── images/
│   │   └── json/
│   │
│   ├── components/
│   │
│   ├── config/
│   │
│   ├── redux/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── screens/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── notes/
│   │   └── more/
│   │
│   ├── services/
│       ├── baseQuery/
│   │
│   ├── shared/
│       ├── auth/
│       ├── validators/
│   │
│   ├── stacks/
│   │
│   └── tabs/
│
├── App.tsx
├── package.json
└── README.md
```

The project adopts a feature-oriented folder structure, separating authentication, notes, common screens, shared utilities, navigation stacks, reusable UI components, and API services into independent modules.
</details>

---

<a id="authentication--security"></a>
<details>
<summary><strong>🔐 Authentication & Security</strong></summary>

NotesApp implements a production-oriented authentication system designed around secure, reusable workflows.

### Authentication Methods

- Email & Password Authentication
- Google Sign-In
- JWT Access Tokens
- Refresh Token Rotation

---

### Email Authentication Flow

```text
User Signup
      │
      ▼
Password Validation
      │
      ▼
Generate OTP
      │
      ▼
Send Verification Email
      │
      ▼
Verify OTP
      │
      ▼
Create User
      │
      ▼
Generate Access & Refresh Tokens
      │
      ▼
Authenticated Session
```

---

### Security Features

- Password hashing using Bcrypt
- JWT-based authentication
- Refresh token architecture
- Automatic session restoration
- Protected API routes
- Email verification before account creation
- OTP expiration and retry limits
- Secure Google OAuth verification
- User-specific authorization
- Environment-based configuration
</details>

---

<a id="rich-text-formatting-system"></a>
<details>
<summary><strong>✍️ Rich Text Formatting System</strong></summary>

Unlike traditional note applications that provide plain text editing, NotesApp includes a custom markdown-inspired rich text system designed specifically for mobile devices.

### Supported Formatting

| Feature | Supported |
|----------|-----------|
| Headings (H1–H3) | ✅ |
| Bold | ✅ |
| Italic | ✅ |
| Underline | ✅ |
| Strikethrough | ✅ |
| Hyperlinks | ✅ |
| Bullet Lists | ✅ |
| Numbered Lists | ✅ |
| Block Quotes | ✅ |
| Inline Code | ✅ |
| Multi-line Code Blocks | ✅ |

---

### Formatting Guide

One of the key usability features of NotesApp is the built-in **Formatting Guide**.

Instead of requiring users to remember markdown syntax, the guide provides contextual examples for every supported formatting option directly inside the application.

The guide is available from both:

- Create Note
- View Note

allowing users to quickly discover formatting capabilities without leaving their workflow.

This design improves feature discoverability while keeping the editor clean and distraction-free.

---

### Code Block Support

NotesApp supports multi-line code blocks with optional language identifiers, making it suitable for developers, students, and technical note-taking.

Examples include:

- JavaScript
- Python
- Java
- C++
- TypeScript
- SQL
- JSON
- HTML
- CSS

with future support planned for syntax highlighting.
</details>

---

<a id="state-management"></a>
<details>
<summary><strong>⚡ State Management</strong></summary>

NotesApp uses **Redux Toolkit** and **RTK Query** to provide predictable state management, efficient API communication, and automatic cache synchronization.

### Redux Toolkit

Global application state is centralized using Redux Toolkit, making authentication, session management, and UI state easy to manage across the application.

State currently managed includes:

- Authentication state
- Logged-in user information
- Access token
- Session expiration
- Application initialization
- Global UI state

---

### RTK Query

RTK Query powers all server communication and provides:

- Automatic API caching
- Background refetching
- Cache invalidation
- Optimistic updates
- Loading & error states
- Automatic token refresh
- Retry after successful authentication

The application minimizes unnecessary network requests while keeping the UI synchronized with backend data.
</details>

---

<a id="performance-optimizations"></a>
<details>
<summary><strong>🚀 Performance Optimizations</strong></summary>

Performance was considered throughout the development process to ensure a smooth experience as the application scales.

### Rendering Optimizations

- React.memo for reusable components
- useCallback for stable function references
- Optimized FlatList rendering
- Efficient component hierarchy
- Lazy screen rendering
- Controlled re-renders

---

### API Optimizations

- RTK Query caching
- Optimistic UI updates
- Automatic cache synchronization
- Selective cache invalidation
- Background token refresh
- Minimal redundant API calls

---

### User Experience Optimizations

- Skeleton loading states
- Non-blocking API interactions
- Reusable loading indicators
- Consistent error handling
- Session persistence
- Responsive layouts
</details>

---

<a id="excel-export"></a>
<details>
<summary><strong>📤 Excel Export</strong></summary>

NotesApp allows users to export all their notes into a professionally formatted Excel workbook.

Generated workbooks include:

- Styled header row
- Auto filters
- Frozen header
- Wrapped cell content
- Automatic column sizing
- Rich note content
- Status information
- Deadlines
- Creation timestamps

The generated workbook can be shared directly using the device's native sharing capabilities.

This feature enables users to create backups or analyze their notes using spreadsheet software such as Microsoft Excel or Google Sheets.
</details>

---

<a id="connectivity--session-management"></a>
<details>
<summary><strong>🌐 Connectivity & Session Management</strong></summary>

### Internet Connectivity

The application continuously monitors network connectivity using **React Native NetInfo**.

When internet connectivity is unavailable:

- A dedicated offline screen is displayed
- User interactions are prevented
- Application automatically recovers when connectivity is restored

---

### Session Persistence

Users remain signed in across application launches through secure token storage.

The authentication flow supports:

- Automatic session restoration
- Access token refresh
- Refresh token rotation
- Session expiration handling
- Secure logout
- Google account switching

This allows users to continue working without repeatedly signing in while maintaining secure authentication practices.
</details>

---

<a id="user-experience"></a>
<details>
<summary><strong>📱 User Experience</strong></summary>

A significant emphasis was placed on creating an intuitive and distraction-free user experience.

### Authentication Experience

- Clean onboarding flow
- Email verification
- Password recovery
- Google Sign-In
- Helpful validation messages
- Loading indicators
- Error recovery

---

### Notes Experience

- Fast note creation
- Rich text editing
- Formatting Guide
- Status badges
- Starred notes
- Deadline visualization
- Search
- Instant updates

---

### More

The More section centralizes account and application information.

Users can:

- View profile information
- Check email verification status
- Read About NotesApp
- View Privacy Policy
- Contact the developer
- Switch Google accounts
- Log out securely
- View current application version

Application content such as the About page, Privacy Policy, and contact information is dynamically fetched from the backend, allowing updates without requiring a new mobile release.
</details>

---

<a id="engineering-challenges-solved"></a>
<details>
<summary><strong>💡 Engineering Challenges Solved</strong></summary>

Throughout development, several engineering challenges were addressed to improve maintainability, scalability, and user experience.

### Authentication Architecture

Designed reusable authentication flows supporting both Email/Password and Google Sign-In while sharing common session management logic.

---

### Rich Text Rendering

Implemented a markdown-inspired rendering system capable of displaying formatted content consistently across Android and iOS while remaining lightweight and extensible.

---

### Formatting Discoverability

Rather than expecting users to remember markdown syntax, a dedicated Formatting Guide was integrated directly into the application, significantly improving feature discoverability.

---

### Secure Session Management

Implemented JWT authentication with automatic refresh token handling, secure credential storage, and graceful session expiration.

---

### Modular Architecture

Designed reusable screens, shared components, common navigation stacks, centralized API services, and feature-based organization to simplify future development.

---

### Extensibility

The project architecture was intentionally designed to accommodate upcoming features such as AI assistance, syntax highlighting, reminders, offline synchronization, profile management, and additional productivity tools without major architectural refactoring.
</details>

---

<a id="repository-highlights"></a>
<details>
<summary><strong>🌟 Repository Highlights</strong></summary>

This repository demonstrates practical experience in:

- Cross-platform mobile application development
- Full-stack product development
- RESTful API integration
- Secure authentication systems
- Rich text editor implementation
- PostgreSQL database design
- JWT authentication
- Cloud deployment
- React Native architecture
- Production-ready software engineering
</details>

---

<a id="lessons-learned"></a>
<details>
<summary><strong>🎯 Lessons Learned</strong></summary>

Building NotesApp provided practical experience across the complete software development lifecycle—from planning and architecture to implementation, debugging, optimization, and deployment.

Key learnings include:

- Designing scalable mobile applications
- Building production-ready REST APIs
- Structuring reusable frontend architecture
- Implementing secure authentication systems
- Managing relational databases with SQLAlchemy
- Designing efficient state management
- Optimizing rendering performance
- Building maintainable software through modular design
- Preparing applications for cloud deployment
- Thinking beyond features to prioritize user experience
</details>

---

<a id="getting-started"></a>
<details>
<summary><strong>🚀 Getting Started</strong></summary>

Follow the steps below to run NotesApp locally.

> **Prerequisites**
>
> Make sure you have the following installed:
>
> - Node.js (v18 or later)
> - npm
> - React Native CLI
> - Android Studio
> - Xcode (macOS only)
> - CocoaPods (iOS)
> - Git

---

## 📥 Clone Repository

```bash
git clone https://github.com/Harshaapoorv/NotesApp.git

cd NotesApp
```

Install dependencies

```bash
npm install
```

---

## ⚙ Environment Variables

Create a `.env` file in the project root.

```env
BASE_URL=http://localhost:8000
```

For production:

```env
BASE_URL=https://your-production-api.com
```

---

## 🤖 Running on Android

Start Metro

```bash
npm start
```

Open a new terminal

```bash
npx react-native run-android
```

---

## 🍎 Running on iOS

Install CocoaPods

```bash
cd ios

pod install

cd ..
```

Start Metro

```bash
npm start
```

Open another terminal

```bash
npx react-native run-ios
```

---

## 🔗 Backend

NotesApp communicates with the Notes Backend built using FastAPI.

Backend repository:

```text
https://github.com/Harshaapoorv/notes-backend
```

Start the backend before launching the mobile application.

Once the backend is running, update the `BASE_URL` inside your `.env` file to point to your API.

---

## 🔑 Google Sign-In Configuration

Google authentication requires platform-specific configuration.

### Android

- Create a Firebase project.
- Register the Android application.
- Configure SHA-1 and SHA-256 fingerprints.
- Download `google-services.json`.
- Place it inside:

```
android/app/
```

---

### iOS

- Register the iOS application.
- Download `GoogleService-Info.plist`.
- Add it to the Xcode project.
- Configure URL Types using the generated client ID.

Refer to the official Google Sign-In documentation for detailed platform setup.
</details>

---

<a id="building-release"></a>
<details>
<summary><strong>📦 Building Release</strong></summary>

### Android APK

```bash
cd android

./gradlew assembleRelease
```

Generated APK

```
android/app/build/outputs/apk/release/
```

---

### Android App Bundle

```bash
./gradlew bundleRelease
```

Generated AAB

```
android/app/build/outputs/bundle/release/
```

---

### iOS

Open the workspace in Xcode

```
ios/NotesApp.xcworkspace
```

Archive

```
Product
→ Archive
```

Export the IPA for App Store deployment.
</details>

---

<a id="roadmap"></a>
<details>
<summary><strong>🛣 Roadmap</strong></summary>

## ✅ Version 1.0

- Email Authentication
- Google Sign-In
- OTP Verification
- Password Recovery
- Rich Text Formatting
- Formatting Guide
- Code Blocks
- Starred Notes
- Search Notes
- Status Tracking
- Excel Export
- JWT Authentication
- Session Persistence
- User Profiles
- About NotesApp
- Privacy Policy
- Contact Developer
- Offline Detection
- Cloud Synchronization

---

## 🚧 Version 1.1

- Change Password
- Change Email
- Profile Personalization
- Sort Notes
- Filter Notes
- User Settings

---

## 🚀 Version 2.0

- AI Workspace Assistant
- Smart Note Summarization
- AI Generated Notes
- Syntax Highlighting
- Smart Search
- Offline Draft Synchronization
- Push Notifications
- Reminder System
- Theme Customization
- Import Notes from Excel
</details>

---

<a id="contributing"></a>
<details>
<summary><strong>🤝 Contributing</strong></summary>

Contributions, ideas, and feature suggestions are always welcome.

If you would like to improve NotesApp:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

For significant feature proposals, please open an issue first to discuss the idea.
</details>

---

<a id="acknowledgements"></a>
<details>
<summary><strong>🙏 Acknowledgements</strong></summary>

Special thanks to the open-source community and the creators of the technologies that made this project possible.

- React Native
- FastAPI
- PostgreSQL
- SQLAlchemy
- Redux Toolkit
- RTK Query
- React Navigation
- Google Sign-In
- Resend
- Neon
- Render
</details>

---

<a id="developer"></a>
## 👨‍💻 Developer

<strong>Harsha Apoorv</strong>

Full Stack Mobile Application Developer

Specializing in:

- React Native
- FastAPI
- PostgreSQL
- Mobile Application Architecture
- Backend Engineering
- Full Stack Product Development

🌐 [Portfolio](https://www.harshaapoorv.com)  💼 [LinkedIn](https://www.linkedin.com/in/harshaapoorv)  💻 [GitHub](https://github.com/Harshaapoorv)

---

<a id="license"></a>
## 📄 License

This project is licensed under the MIT License.

Feel free to use the project for learning, experimentation, and personal development.

If you found this repository helpful, consider giving it a ⭐ on GitHub.
