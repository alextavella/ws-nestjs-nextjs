'use client'

import { api } from '@/lib/api'
import { queryClient } from '@/lib/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import io from 'socket.io-client'

export default function Notes() {
  const { data: notes } = useSuspenseQuery<string[]>({
    queryKey: ['notes'],
    queryFn: () =>
      api.get<{ notes: string[] }>('/notes').then(res => res.data.notes),
    refetchOnWindowFocus: false,
  })

  async function createNoteAction(data: FormData) {
    const note = data.get('note')?.toString()
    await api.post('/notes', { note }).catch(console.error)
  }

  React.useEffect(() => {
    const socket = io('http://localhost:3001/server')
    socket.on('connect', () => {
      console.log('Connected to the server')
    })
    socket.on('disconnect', () => {
      console.log('Disconnected from the server')
    })
    socket.on('notes', (event: { note: string }) => {
      queryClient.setQueryData<string[]>(['notes'], state => {
        if (!state) return []
        return [...state, event.note]
      })
    })
  }, [])

  return (
    <div className="w-full max-w-xs flex flex-col gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ol className="list-inside bg-white shadow-md rounded">
          {notes?.map((note, index) => (
            <li className=" text-black p-2" key={`${note}-${index}`}>
              {note}
            </li>
          ))}
        </ol>
      </Suspense>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={createNoteAction}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="note"
          >
            Note
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="note"
            name="note"
            type="text"
            placeholder="Note"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            title="Submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
