import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Ensure the path is correct and the module exists
// Check if the ThemeProvider module exists and is correctly exported

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Productivity App",
  description: "Pomodoro, To-Do, and Daily Progress",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
