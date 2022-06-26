import { io } from 'socket.io-client';

class SocketioService {
  constructor() {
    this.socket
    this.userSocketId
  }

  setupSocketConnection(data) {
    this.socket = io('http://'+location.hostname+':8081');
    this.socket.emit('userJoin', data, cb => {
      this.userSocketId = cb.userSocketId
    })
  }

  disconnect() {
      if(this.socket) {
        this.socket.disconnect()
      }
  }
}

export default new SocketioService();