# NotesFlow – Full Stack Productivity & Notes Platform

A modern full-stack productivity application built using **React Native**, **FastAPI**, and **PostgreSQL** featuring markdown-inspired note formatting, optimized rendering architecture, Excel export functionality, authentication-ready APIs, and scalable backend infrastructure.

---

# Features

## Productivity Features

- Create, update and delete notes
- Status-based workflow management
  - Pending
  - In Progress
  - Completed
- Star important notes
- Deadline management
- Rich note formatting support
- Code block support
- Copy formatted content
- Optimized note ordering
- Persistent backend storage

---

# Rich Text Formatting

Supports markdown-inspired formatting options including:

| Format | Syntax |
|---|---|
| Bold | `**text**` |
| Italic | `*text*` |
| Underline | `__text__` |
| Strikethrough | `~~text~~` |
| Inline Code | `` `code` `` |
| Code Block | ```` ```js ``` ```` |
| Bullet List | `- item` |
| Numbered List | `1. item` |
| Quote | `> text` |
| Headings | `# Heading` |

---

# Performance Optimizations

Implemented multiple rendering and state optimization techniques:

- `React.memo` based list item optimization
- Optimized `FlatList` virtualization
- Stable callback references using `useCallback`
- RTK Query optimistic updates
- Prevented unnecessary list rerenders
- Optimized cache synchronization
- Local cache updates without full refetch
- Selective item reordering for starred notes

---

# Excel Export System

Export all notes into a professionally formatted Excel workbook with:

- Styled headers
- Autofilters
- Frozen rows
- Wrapped content
- Column sizing
- Structured formatting
- Native mobile share support

---

# Tech Stack

## Frontend

- React Native
- Redux Toolkit
- RTK Query
- React Navigation
- React Native SVG
- DayJS
- XLSX-JS-Style

---

## Backend

- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL

---

## Cloud & Deployment

- Render
- Neon PostgreSQL

---

# Architecture Highlights

## Frontend Architecture

- Component-based scalable architecture
- Reusable UI system
- Centralized API layer using RTK Query
- Optimistic UI updates
- Shared formatting utilities
- Modular feature organization

---

## Backend Architecture

- RESTful API architecture
- Alembic database migrations
- Structured schema validation
- User-ready scalable note APIs
- Optimized query handling

---

# Folder Structure

```bash
src/
│
├── api/
├── assets/
├── components/
├── navigation/
├── screens/
├── shared/
├── store/
├── utils/
└── hooks/
```

---

# Screens

- Home Screen
- Add/Edit Note Modal
- Note Details Screen
- Formatting Guide
- Export Workflow
- Error & Success Modals

---

# Upcoming Features

## Version 1

- User Authentication
- Login / Signup
- Filters
- Sorting

---

## Version 2

- AI Workspace Assistant
- AI Note Intelligence
- Voice-to-Note
- AI Generated Notes

---

## Version 3

- Excel Import System
- Bulk Note Import Validation
- Data Migration Tools

---

## Version 4

- Syntax Highlighting
- Language-aware Code Blocks

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Harshaapoorv/NotesApp
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
BASE_URL=YOUR_API_URL
```

Start Metro

```bash
npm start
```

Run Android

```bash
npm run android
```

Run iOS

```bash
npm run ios
```

---

# Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Run migrations

```bash
alembic upgrade head
```

Start server

```bash
uvicorn app.main:app --reload
```

---

# Environment Variables

## Frontend

```env
BASE_URL=
```

---

## Backend

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

---

# Key Engineering Challenges Solved

- Large `FlatList` rerender optimization
- RTK Query cache synchronization
- Optimistic update architecture
- Date & timezone normalization
- Dynamic markdown formatting
- Modal + keyboard handling
- Cross-platform Excel export workflows
- Efficient list ordering strategies

---

# Future AI Architecture

The platform is designed for future AI integrations including:

## Lakshmi
Workspace-level productivity assistant capable of:
- Note analytics
- Task summaries
- AI-generated notes
- Smart productivity insights

---

## Nag
Contextual note intelligence capable of:
- Code explanation
- Note summarization
- Contextual assistance
- Note-specific AI interactions

---

# Author

## Harsha Apoorv

Full Stack Mobile Application Developer

- React Native
- FastAPI
- PostgreSQL
- Mobile Performance Optimization
- Full Stack Product Development

---

# License

This project is licensed under the MIT License.