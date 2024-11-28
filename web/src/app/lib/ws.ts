import { io } from 'socket.io-client'

const socket = io('http://localhost:3001/server', { retries: 0 })

socket.on('connect', () => {
  console.log('Connected to the server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from the server')
})

export { socket }
