"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, BookOpen, Calendar, Plus, Trash2, Trophy } from "lucide-react"
import type { StudyGoal } from "@/app/page"
import { StudySession } from "@/app/page"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface GoalsSectionProps {
  goals: StudyGoal[]
  onAddGoal: (goal: Omit<StudyGoal, "id">) => void
  onDeleteGoal: (id: string) => void
  subjects: string[]
  sessions?: StudySession[]
}

export default function GoalsSection({ goals, onAddGoal, onDeleteGoal, subjects, sessions = [] }: GoalsSectionProps) {
  const [subject, setSubject] = useState("")
  const [weeklyTarget, setWeeklyTarget] = useState("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [showNewSubject, setShowNewSubject] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !weeklyTarget || selectedDays.length === 0) return

    const finalSubject = newSubject || subject
    onAddGoal({
      subject: finalSubject,
      weeklyTarget: Number.parseFloat(weeklyTarget),
      daysOfWeek: selectedDays,
      progress: 0,
    })

    setSubject("")
    setWeeklyTarget("")
    setSelectedDays([])
    setNewSubject("")
    setShowNewSubject(false)
  }

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-accent/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Target className="h-5 w-5 text-accent" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Set Study Goal
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="goal-subject" className="flex items-center gap-2 text-sm font-semibold">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Subject
              </Label>
              {subjects.length > 0 ? (
                <select
                  id="goal-subject"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value)
                    setShowNewSubject(false)
                  }}
                  className="w-full px-4 py-2.5 border border-input rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                >
                  <option value="">Select or create subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="__new__">+ New Subject</option>
                </select>
              ) : null}
              {subject === "__new__" || showNewSubject || subjects.length === 0 ? (
                <Input
                  placeholder="Enter subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal-target" className="flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-muted-foreground" />
                Weekly Target (hours)
              </Label>
              <Input
                id="goal-target"
                type="number"
                min="0.5"
                step="0.5"
                value={weeklyTarget}
                onChange={(e) => setWeeklyTarget(e.target.value)}
                placeholder="e.g., 5"
                className="border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Study Days
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`p-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      selectedDays.includes(day)
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white font-semibold py-2.5 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Goal
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">Active Goals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {goals.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">No goals yet. Create one to get started!</p>
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
                    className={`p-5 border rounded-xl space-y-4 transition-all duration-300 hover:shadow-lg ${
                      isComplete
                        ? "border-accent/50 bg-gradient-to-br from-accent/10 to-transparent"
                        : "border-border bg-background/50 hover:border-primary/50"
                    } animate-slide-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {isComplete && <Trophy className="h-4 w-4 text-accent" />}
                          <h4 className="font-bold text-foreground text-lg">{goal.subject}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Target: <span className="font-semibold">{goal.weeklyTarget} hours/week</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Progress: <span className="font-semibold">{goalHours.toFixed(1)}h</span> / {goal.weeklyTarget}h
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteGoal(goal.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isComplete
                              ? "bg-gradient-to-r from-accent to-accent/80"
                              : "bg-gradient-to-r from-primary to-primary/80"
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {goal.daysOfWeek.map((day) => (
                          <span
                            key={day}
                            className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20"
                          >
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
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
