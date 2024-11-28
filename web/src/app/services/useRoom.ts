import { socket } from '@/lib/ws'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React from 'react'
import { playerAtom, roomAtom, updateSelectionAtom } from './room.store'

export function useRoom(roomId: string) {
  const room = useAtomValue(roomAtom)
  const username = useAtomValue(playerAtom)
  // const leaveRoom = useSetAtom(leaveRoomAtom)
  const updateSelection = useSetAtom(updateSelectionAtom)
  const router = useRouter()

  const player = React.useMemo<number>(() => {
    if (!room || !username) return 0
    return room.participants?.indexOf(username) || 0
  }, [room, username])

  const playerActived = React.useMemo<string | null>(() => {
    if (!room) return null
    if (room.participants?.length < 2) return null
    const even = room.selections?.length % 2 === 0
    return even ? room?.participants?.[0] : room?.participants?.[1]
  }, [room])

  const selectItem = React.useCallback(
    async (content: string) => {
      socket.emit('selection', {
        username,
        content,
      })
    },
    [username],
  )

  React.useEffect(() => {
    socket.on('disconnect', () => {
      router.push('/')
    })

    socket.on(`room/${roomId}/selections`, updateSelection)

    socket.emit('room', {
      connect: true,
      roomId,
      username,
    })
  }, [roomId, router, updateSelection, username])

  React.useEffect(() => {
    return () => {
      console.log('[leave]')
      // socket?.disconnect()
      // leaveRoom()
    }
  }, [])

  return {
    room,
    roomId,
    username,
    // game
    player,
    playerActived,
    selections: room?.selections || [],
    // callback
    selectItem,
  }
}
