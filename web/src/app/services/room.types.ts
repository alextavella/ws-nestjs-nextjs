export type RoomResponse = {
  roomId: string
  username: string
  participants: string[]
  selections: RoomSelection[]
}

export type LeaveRoomRequest = {
  roomId: string
  username: string
}

export type RoomSelectionEvent = RoomSelection[]

export type RoomSelection = {
  username: string
  content: string
  createdAt: Date
}
