# StudyPulse Features Documentation

## Feature Overview

### 1. Study Session Logging

#### Description
Record your study sessions with detailed information including subject, duration, date, and notes.

#### How It Works
1. Navigate to "Track" tab
2. Fill in the study session form
3. Select or create a subject
4. Enter duration in minutes
5. Select the study date
6. Add optional notes about what you studied
7. Click "Log Session"

#### Data Captured
- Subject name
- Study duration (in minutes)
- Date of study
- Optional notes/description
- Unique ID for each session
- Automatic timestamp

#### Benefits
- Maintain a complete study history
- Track which subjects you spend time on
- Reference notes from previous sessions
- Build accountability through logging

---

### 2. Performance Analytics Dashboard

#### Weekly Study Pattern Chart
**Type**: Line Chart
**Displays**: Study hours for the past 7 days
**Purpose**: Identify study consistency and trends

#### Study Time by Subject (Pie Chart)
**Type**: Pie Chart
**Displays**: Percentage breakdown of study time by subject
**Purpose**: See which subjects receive the most attention

#### Subject Statistics (Bar Chart)
**Type**: Bar Chart
**Displays**: Total study hours per subject
**Purpose**: Compare study effort across subjects

#### Goals Progress (Cards)
**Type**: Progress Bars
**Displays**: Current progress vs. weekly target
**Purpose**: Monitor goal completion

#### Benefits of Analytics
- Visualize your study patterns
- Identify weak areas needing more focus
- Track long-term trends
- Celebrate progress with visual indicators

---

### 3. Goal Setting & Monitoring

#### Creating Goals
**Parameters**:
- **Subject**: Which subject to focus on
- **Weekly Target**: Hours per week (e.g., 5 hours)
- **Study Days**: Days of the week you plan to study

#### Goal Progress Tracking
- Real-time calculation of progress
- Visual progress bars (0-100%)
- Current vs. target hours display
- Automatic updates as you log sessions

#### Goal Management
- Create multiple goals for different subjects
- View all active goals in one place
- Delete goals you no longer need
- Adjust targets as needed

#### Benefits
- Stay motivated with clear targets
- Structure your weekly study schedule
- Track consistency
- Achieve better time management

---

### 4. Subject Management

#### Subject Creation
- Automatically created when logging first session
- Can be created manually in goals
- Reusable across multiple sessions
- Centralized subject organization

#### Subject Features
- View statistics per subject
- Filter sessions by subject
- Set goals per subject
- Track subject-specific progress

---

### 5. Dashboard Overview

#### Metrics Displayed

**Total Study Hours**
- Lifetime total across all sessions
- Running total that grows with each session
- Shows cumulative effort

**Today's Study**
- Minutes studied on current day
- Quick daily progress check
- Resets each day

**This Week**
- Total hours in current week
- Shows weekly momentum
- Useful for goal tracking

**Subjects Tracked**
- Count of unique subjects
- Shows study breadth
- Updates as new subjects added

#### Benefits
- Quick performance snapshot
- Daily motivation boost
- Weekly progress overview
- Subject diversity tracking

---

### 6. Data Visualization

All charts include:
- **Interactive tooltips**: Hover for exact values
- **Responsive design**: Works on mobile and desktop
- **Color-coded data**: Easy visual differentiation
- **Real-time updates**: Data refreshes as you log sessions

---

## Feature Interactions

### Session Logging → Analytics
When you log a session:
1. Session is saved to localStorage
2. Subject is added to list (if new)
3. Analytics charts update automatically
4. Weekly pattern refreshes
5. Subject breakdown recalculates

### Goal Setting → Progress Tracking
When you create a goal:
1. Goal is saved with parameters
2. Progress bar appears immediately
3. Current progress calculated from existing sessions
4. Updates in real-time as you log new sessions

### Subject Management → Dashboard
Subject activities:
1. New subject triggers subject count increase
2. Adds to subject selection dropdown
3. Appears in analytics charts
4. Available for goal creation

---

## Tips for Maximum Effectiveness

### Study Session Logging
- Log immediately after sessions for accuracy
- Use descriptive notes for future reference
- Log even short study sessions (5-10 minutes)
- Include breaks in total time for accuracy

### Goal Setting
- Start with 5-7 hours per week per subject
- Choose days you're most likely to study
- Review and adjust monthly
- Set goals for 2-3 main subjects first

### Analytics Review
- Check weekly for trends
- Compare current week vs. previous weeks
- Identify your most productive days
- Note which subjects get neglected

### Consistency Building
- Log sessions same time daily
- Aim for same study location
- Use goals to build routines
- Track streaks mentally

---

## Data Storage Details

### localStorage Keys

**studyPulseSessions**
- Stores: Array of study session objects
- Size: Grows with each session
- Update: Every time you log a session

**studyPulseGoals**
- Stores: Array of goal objects
- Size: Fixed based on goal count
- Update: When goals created/deleted

**studyPulseSubjects**
- Stores: Array of subject strings
- Size: Small (subject names only)
- Update: New subjects added

### Backup Recommendations
- Export data monthly
- Take screenshots of analytics
- Keep records externally if critical
- Consider cloud sync options

---

## Browser Compatibility

StudyPulse works best on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Requires localStorage support and JavaScript enabled

---

## Data Privacy

- All data stored locally in browser
- No data sent to servers
- No analytics tracking
- No cookies used
- Complete privacy guaranteed

---

## Performance Characteristics

- Handles 1000+ sessions smoothly
- Charts render within 1 second
- Responsive on all devices
- Minimal memory footprint
- Fast data retrieval from localStorage

---
