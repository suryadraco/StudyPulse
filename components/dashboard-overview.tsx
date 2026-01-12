"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, TrendingUp, BookOpen } from "lucide-react"
import type { StudySession, StudyGoal } from "@/app/page"

interface DashboardOverviewProps {
  sessions: StudySession[]
  goals: StudyGoal[]
}

export default function DashboardOverview({ sessions, goals }: DashboardOverviewProps) {
  const totalHours = sessions.reduce((sum, session) => sum + session.duration, 0) / 60
  const todaySessions = sessions.filter((s) => s.date === new Date().toISOString().split("T")[0])
  const todayMinutes = todaySessions.reduce((sum, session) => sum + session.duration, 0)

  const subjectCount = new Set(sessions.map((s) => s.subject)).size
  const thisWeekHours =
    sessions
      .filter((s) => {
        const sessionDate = new Date(s.date)
        const today = new Date()
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        return sessionDate >= weekAgo && sessionDate <= today
      })
      .reduce((sum, s) => sum + s.duration, 0) / 60

  const cards = [
    {
      title: "Total Study Hours",
      value: totalHours.toFixed(1),
      subtitle: "Lifetime total",
      icon: Clock,
      gradient: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      valueColor: "text-primary",
    },
    {
      title: "Today's Study",
      value: todayMinutes.toString(),
      subtitle: "Minutes studied",
      icon: Calendar,
      gradient: "from-accent/20 to-accent/5",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      valueColor: "text-accent",
    },
    {
      title: "This Week",
      value: thisWeekHours.toFixed(1),
      subtitle: "Hours studied",
      icon: TrendingUp,
      gradient: "from-secondary/20 to-secondary/5",
      iconBg: "bg-secondary/10",
      iconColor: "text-secondary",
      valueColor: "text-secondary",
    },
    {
      title: "Subjects",
      value: subjectCount.toString(),
      subtitle: "Being tracked",
      icon: BookOpen,
      gradient: "from-chart-2/20 to-chart-2/5",
      iconBg: "bg-chart-2/10",
      iconColor: "text-chart-2",
      valueColor: "text-chart-2",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card
            key={card.title}
            className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${card.gradient}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-16 -mt-16 blur-2xl" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-foreground/80">{card.title}</CardTitle>
              <div className={`${card.iconBg} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${card.valueColor} mb-1`}>{card.value}</div>
              <p className="text-xs text-muted-foreground font-medium">{card.subtitle}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
