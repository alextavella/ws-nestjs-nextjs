'use client'

import Notes from '@/views/notes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Notes />
      </main>
    </QueryClientProvider>
  )
}
