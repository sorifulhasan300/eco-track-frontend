"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export default function DashboardGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading, initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080f1e]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
