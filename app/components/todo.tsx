'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card"
import { Plus } from 'lucide-react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Schedule team meeting", completed: false },
    { id: 3, text: "Prepare presentation slides", completed: false },
  ])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    } else {
      // If no todos in local storage, use the initial example todos
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('storage'))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <GlassCard className="h-full flex flex-col">
      <GlassCardHeader>
        <GlassCardTitle><div className="text-base text-white dark:text-gray-300">To-Do List</div></GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="flex-grow flex flex-col ">
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="bg-white/50 dark:bg-transparent border-gray-300 dark:border-gray-600 text-white dark:text-gray-100 placeholder- dark:placeholder-gray-400"
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          <ul className="space-y-2">
            {todos.map(todo => (
              <li key={todo.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                  className="border-gray-400 dark:border-gray-600"
                />
                <span className={`flex-grow text-white dark:text-gray-100 ${todo.completed ? 'line-through opacity-50' : ''}`}>
                  {todo.text}
                </span>
                <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </GlassCardContent>
    </GlassCard>
  )
}

