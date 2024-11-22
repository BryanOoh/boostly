'use client'

import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card" // Corrected import path

export function CountdownTo2025() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date()
      const newYear2025 = new Date('2025-01-01T00:00:00')
      const timeDiff = newYear2025.getTime() - now.getTime()
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysLeft(daysRemaining)

      const totalDays = 365 * 2 + 366 // 2023 (365) + 2024 (366) + 2025 (365)
      const daysPassed = totalDays - daysRemaining
      setProgress((daysPassed / totalDays) * 100)
    }

    calculateDaysLeft()
    const timer = setInterval(calculateDaysLeft, 86400000) // Update every 24 hours

    return () => clearInterval(timer)
  }, [])

  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle> <div className="text-base text-white dark:text-gray-300">Countdown to 2025</div></GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary text-white dark:text-gray-300">
              {daysLeft} days left
            </div>
            <div className="text-sm text-muted-foreground text-white dark:text-gray-300">
              until 2025
            </div>
          </div>
          <div className="relative w-24 h-24">
            <CircularProgressbar
              value={progress}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 0.625,
                strokeLinecap: 'round',
                pathTransitionDuration: 0.5,
                pathColor: '#5b21b6',
                trailColor: 'hsl(var(--muted))',
                // Removed strokeWidth as it is not a valid property
              })}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-primary text-white dark:text-gray-300">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
