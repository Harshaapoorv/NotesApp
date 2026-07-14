# 📝 NotesApp

<div align="center">

**A production-ready cross-platform note-taking application built with React Native, FastAPI, and PostgreSQL.**

Create rich notes • Manage tasks • Organize ideas • Export data • Stay productive

---

![React Native](https://img.shields.io/badge/React%20Native-0.8x-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.11x-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens)
![Google OAuth](https://img.shields.io/badge/Google-OAuth-4285F4?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 📖 Overview

NotesApp is a modern, cloud-powered productivity application designed to help users capture ideas, organize information, manage tasks, and write beautifully formatted notes through an intuitive mobile experience.

Built using **React Native**, **FastAPI**, and **PostgreSQL**, the application combines a responsive cross-platform interface with a scalable backend architecture, enabling secure authentication, cloud synchronization, rich text editing, and productivity-focused workflows.

Unlike many note-taking applications that primarily demonstrate CRUD operations, NotesApp was engineered with production-oriented architecture in mind. The project emphasizes modular design, reusable components, secure authentication, clean API design, and extensibility for future AI-powered productivity features.

Whether you're documenting ideas, maintaining technical notes with code snippets, tracking personal tasks, or organizing day-to-day work, NotesApp provides a clean and distraction-free experience while ensuring your data remains secure and accessible across sessions.

---

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

# 📸 Screenshots

> **Authentication**

| Splash | Login / Signup | Email Verification |
|---------|----------------|--------------------|
| *(Add Screenshot)* | *(Add Screenshot)* | *(Add Screenshot)* |

---

> **Core Experience**

| Notes List | Rich Text Editor |
|------------|------------------|
| *(Add Screenshot)* | *(Add Screenshot)* |

| Formatting Guide | Code Blocks |
|------------------|-------------|
| *(Add Screenshot)* | *(Add Screenshot)* |

| Task Status | Export to Excel |
|-------------|-----------------|
| *(Add Screenshot)* | *(Add Screenshot)* |

---

> **More**

| About | Privacy Policy | Contact |
|--------|----------------|---------|
| *(Add Screenshot)* | *(Add Screenshot)* | *(Add Screenshot)* |

---

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

# 🏗 Architecture

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

# ⚙ Technology Stack

## 📱 Mobile Application

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

## ⚡ Backend

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

## ☁ Cloud Infrastructure

| Technology | Purpose |
|------------|---------|
| Render | Backend hosting |
| Neon | PostgreSQL hosting |
| Firebase | Google Authentication configuration |

---

# 📂 Project Structure

```
NotesApp
│
├── android/
├── ios/
│
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── animations/
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
│   │
│   ├── shared/
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

---

# 🔐 Authentication & Security

NotesApp implements a production-oriented authentication system designed around secure, reusable workflows.

## Authentication Methods

- Email & Password Authentication
- Google Sign-In
- JWT Access Tokens
- Refresh Token Rotation

---

## Email Authentication Flow

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

## Security Features

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

---

# ✍ Rich Text Formatting System

Unlike traditional note applications that provide plain text editing, NotesApp includes a custom markdown-inspired rich text system designed specifically for mobile devices.

## Supported Formatting

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

## Formatting Guide

One of the key usability features of NotesApp is the built-in **Formatting Guide**.

Instead of requiring users to remember markdown syntax, the guide provides contextual examples for every supported formatting option directly inside the application.

The guide is available from both:

- Create Note
- View Note

allowing users to quickly discover formatting capabilities without leaving their workflow.

This design improves feature discoverability while keeping the editor clean and distraction-free.

---

## Code Block Support

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
