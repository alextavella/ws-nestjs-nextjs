import { api } from '@/lib/api'
import { enjoyRoomAtom } from '@/services/room.store'
import { RoomResponse } from '@/services/room.types'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

function CreateRoom() {
  const router = useRouter()
  const enjoyRoom = useSetAtom(enjoyRoomAtom)

  async function createRoomAction(data: FormData) {
    const roomId = data.get('roomId')?.toString()
    const username = data.get('username')?.toString()
    if (roomId && username) {
      api
        .post<RoomResponse>('/room', { roomId, username })
        .then(res => {
          enjoyRoom(res.data)
          router.push(`/room/${roomId}`)
        })
        .catch(err => {
          console.error('Room not found', err)
        })
    }
  }

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      action={createRoomAction}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          name="username"
          type="text"
          defaultValue="alex.tavella"
          placeholder="Username"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Room
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomId"
          name="roomId"
          type="text"
          defaultValue="room-xpto"
          placeholder="Room"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          title="Create"
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default CreateRoom
