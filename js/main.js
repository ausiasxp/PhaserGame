let game;

let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One', 'Sniglet']
    },

    custom: {
        families: ['FerrumExtracondensed','Triforce'],
        urls: ["https://fontlibrary.org/face/ferrum",'../assets/fonts/Triforce.ttf']
    }
};

WebFont.load(wfConfig);

function startGame() {
    game = new Phaser.Game(800, 600, Phaser.CANVAS, 'platformGameStage');

    // Welcome Screen
    game.state.add('welcome', initialState);
    // About Screen
    game.state.add('about', aboutState);
    // Config Screen
    game.state.add('config', configState);
    // Play Screen
    game.state.add('play', playState);

    game.state.start('welcome');

}