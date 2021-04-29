let btnAbout, btnPlay;

let initialState = {
    preload: loadAssets,
    create: displayScreen
};

function loadAssets(){
    game.load.image('bg', 'assets/images/welcomeBG.png');
    game.load.image('playButton', 'assets/images/button_play.png');
    game.load.image('aboutButton', 'assets/images/button_about.png');
    game.load.image('title', 'assets/images/game-name.png');
}

function displayScreen(){
    game.input.enabled = true;
    let bg = game.add.image(0, 0, 'bg');
    bg.width = game.world.width;
    bg.height = game.world.height;

    game.add.image(250, 170, 'title');

    showAuthors();
    showButtons();
}

function showAuthors(){
    let msgAuthors = 'Ausias García Torres\nVanessa Jiménez Tarazona\nJosaem Silva Sanmiguel';
    let styleAuthors = {
        font: '12pt Sniglet',
        fill: '#FFFFFF',
        //boundsAlignH: "right"
    };

    game.add.text(game.world.width - 200, game.world.height -100, msgAuthors, styleAuthors);
}

function showButtons(){
    btnPlay = game.add.button(game.world.width / 2 - 50, game.world.height / 3 *2,
        'playButton', onPlayButtonPressed);
    btnAbout = game.add.button(btnPlay.x - 10, btnPlay.y + btnPlay.height + 30,
        'aboutButton', onAboutButtonPressed);

}

function onAboutButtonPressed() {
    game.state.start('about');
}

function onPlayButtonPressed() {
    game.state.start('play');
}