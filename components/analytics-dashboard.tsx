"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Target } from "lucide-react"
import type { StudySession, StudyGoal } from "@/app/page"

interface AnalyticsDashboardProps {
  sessions: StudySession[]
  goals: StudyGoal[]
}

export default function AnalyticsDashboard({ sessions, goals }: AnalyticsDashboardProps) {
  // Subject breakdown
  const subjectData = sessions.reduce(
    (acc, session) => {
      const existing = acc.find((item) => item.subject === session.subject)
      if (existing) {
        existing.minutes += session.duration
        existing.sessions += 1
      } else {
        acc.push({ subject: session.subject, minutes: session.duration, sessions: 1 })
      }
      return acc
    },
    [] as Array<{ subject: string; minutes: number; sessions: number }>,
  )

  // Weekly study data
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - i))
    return date
  })

  const weeklyData = last7Days.map((date) => {
    const dateStr = date.toISOString().split("T")[0]
    const daySessions = sessions.filter((s) => s.date === dateStr)
    const minutes = daySessions.reduce((sum, s) => sum + s.duration, 0)
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      minutes: minutes,
      hours: minutes / 60,
    }
  })

  const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const chartCards = [
    {
      title: "Weekly Study Pattern",
      icon: TrendingUp,
      iconColor: "text-chart-1",
      iconBg: "bg-chart-1/10",
      gradient: "from-chart-1/5 to-transparent",
    },
    {
      title: "Study Time by Subject",
      icon: PieChartIcon,
      iconColor: "text-chart-2",
      iconBg: "bg-chart-2/10",
      gradient: "from-chart-2/5 to-transparent",
    },
    {
      title: "Subject Statistics",
      icon: BarChart3,
      iconColor: "text-chart-3",
      iconBg: "bg-chart-3/10",
      gradient: "from-chart-3/5 to-transparent",
    },
    {
      title: "Goals Summary",
      icon: Target,
      iconColor: "text-chart-4",
      iconBg: "bg-chart-4/10",
      gradient: "from-chart-4/5 to-transparent",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-chart-1/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-1/10">
              <TrendingUp className="h-5 w-5 text-chart-1" />
            </div>
            <CardTitle className="text-xl font-bold">Weekly Study Pattern</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}h`, "Hours"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--chart-1))"
                name="Hours"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", r: 5, strokeWidth: 2, stroke: "hsl(var(--card))" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-chart-2/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-2/10">
              <PieChartIcon className="h-5 w-5 text-chart-2" />
            </div>
            <CardTitle className="text-xl font-bold">Study Time by Subject</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {subjectData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                <PieChartIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, percent }) => `${subject}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="minutes"
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => `${(value / 60).toFixed(1)} hours`}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-chart-3/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-3/10">
              <BarChart3 className="h-5 w-5 text-chart-3" />
            </div>
            <CardTitle className="text-xl font-bold">Subject Statistics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {subjectData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="subject"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    color: "hsl(var(--foreground))",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value: number) => `${(value / 60).toFixed(1)} hours`}
                />
                <Legend />
                <Bar
                  dataKey="minutes"
                  fill="hsl(var(--chart-3))"
                  name="Study Time"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-chart-4/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <Target className="h-5 w-5 text-chart-4" />
            </div>
            <CardTitle className="text-xl font-bold">Goals Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No goals set yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goals.map((goal, index) => {
                const goalSessions = sessions.filter((s) => s.subject === goal.subject)
                const goalHours = goalSessions.reduce((sum, s) => sum + s.duration, 0) / 60
                const progress = goalHours >= goal.weeklyTarget ? 100 : (goalHours / goal.weeklyTarget) * 100
                const isComplete = progress >= 100

                return (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isComplete
                        ? "border-accent/50 bg-gradient-to-r from-accent/10 to-transparent"
                        : "border-border bg-background/50"
                    } animate-slide-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-foreground text-lg">{goal.subject}</h4>
                      <span className="text-sm font-semibold text-muted-foreground">
                        {goalHours.toFixed(1)}/{goal.weeklyTarget}h
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isComplete
                            ? "bg-gradient-to-r from-accent to-accent/80"
                            : "bg-gradient-to-r from-chart-4 to-chart-4/80"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
