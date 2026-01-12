"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, FileText, Trash2, BookOpen } from "lucide-react"
import type { StudySession } from "@/app/page"

interface StudySessionsListProps {
  sessions: StudySession[]
  onDeleteSession: (id: string) => void
}

export default function StudySessionsList({ sessions, onDeleteSession }: StudySessionsListProps) {
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-card via-card to-secondary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <BookOpen className="h-5 w-5 text-secondary" />
          </div>
          <CardTitle className="text-xl font-bold">Recent Sessions</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {sortedSessions.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No sessions logged yet. Start tracking your study time!
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {sortedSessions.map((session, index) => (
              <div
                key={session.id}
                className="group flex items-start justify-between p-4 border border-border rounded-xl hover:border-primary/50 bg-background/50 hover:bg-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h3 className="font-bold text-foreground text-lg">{session.subject}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground ml-5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{session.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(session.date).toLocaleDateString("en-US", { 
                        weekday: "short", 
                        month: "short", 
                        day: "numeric" 
                      })}</span>
                    </div>
                  </div>
                  {session.notes && (
                    <div className="ml-5 mt-2 p-3 rounded-lg bg-muted/50 border border-border/50">
                      <div className="flex items-start gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">{session.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteSession(session.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-4 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
