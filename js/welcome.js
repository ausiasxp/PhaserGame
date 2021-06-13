const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 600;
const FREQUENCY = 1000/30;

let squirrelWelcome;

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
    game.load.spritesheet('squirrel', 'assets/images/squirrelWelcome.png', 32, 32); 
    game.load.image('ground', 'assets/images/ground.png');
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

    squirrelWelcome = game.add.sprite(70, STAGE_HEIGHT - 70, 'squirrel', 0);
    squirrelWelcome.anchor.setTo(0.5, 1);
    squirrelWelcome.scale.setTo(2.5);
    squirrelWelcome.smoothed = false;
    squirrelWelcome.animations.add('walk', [32, 33, 34], 10, true);

    game.add.tileSprite(0, squirrelWelcome.y - 16, STAGE_WIDTH, 100, 'ground');

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
    let btnPlay = game.add.button(STAGE_WIDTH / 2 , STAGE_HEIGHT*0.5,
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
    game.time.events.loop(FREQUENCY, moveSquirrel, this);
    squirrelWelcome.animations.play('walk');
}

function moveSquirrel(){
    squirrelWelcome.x += 10;
    if(squirrelWelcome.x > STAGE_WIDTH){
        game.state.start('play');
    }
}

