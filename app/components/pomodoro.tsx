'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { Play, Pause, RotateCcw } from 'lucide-react'

type TimerMode = 'work' | 'break'

export function Pomodoro() {
  const [mode, setMode] = useState<TimerMode>('work')
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(interval!)
          setIsActive(false)
        }

        const totalSeconds = mode === 'work' ? 25 * 60 : 5 * 60
        const remainingSeconds = minutes * 60 + seconds
        setProgress(((totalSeconds - remainingSeconds) / totalSeconds) * 100)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!)
    }

    return () => clearInterval(interval!)
  }, [isActive, minutes, seconds, mode])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(mode === 'work' ? 25 : 5)
    setSeconds(0)
    setProgress(0)
  }

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode)
    setIsActive(false)
    setMinutes(newMode === 'work' ? 25 : 5)
    setSeconds(0)
    setProgress(0)
  }

  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle><div className="text-base text-white dark:text-gray-300">Pomodoro Timer</div></GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <Tabs value={mode} onValueChange={(value) => changeMode(value as TimerMode)} className="w-full ">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="work" >Work</TabsTrigger>
            <TabsTrigger value="break">Break</TabsTrigger>
          </TabsList>
          <TabsContent value="work">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Work Session</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Focus on your task for 25 minutes</p>
            </div>
          </TabsContent>
          <TabsContent value="break">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white">Break Time</h3>
              <p className="text-sm text-gray-300 dark:text-gray-300">Take a short 5-minute break</p>
            </div>
          </TabsContent>
        </Tabs>
        <div className="text-6xl font-bold text-center mb-6 text-white dark:text-gray-100">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <Progress value={progress} className="mb-4 max-w-[50%] mx-auto" />
        <div className="flex justify-center space-x-2">
          <Button onClick={toggleTimer}>
            {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

