import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Game, RoomGame, RoomSelection } from './game.types'
import { RoomResponse } from './room.types'

export const gameAtom = atomWithStorage<Game | null>('@ws/game', null)

export const playerAtom = atom<string | undefined>(
  get => get(gameAtom)?.username,
)

export const roomAtom = atom<RoomGame | null>(
  get => get(gameAtom)?.room || null,
)

export const enjoyRoomAtom = atom<null, RoomResponse[], void>(
  null,
  (get, set, payload) => {
    set(gameAtom, {
      username: payload.username,
      room: {
        roomId: payload.roomId,
        participants: payload.participants,
        selections: payload.selections,
      },
    })
  },
)

export const leaveRoomAtom = atom(null, (_, set) => {
  set(gameAtom, null)
})

export const updateSelectionAtom = atom<null, RoomSelection[][], void>(
  null,
  (get, set, payload) => {
    const game = get(gameAtom)
    if (!game) return
    set(gameAtom, {
      ...game,
      room: {
        ...game.room,
        selections: payload,
      },
    })
  },
)
