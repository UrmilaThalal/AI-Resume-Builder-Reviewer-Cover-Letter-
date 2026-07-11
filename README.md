# 🤖 AI Resume Builder and Reviewer

A full-stack AI-powered web application that enables users to create professional resumes, review them using Google Gemini AI, generate personalized cover letters, and manage all resumes securely.

This project is developed as a **Capstone Project** using **React (Vite)**, **Django REST Framework**, **PostgreSQL**, and **Google Gemini API**.

---

# 📌 Project Overview

The AI Resume Builder and Reviewer is a modern web application designed to simplify the resume creation process while providing intelligent AI-powered feedback.

The system allows users to:

- Register and Login securely using JWT Authentication
- Create professional resumes
- Save resumes to PostgreSQL
- View, Edit and Delete resumes
- Review resumes using Google Gemini AI
- Generate AI-powered cover letters
- Print and Download resumes
- Manage all resumes from a personalized dashboard

The project combines a modern React frontend with a secure Django REST Framework backend and PostgreSQL database.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Secure Logout
- Protected Routes

---

## 📄 Resume Builder

- Create Resume
- Save Resume
- View Resume
- Edit Resume
- Delete Resume
- Resume List
- Professional Resume Preview
- Print Resume
- Download Resume as PDF

---

## 🤖 AI Resume Review

- AI Resume Analysis
- ATS Score
- Resume Strength Detection
- Resume Weakness Detection
- Improvement Suggestions
- Review History
- Google Gemini AI Integration

---

## ✉️ Cover Letter Generator

- AI Generated Cover Letter
- Personalized Cover Letter
- Job-specific Cover Letter
- Save Generated Cover Letters

---

## 📊 Dashboard

- Welcome Dashboard
- User Profile
- Resume Management
- AI Resume Review Access
- Cover Letter Generator Access

---

# 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router DOM
- Axios
- React Icons
- CSS3

### Backend

- Django
- Django REST Framework
- Django Simple JWT

### Database

- PostgreSQL

### AI

- Google Gemini API

### Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```text
AI-Resume-Builder-Reviewer
│
├── backend
│   ├── accounts
│   ├── resumes
│   ├── ai_review
│   ├── backend
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/UrmilaThalal/AI-Resume-Builder-Reviewer.git
```

---

## 2. Backend Setup

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run database migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

Start the Django server

```bash
python manage.py runserver
```

---

## 3. Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start the React application

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/register/` |
| POST | `/api/login/` |
| POST | `/api/logout/` |

---

## Resume

| Method | Endpoint |
|---------|----------|
| GET | `/api/resume/` |
| POST | `/api/resume/` |
| GET | `/api/resume/{id}/` |
| PUT | `/api/resume/{id}/` |
| DELETE | `/api/resume/{id}/` |

---

## AI Resume Review

| Method | Endpoint |
|---------|----------|
| GET | `/api/review/` |
| POST | `/api/review/` |

---

## Cover Letter

| Method | Endpoint |
|---------|----------|
| GET | `/api/cover-letter/` |
| POST | `/api/cover-letter/` |
| DELETE | `/api/cover-letter/{id}/` |

---

# 🤖 AI Features

Google Gemini AI is used for:

- Resume Analysis
- ATS Score Generation
- Resume Strength Identification
- Resume Weakness Detection
- Improvement Suggestions
- Personalized Cover Letter Generation

---

# 🗄 Database Design

```text
User
 │
 ├──────── Resume
 │             │
 │             ├──────── Resume Review
 │             │
 │             └──────── Cover Letter
```

---

# 🔒 Authentication

The application uses **JWT Authentication** to secure all protected API endpoints.

Features include:

- Secure Login
- Secure Logout
- Protected Routes
- User-specific Resume Access
- Token-based Authentication

---

---

# 🚀 Future Enhancements

- Resume Upload Review (PDF/DOCX/TXT)
- Multiple Resume Templates
- Resume Version History
- Export Resume to Word
- Resume Keyword Optimizer
- Grammar Checker
- AI Interview Questions Generator
- Profile Picture Upload
- Email Resume
- Dark Mode
- Multi-language Support

---

# 📈 Project Workflow

```text
Register
      │
      ▼
Login
      │
      ▼
Dashboard
      │
      ▼
Resume Builder
      │
      ▼
Save Resume
      │
      ▼
Resume List
      │
      ▼
View Resume
      │
      ▼
AI Resume Review
      │
      ▼
Generate Cover Letter
      │
      ▼
Download / Print Resume
```

---

# 🎯 Project Objectives

- Develop a professional Resume Builder.
- Integrate Artificial Intelligence into resume evaluation.
- Improve resume quality using AI suggestions.
- Generate personalized cover letters.
- Build a secure full-stack web application.
- Practice modern full-stack development using React and Django.

---

# 🧪 Testing

The application has been tested for:

- User Registration
- User Login
- JWT Authentication
- Resume CRUD Operations
- AI Resume Review
- Cover Letter Generation
- Protected Routes
- API Testing using Postman

---

# 📚 Learning Outcomes

This project helped implement and understand:

- React Component Architecture
- React Hooks
- React Router
- Axios API Integration
- Django REST Framework
- JWT Authentication
- PostgreSQL Database
- RESTful API Development
- Google Gemini AI Integration
- CRUD Operations
- Responsive UI Design
- Git & GitHub Workflow

---

# 👩‍💻 Author

**Urmila Thalal**

Bachelor of Science in Computer Science and Information Technology (BSc CSIT)

GitHub: https://github.com/UrmilaThalal

---

# 🙏 Acknowledgements

Special thanks to:

- Google Gemini API
- Django REST Framework
- React
- PostgreSQL
- Open Source Community

---

# 📄 License
This project was developed for educational purposes as part of the **CodeRush Online Internship Capstone Project**.
Feel free to use it for learning and academic reference.