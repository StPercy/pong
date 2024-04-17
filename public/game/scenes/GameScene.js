import GeneralScene from './GeneralScene.js'

class GameScene extends GeneralScene {
    constructor(settings) {
        super('GameScene', settings)
    }

    init({ isLeftPlayer }) {
        this.isHost = isLeftPlayer
        this.isLeftPlayer = isLeftPlayer
    }

    create() {
        this.createBackground()
        this.createPlayer()
    }

    createPlayer() {
        this.leftPlayer = this.physics.add.sprite(50, this.config.center.y, 'playerLeft')
        this.leftPlayer.setCollideWorldBounds()
        this.rightPlayer = this.physics.add.sprite(
            this.config.width - 50,
            this.config.center.y,
            'playerRight',
        )
        this.rightPlayer.setCollideWorldBounds() 
    }

    createBackground() {
        this.add
            .image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width, this.game.config.height)
            .setScrollFactor(0)
    }
}

export default GameScene