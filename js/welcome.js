const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;

let initialState = {
    preload: loadAssets,
    create: displayScreen
};

function loadAssets(){
    game.load.image('bg', 'assets/images/welcomeBG.png');
    game.load.image('playButton', 'assets/images/button_play.png');
    game.load.image('aboutButton', 'assets/images/button_about.png');
    game.load.image('title', 'assets/images/game-name.png');
    game.load.image('rect', 'assets/images/rectangle_about.png');
}

function displayScreen(){
    game.input.enabled = true;
    let bg = game.add.image(0, 0, 'bg');
    bg.height = STAGE_HEIGHT;

    let rect = game.add.image(-10, 120, 'rect');
    rect.height = 100;
    rect.width = STAGE_WIDTH + 30;
    rect.alpha = 0.8;

    let title = game.add.image(STAGE_WIDTH/2, 170, 'title');
    title.anchor.setTo(0.5, 0.5);

    showAuthors();
    showButtons();
}

function showAuthors(){
    let msgAuthors = 'Ausias García Torres\nVanessa Jiménez Tarazona\nJosaem Silva Sanmiguel';
    let styleAuthors = {
        font: '12pt Sniglet',
        fill: '#FFFFFF',
    };

    let authorsTxt = game.add.text(STAGE_WIDTH - 200, STAGE_HEIGHT -100, msgAuthors, styleAuthors);
    authorsTxt.fixedToCamera = true;
    authorsTxt.stroke = '#000000';
    authorsTxt.strokeThickness = 3;
    authorsTxt.fill = '#ffffff';
}

function showButtons(){
    let btnPlay = game.add.button(STAGE_WIDTH / 2 , STAGE_HEIGHT / 3 *2,
        'playButton', onPlayButtonPressed);
    btnPlay.anchor.setTo(0.5, 0.5);
    let btnAbout = game.add.button(btnPlay.x, btnPlay.y + btnPlay.height + 30,
        'aboutButton', onAboutButtonPressed);
    btnAbout.anchor.setTo(0.5, 0.5);
}

function onAboutButtonPressed() {
    game.state.start('about');
}

function onPlayButtonPressed() {
    game.state.start('play');
}