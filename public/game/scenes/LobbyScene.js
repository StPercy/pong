import GeneralScene from "./GeneralScene.js";

class LobbyScene extends GeneralScene {
    constructor(settings) {
        super('LobbyScene', settings);
    }

    init() {
        this.socket.emit('opponent:get')
    }

    create() {
        this.createSearchOpponentText()
    }



    update() {
        if (typeof this.config.socketManager.isLeftPlayer !== 'undefined' && !this.playButton?.visible) {
            this.searchOpponentText.visible = false
            this.createPlayButton()
        }
    }

    createPlayButton() {
        this.playButton
            ? (this.playButton.visible = true)
            : (this.playButton = this.createText({
                text: 'PLAY',
                func: () => {
                    this.test = true
                    this.scene.sleep(this)
                    this.scene.run('GameScene', {
                        isLeftPlayer: this.config.socketManager.isLeftPlayer,
                    })
                },
            }))
    }

    createSearchOpponentText() {
        this.searchOpponentText
            ? (this.searchOpponentText.visible = true)
            : (this.searchOpponentText = this.createText({
                text: 'Searching an opponent... 🎮',
            }))
    }
}

export default LobbyScene