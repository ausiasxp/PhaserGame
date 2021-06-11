
let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Sniglet']
    },

    custom: {
        families: ['orange_juice', 'alone_on_earth'],
        urls: ['../assets/fonts/orange juice 2.0.ttf', '../assets/fonts/CFAloneontheEarthDEMO-Regul.ttf']
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.CANVAS, 'GameStage');

    // Welcome Screen
    game.state.add('welcome', initialState);
    // About Screen
    game.state.add('about', aboutState);
    // Play Screen
    game.state.add('play', playState);
    // End game screen
    game.state.add('end', endState);

    game.state.start('welcome');

}