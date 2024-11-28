'use client'

import Board from '@/components/Board'
import { useRoom } from '@/services/useRoom'
import { useParams } from 'next/navigation'

function RoomPage() {
  const { slug: roomId } = useParams<{ slug: string }>()
  const { username, player, selections, selectItem } = useRoom(roomId)

  return (
    <main>
      <h1>Ola, {username}</h1>
      <Board player={player} selections={selections} onClick={selectItem} />
    </main>
  )
}

export default RoomPage
