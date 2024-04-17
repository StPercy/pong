class IoManager {
    constructor(io) {
        this.io = io
        this.waitingSockets = []
        this.lobbies = []
        this.io.on('connection', socket => this.registerSocket(socket))
    }

    enableDebugLogs() {
        this.io.on('connection', ({ id }) => console.log(`Socket with id ${id} connected`))
    }

    registerSocket(socket) {
        const socketInfo = { socketId: socket.id, socket }
        socket.on('opponent:get', this.joinWaitingLobby.bind(this, socketInfo))
    }

    joinWaitingLobby(socketInfo) {
        this.waitingSockets.push(socketInfo)
        console.table(this.waitingSockets)
        if (this.waitingSockets.length < 2) return
        this.initNewLobby()
    }

    initNewLobby() {
        const playerInfo1 = this.waitingSockets.shift()
        const playerInfo2 = this.waitingSockets.shift()
        const lobbyId = `lobby-${playerInfo1.socketId}`
        const lobbyInfo = {
            lobbyId,
            player: { playerInfo1, playerInfo2 },
            leftPlayerId: playerInfo1.socketId,
        }
        this.lobbies.push(lobbyInfo)
        playerInfo1.socket.join(lobbyId)
        playerInfo2.socket.join(lobbyId)
        this.io
            .to(lobbyId)
            .emit('opponent:found', { leftPlayerId: lobbyInfo.leftPlayerId })
    }
}

module.exports = IoManager