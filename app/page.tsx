import { Pomodoro } from './components/pomodoro'
import { TodoList } from './components/todo'
import { DailyProgress } from './components/daily-progress'
// import { DateTimeLocation } from './components/date-time-location'
import { CountdownTo2025 } from './components/countdown-to-2025'
import { ThemeToggle } from '@/components/theme-toggle'
// import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      {/* <div className="fixed inset-0 -z-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pawel-czerwinski-cPxNce0o_Jk-unsplash.jpg-tliQe1f4dzdGDthhDpHa2ru6xpSEDL.jpeg"
          alt="Abstract dark background with curved shapes"
          fill
          priority
          className="object-cover"
        />
      </div> */}

      <main className="container mx-auto p-4 pb-16 relative">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-white font-montaga">Boostly</h1>
            <h3 className="text-xl font-semibold text-gray-400 dark:text-gray-400 mt-2">Stay Focused and Achieve More Today!</h3>
          </div>
          <ThemeToggle />
        </div>
        {/* <DateTimeLocation /> */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <TodoList />
          </div>
          <div className="md:w-2/3 grid grid-cols-1 gap-4">
            <Pomodoro />
            <DailyProgress />
            <CountdownTo2025 />
          </div>
        </div>
      </main>

      <footer className="absolute bottom-35 left-0 right-0 text-center p-4 text-sm text-gray-400 dark:text-gray-400 bg-black">
        Created by{' '}
        <Link 
          href="https://www.linkedin.com/in/bryan-oh-15784116b/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:underline"
          color="white"
        >
          Bryan
        </Link>{' '}
        using Vercel AI.
      </footer>
    </div>
  )
}
