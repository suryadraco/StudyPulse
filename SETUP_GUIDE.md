# StudyPulse - Complete Setup Guide

## Overview

StudyPulse is a smart student study performance tracker built with Next.js 16, React, and TypeScript. It helps you track study sessions, monitor your academic performance, and achieve your learning goals through analytics and insights.

## Features

### 1. **Study Session Tracking**
- Log individual study sessions with subject, duration, date, and optional notes
- Support for multiple subjects with automatic subject creation
- View recent sessions with full session history
- Delete sessions if needed

### 2. **Performance Analytics**
- **Weekly Study Pattern Chart**: Visualize your study consistency over the last 7 days
- **Subject Breakdown (Pie Chart)**: See how study time is distributed across subjects
- **Subject Statistics (Bar Chart)**: Compare study time by subject at a glance
- **Goals Progress**: Monitor progress toward your weekly study goals

### 3. **Goal Setting & Monitoring**
- Set weekly study targets for specific subjects
- Choose which days of the week to study each subject
- Visual progress bars showing completion status
- Track progress in real-time as you log sessions

### 4. **Subject Management**
- Automatically create subjects when logging your first session
- Organize all study activities by subject
- View comprehensive statistics for each subject

### 5. **Dashboard Overview**
- **Total Study Hours**: Lifetime study time across all sessions
- **Today's Study**: Minutes studied today for quick daily review
- **This Week**: Hours studied in the current week
- **Subjects Tracked**: Number of unique subjects being tracked

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Install Dependencies

```bash
npm install
```

or if using yarn:

```bash
yarn install
```

### Step 2: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
studypulse/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main dashboard page
│   └── globals.css             # Global styles and design tokens
├── components/
│   ├── dashboard-layout.tsx    # Main layout wrapper
│   ├── header.tsx              # Header component
│   ├── dashboard-overview.tsx  # Overview metrics cards
│   ├── study-session-form.tsx  # Form to log sessions
│   ├── study-sessions-list.tsx # Recent sessions display
│   ├── goals-section.tsx       # Goals management
│   ├── analytics-dashboard.tsx # Charts and analytics
│   └── ui/                     # shadcn/ui components
├── hooks/                      # React hooks
├── lib/                        # Utilities and helpers
├── public/                     # Static assets
└── package.json                # Project dependencies
```

## How to Use

### 1. Logging a Study Session

1. Navigate to the **"Track"** tab
2. Click on the study session form on the left
3. Enter the following:
   - **Subject**: Select existing subject or create a new one
   - **Duration**: Enter study time in minutes
   - **Date**: Select the date of your study session
   - **Notes** (optional): Add what you studied
4. Click **"Log Session"** to save

### 2. Setting Study Goals

1. Navigate to the **"Goals"** tab
2. Fill in the goal form:
   - **Subject**: Choose or create a subject
   - **Weekly Target**: Set hours per week (e.g., 5 hours)
   - **Study Days**: Select which days you'll study this subject
3. Click **"Create Goal"**
4. Monitor progress in the "Active Goals" panel

### 3. Viewing Analytics

1. Visit the **"Analytics"** tab or **"Overview"** tab
2. View your:
   - Weekly study pattern trend
   - Study time distribution by subject (pie chart)
   - Subject statistics (bar chart)
   - Goal progress summaries

### 4. Dashboard Overview

The main dashboard shows:
- **Total Study Hours**: Your lifetime study total
- **Today's Study**: How much you've studied today
- **This Week**: Weekly study hours
- **Subjects Tracked**: Number of subjects in your tracker

## Data Storage

StudyPulse uses **browser localStorage** to persist all data:
- `studyPulseSessions`: All logged study sessions
- `studyPulseGoals`: All study goals
- `studyPulseSubjects`: List of all subjects

**Note**: Data is stored locally in your browser. Clearing browser data will delete all your information. Consider exporting your data periodically.

## Design System

### Color Palette
- **Primary**: Professional Blue (#7366BD) - Used for buttons and primary actions
- **Secondary**: Teal Blue (#6699CC) - Used for secondary elements
- **Accent**: Warm Coral (#F5A623) - Used for highlights
- **Neutrals**: Whites and grays for backgrounds and borders

### Typography
- **Sans Serif**: Geist font for all UI text
- **Monospace**: Geist Mono for code and technical content

### Components
The app uses shadcn/ui components with custom styling:
- Cards for content containers
- Buttons for actions
- Tabs for navigation
- Charts via Recharts library

## Features in Detail

### Analytics & Charts

#### Weekly Study Pattern
A line chart showing your study hours for the past 7 days, helping you identify trends and consistency.

#### Study Time by Subject
A pie chart displaying the distribution of study time across all subjects as percentages.

#### Subject Statistics
A bar chart comparing the total study time for each subject, making it easy to see which subjects you're focusing on.

#### Goals Progress
Visual progress bars for each goal showing:
- Subject name
- Current hours vs. weekly target
- Color-coded progress indicator

## Tips for Effective Use

1. **Log Sessions Regularly**: The more you log, the better your analytics
2. **Use Specific Subjects**: Create subjects for each course or topic
3. **Set Realistic Goals**: Start with achievable weekly targets
4. **Review Analytics Weekly**: Check your progress every week
5. **Add Notes**: Include notes about what you studied for better recall
6. **Adjust Goals**: Modify goals based on your performance

## Troubleshooting

### Issue: Data Not Saving
- Check if browser localStorage is enabled
- Clear browser cache and refresh
- Verify you're not in private/incognito mode

### Issue: Charts Not Loading
- Ensure you have data by logging sessions first
- Try refreshing the page
- Check browser console for errors

### Issue: Subjects Not Appearing
- New subjects are created when you log your first session in them
- Manually add subjects by trying to create them in the goals section

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Click "Deploy"

### Deploy to Other Platforms

StudyPulse can be deployed to any platform that supports Next.js:
- **Netlify**: Requires adapter setup
- **AWS Amplify**: Standard Next.js deployment
- **Self-hosted**: Use Docker or standard Node.js hosting

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Storage**: Browser localStorage
- **Fonts**: Geist, Geist Mono (Google Fonts)

## Environment Variables

No external environment variables required for basic functionality. The app works entirely with local storage.

## Future Enhancements

Potential features for future versions:
- Cloud synchronization across devices
- User authentication and accounts
- Data export (CSV, JSON)
- Mobile app version
- Study session reminders
- Streak tracking
- Peer leaderboards
- Study group features

## License

This project is open source and available for educational use.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the code comments
3. Check browser console for error messages
4. Report issues with detailed reproduction steps

## Credits

Built with:
- Next.js and React
- shadcn/ui component library
- Recharts for data visualization
- Tailwind CSS for styling

---

**Happy Studying! 📚**

Track your progress, achieve your goals, and become a smarter student with StudyPulse.
