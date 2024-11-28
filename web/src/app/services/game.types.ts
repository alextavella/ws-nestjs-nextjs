export type Game = {
  username: string
  room: RoomGame
}

export type GameClient = {
  roomId: string
  username: string
}

export type RoomGame = {
  roomId: string
  participants: string[]
  selections: RoomSelection[]
}

export type RoomSelectionEvent = RoomSelection[]

export type RoomSelection = {
  username: string
  content: string
  createdAt: Date
}
