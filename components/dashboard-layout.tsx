"use client"

import type React from "react"
import Header from "./header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">{children}</main>
    </div>
  )
}
