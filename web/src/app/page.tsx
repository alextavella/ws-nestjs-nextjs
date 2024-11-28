'use client'

import CreateRoomForm from '@/components/CreateRoom'
import EnjoyRoom from '@/components/EnjoyRoom'

function HomePage() {
  return (
    <main>
      <div className="w-full max-w-xs flex flex-col gap-4">
        <CreateRoomForm />
        <EnjoyRoom />
      </div>
    </main>
  )
}

export default HomePage
