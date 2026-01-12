"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardOverview from "@/components/dashboard-overview"
import StudySessionForm from "@/components/study-session-form"
import StudySessionsList from "@/components/study-sessions-list"
import GoalsSection from "@/components/goals-section"
import AnalyticsDashboard from "@/components/analytics-dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface StudySession {
  id: string
  subject: string
  duration: number
  date: string
  notes?: string
}

export interface StudyGoal {
  id: string
  subject: string
  weeklyTarget: number
  daysOfWeek: string[]
  progress: number
}

export default function Home() {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [goals, setGoals] = useState<StudyGoal[]>([])
  const [subjects, setSubjects] = useState<string[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("studyPulseSessions")
    const savedGoals = localStorage.getItem("studyPulseGoals")
    const savedSubjects = localStorage.getItem("studyPulseSubjects")

    if (savedSessions) setSessions(JSON.parse(savedSessions))
    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects))
  }, [])

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem("studyPulseSessions", JSON.stringify(sessions))
  }, [sessions])

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem("studyPulseGoals", JSON.stringify(goals))
  }, [goals])

  // Save subjects to localStorage
  useEffect(() => {
    localStorage.setItem("studyPulseSubjects", JSON.stringify(subjects))
  }, [subjects])

  const addSession = (session: Omit<StudySession, "id">) => {
    const newSession = {
      ...session,
      id: Date.now().toString(),
    }
    setSessions([...sessions, newSession])

    // Add subject if new
    if (!subjects.includes(session.subject)) {
      setSubjects([...subjects, session.subject])
    }
  }

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id))
  }

  const addGoal = (goal: Omit<StudyGoal, "id">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    }
    setGoals([...goals, newGoal])
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  const addSubject = (subject: string) => {
    if (!subjects.includes(subject)) {
      setSubjects([...subjects, subject])
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardOverview sessions={sessions} goals={goals} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 rounded-lg border border-border shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200 font-semibold"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="track"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200 font-semibold"
            >
              Track
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200 font-semibold"
            >
              Goals
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-200 font-semibold"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6 animate-fade-in">
            <AnalyticsDashboard sessions={sessions} goals={goals} />
          </TabsContent>

          <TabsContent value="track" className="space-y-4 mt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <StudySessionForm onAddSession={addSession} subjects={subjects} onAddSubject={addSubject} />
              </div>
              <div className="lg:col-span-2">
                <StudySessionsList sessions={sessions} onDeleteSession={deleteSession} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4 mt-6 animate-fade-in">
            <GoalsSection goals={goals} onAddGoal={addGoal} onDeleteGoal={deleteGoal} subjects={subjects} sessions={sessions} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-6 animate-fade-in">
            <AnalyticsDashboard sessions={sessions} goals={goals} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
