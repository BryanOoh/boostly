'use client'

import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { DateTimeLocation } from './date-time-location'
type Todo = {
  id: number
  text: string
  completed: boolean
}

export function DailyProgress() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTasks, setCompletedTasks] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos)
      setTodos(parsedTodos)
      setTotalTasks(parsedTodos.length)
      setCompletedTasks(parsedTodos.filter((todo: Todo) => todo.completed).length)
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTodos = localStorage.getItem('todos')
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos)
        setTodos(parsedTodos)
        setTotalTasks(parsedTodos.length)
        setCompletedTasks(parsedTodos.filter((todo: Todo) => todo.completed).length)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <GlassCard>
      <GlassCardHeader>
        <GlassCardTitle><div className="text-base text-white dark:text-gray-300">Daily Progress</div></GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-">
          <div className="text-sm text-white dark:text-gray-300">
            <DateTimeLocation />
          </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-white">
              <span className="font-medium">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <span className="ml-2 text-sm text-white dark:text-gray-300">Tasks completed</span>
          </div>
          <div className="relative w-32 h-32">
            <CircularProgressbar
              value={percentage}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'round',
                pathTransitionDuration: 0.5,
                pathColor: '#5b21b6',
                trailColor: 'hsl(var(--muted))',
              })}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary text-white dark:text-gray-300">{percentage}%</span>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}

