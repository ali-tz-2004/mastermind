# 🎯 Mastermind — Fekr Bekr

A colorful logic game inspired by the classic **Mastermind** game, built with React and TypeScript.

The goal is to discover the secret 4-color combination using logic and deduction.

🎮 **Play online:** https://mastermind-iota-six.vercel.app/

## 🧠 How to Play

- The game generates a secret combination of **4 unique colors**.
- Choose colors and submit your guess.
- After each attempt, you receive feedback:
  - ⚫ **Black** — correct color and correct position
  - ⚪ **White** — correct color but wrong position

- You can play with different difficulty levels:
  - 🟢 **Easy** — 10 attempts
  - 🟡 **Normal** — 8 attempts
  - 🔴 **Hard** — 6 attempts

- The game ends when you find the secret combination or run out of attempts.

## 🏆 Scoring

The score depends on the selected difficulty and the number of attempts used.

```text
Score = Base Score - (Used Attempts × Penalty)
```

| Difficulty | Base Score | Penalty per Attempt | Attempts |
| ---------- | ---------- | ------------------- | -------- |
| Easy       | 100        | -5                  | 10       |
| Normal     | 200        | -10                 | 8        |
| Hard       | 300        | -15                 | 6        |

Your **Best Score** is saved separately for each difficulty level.

## ✨ Features

- 🎯 Secret 4-color combination generation
- 🎨 Unique colors in each secret combination
- ⚫ Black / ⚪ White result feedback
- 🏆 Difficulty levels
- 📊 Score calculation
- 🥇 Best score tracking with `localStorage`
- 🎉 Win / Lose detection
- 🔄 Play again functionality
- 📖 In-game help
- 📱 Responsive interface
- 📲 Android support with Capacitor
- 🚪 Exit option on Android

## 🛠 Tech Stack

- ⚛️ React
- 🧩 TypeScript
- 💅 Styled Components
- 📱 Capacitor
- 🤖 Android
- 🚀 Create React App

## 📁 Project Structure

```text
src/
├── components/
│   ├── game/
│   │   ├── Game.tsx
│   │   └── Game.styles.ts
│   ├── main-menu/
│   │   ├── MainMenu.tsx
│   │   └── MainMenu.styles.ts
│   └── help-modal/
│       ├── HelpModal.tsx
│       └── HelpModal.styles.ts
│
├── utils/
│   ├── BestScore.ts
│   ├── Colors.ts
│   ├── Models.ts
│   ├── Score.ts
│   └── Utils.ts
│
└── App.tsx
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ali-tz-2004/mastermind.git
cd mastermind
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

## 📱 Android

This project uses **Capacitor** to provide an Android version.

Build the React application:

```bash
npm run build
```

Sync the web application with Android:

```bash
npx cap sync android
```

Open the Android project:

```bash
npx cap open android
```

You can then run the application on an Android emulator or a connected Android device through Android Studio.

## 🌐 Deployment

The web version is deployed with **Vercel**.

Live version:

https://mastermind-iota-six.vercel.app/

## 🔮 Future Plans

- 👤 User accounts
- 🏆 Online leaderboard
- 📈 Game statistics
- 🕘 Game history
- ☁️ Backend integration
- ⏱️ Optional timed game mode
- 🎮 Additional games

---

Made with ❤️ using React + TypeScript.
