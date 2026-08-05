# 🎮 HabitQuest – Gamified Habit Tracker

> **Turn your daily habits into an RPG adventure!**  
> Earn XP, level up, unlock badges, complete quests, collect coins, and compete with friends.



<p align="center">

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue)

</p>

---

# 📑 Table of Contents

- Overview
- Features
- Tech Stack
- Screenshots
- Folder Structure
- Installation
- Environment Variables
- API Endpoints
- Database Schema
- Gamification System
- Future Enhancements
- Testing
- Deployment
- Contributing
- License

---

# 🚀 Overview

HabitQuest is a **Full Stack MERN Gamified Habit Tracker** that transforms everyday habits into an engaging RPG-style experience.

Instead of simply checking off daily tasks, users gain:

- ⭐ Experience Points (XP)
- 💰 Coins
- 🏆 Achievement Badges
- 🔥 Daily Streaks
- 🎯 Daily Quests
- 👥 Friend Competition
- 🎨 Unlockable Themes

The application motivates users to build consistency through rewards, leveling, and progression mechanics.

---

# ✨ Features

## 🎯 Habit Management

- Create new habits
- Edit habits
- Delete habits
- Complete habits
- Daily streak tracking
- Calendar tracking
- Prevent multiple completions per day
- Habit completion history
- Smart reminders

---

## 🎮 RPG Gamification

- XP System
- Level Progression
- Animated Progress Bar
- Coin Rewards
- Daily Bonus XP
- Level Unlock Animations
- XP Multipliers
- Streak Bonus

XP Formula

```
XP = 10 + (Current Streak × 2)
```

---

## 🏆 Achievement Badges

| Badge | Requirement |
|--------|-------------|
| 🔥 3-Day Streak | Complete a habit for 3 consecutive days |
| ⚡ 7-Day Warrior | Maintain a 7-day streak |
| 🏆 Legendary 21 | Reach 21 consecutive days |
| 🌟 Adept | Reach Level 5 |
| 💎 Master | Reach Level 10 |
| 💰 Tycoon | Earn 200 Coins |

---

## 📜 Daily Quests

Every day users receive quests such as:

✔ Complete a Habit

Reward:

- +30 XP
- +15 Coins

---

✔ Reach 3-Day Streak

Reward:

- +50 XP
- +25 Coins

---

✔ Unlock 2 Badges

Reward:

- +80 XP
- +40 Coins

Features:

- Auto-generated quests
- Progress bars
- Daily reset
- Reward animations
- Completion tracking

---

## 👥 Friend Competition

Challenge your rival Alex.

Features:

- Live leaderboard
- Score comparison
- Rival challenge
- Winning status
- Weekly ranking

---

## 🎨 Theme Shop

Unlock beautiful themes using earned coins.

Available Themes

- 🌅 Sunset
- 🌊 Ocean
- 🌲 Forest
- 🍭 Candy

Features

- Purchase themes
- Instant preview
- Coin deduction
- Saved preferences

---

## 🔐 Authentication

- JWT Authentication
- Register/Login
- Password Hashing
- Protected Routes
- Auto Login
- Auto Logout
- Session Persistence

---

## 📱 Responsive Design

- Desktop Friendly
- Glassmorphism UI
- Gradient Backgrounds
- Smooth Animations
- Toast Notifications

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Morgan
- dotenv

---

## Database

- MongoDB
- Mongoose

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Nodemon

---



---

# 📁 Project Structure

```
habitquest/
│
├── backend/
│   │
│   ├── config/
│   │     
│   │
│   ├── controllers/
│   │  
│   │     
│   │
│   ├── middleware/
│   │     
│   │
│   ├── models/
│   │   
│   │
│   ├── routes/
│   │    
│   │
│   ├── utils/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    │
    ├── public/
    │
    ├── src/
    │
    ├── components/
    │
    ├── pages/
    │
    ├── context/
    │
    ├── services/
    │
    ├── utils/
    │
    ├── App.jsx
    ├── main.jsx
    └── package.json
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/HabitQuest.git

cd HabitQuest
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

Open

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Backend

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/habitquest

JWT_SECRET=your_secret_key

NODE_ENV=development
```

Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📡 REST API

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/me
```

---

## Habits

```
GET     /api/habits

POST    /api/habits

PUT     /api/habits/:id/complete

DELETE  /api/habits/:id
```

---

## Daily Quests

```
GET /api/quests/today
```

---

## Competition

```
GET  /api/competition/friend

POST /api/competition/challenge
```

---

## Shop

```
GET /api/shop/themes

POST /api/shop/buy-theme

GET /api/shop/user/badges

PUT /api/user/theme
```

---

# 🗄 Database Schema

## User

```javascript
{
  name,
  email,
  password,
  xp,
  level,
  coins,
  theme,
  friendPoints,
  rivalPoints
}
```

---

## Habit

```javascript
{
  user,
  name,
  streak,
  lastCompletedDate,
  createdAt
}
```

---

## Quest

```javascript
{
  user,
  date,
  quests
}
```

---

# 🎮 Gamification Flow

```
Complete Habit
        │
        ▼
Gain XP + Coins
        │
        ▼
Increase Streak
        │
        ▼
Unlock Badge
        │
        ▼
Level Up
        │
        ▼
Earn More Coins
        │
        ▼
Purchase Theme
        │
        ▼
Become Habit Master 🏆
```

---

# 🚀 Future Enhancements

- Dark Mode
- Google Login
- Email Notifications
- Habit Analytics
- Weekly Challenges
- AI Habit Suggestions
- Multiplayer Competitions
- Leaderboards
- Mobile App
- Push Notifications
- Achievement Sharing
- Admin Dashboard
- Premium Membership
- Community Challenges

---

# 🧪 Testing

### Authentication

- Register
- Login
- Logout
- JWT Validation

### Habits

- Create
- Delete
- Complete
- Daily Reset

### Gamification

- XP Calculation
- Coins
- Badges
- Streak
- Levels

### Shop

- Buy Theme
- Apply Theme
- Coin Deduction

### Competition

- Rival Score
- Challenge Button
- Live Updates

---

# ☁ Deployment

Frontend

- Vercel
- Netlify

Backend

- Render
- Railway

Database

- MongoDB Atlas

---

# 🤝 Contributing

Contributions are always welcome!

```bash
Fork Repository

Create Branch

git checkout -b feature-name

Commit Changes

git commit -m "Added New Feature"

Push Changes

git push origin feature-name

Create Pull Request
```

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Vijayalakshmi R**


```

GitHub

```
https://github.com/vijeelakshmi
```

LinkedIn

```
https://linkedin.com/in/vijayalakshmi0808
```


---

<p align="center">

### 🎮 Level Up Your Life with HabitQuest 🚀

**Made with ❤️ using the MERN Stack**

</p>