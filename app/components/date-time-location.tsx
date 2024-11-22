// 'use client'

// import { useState, useEffect } from 'react'
// import { Clock } from 'lucide-react'

// export function DateTimeLocation() {
//   const [currentTime, setCurrentTime] = useState(new Date())

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000)
//     return () => clearInterval(timer)
//   }, [])

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
//   }

// //   const formatTime = (date: Date) => {
// //     return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
// //   }

//   return (
//     <div className="flex justify-between items-center mb-4 text-sm text-white dark:text-gray-300">
//       <div className="flex items-center">
//         <span>{formatDate(currentTime)}</span>
//         {/* <Clock className="w-4 h-4 mr-2" /> */}
//       </div>
//       {/* <div className="flex items-center">
//         <span className="mr-4">{formatTime(currentTime)}</span>
//       </div> */}
//     </div>
//   )
// }
