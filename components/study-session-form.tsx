"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Clock, Calendar, FileText, Plus } from "lucide-react"

interface StudySessionFormProps {
  onAddSession: (session: { subject: string; duration: number; date: string; notes?: string }) => void
  subjects: string[]
  onAddSubject: (subject: string) => void
}

export default function StudySessionForm({ onAddSession, subjects, onAddSubject }: StudySessionFormProps) {
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [newSubject, setNewSubject] = useState("")
  const [showNewSubject, setShowNewSubject] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !duration) return

    const finalSubject = newSubject || subject
    onAddSession({
      subject: finalSubject,
      duration: Number.parseInt(duration),
      date,
      notes: notes || undefined,
    })

    if (newSubject) {
      onAddSubject(newSubject)
    }

    setSubject("")
    setDuration("")
    setDate(new Date().toISOString().split("T")[0])
    setNotes("")
    setNewSubject("")
    setShowNewSubject(false)
  }

  return (
    <Card className="h-full border-0 shadow-xl bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Log Study Session
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Subject
            </Label>
            {subjects.length > 0 ? (
              <select
                id="subject"
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
              <div className="space-y-2 animate-slide-in">
                <Input
                  placeholder="Enter new subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {subjects.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowNewSubject(false)}
                  >
                    Use Existing
                  </Button>
                )}
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 45"
              className="border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you study?"
              className="min-h-24 border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-2.5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Session
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
