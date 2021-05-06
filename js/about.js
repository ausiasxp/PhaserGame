const game_name = 'game name';
const font_instructions = 'Sniglet';
const font_title = 'Rammetto One';

let aboutState = {
    preload: loadAboutAssets,
    create: showInstructions
};

function loadAboutAssets(){
    game.load.image('backButton', 'assets/images/button_back.png');
    game.load.image('textBg', 'assets/images/rectangle_about.png');
}

function showInstructions(){
    bg = game.add.image(0, 0, 'bg');
    bg.width = game.world.width;
    bg.height = game.world.height;

    let rect = game.add.image(game.world.width/2, 15, 'textBg');
    rect.anchor.setTo(0.5, 0);
    rect.alpha = 0.8;
    rect.width = game.world.width - 30;
    rect.height = game.world.height - 130;

    let textTitle = game_name;
    let styleTitle = {
        font: font_title,
        fontSize: '20pt',
        fill: '#000000'
    };

    let title = game.add.text(game.world.width/2, 50, textTitle, styleTitle);
    title.anchor.setTo(0.5, 0.5);

    let instructions = 'insert instrucionsinsert instrucionsinsert instrucionsinsert instrucionsinsert instrucions';
    instructions += 'insert instrucionsinsert instrucionsinsert instrucionsinsert instrucionsinsert instrucions';
    instructions += 'insert instrucionsinsert instrucionsinsert instrucionsinsert instrucionsinsert instrucions';
    instructions += 'insert instrucionsinsert instrucionsinsert instrucionsinsert instrucionsinsert instrucions';

    let instrucText = game.add.text(0, 0, instructions, {
        font: font_instructions,
        fontSize: '15pt',
        fill: '#000000'
    });

    //instrucText.anchor.setTo(0.5, 0.5);
    instrucText.setTextBounds(30, 150, game.world.width - 50);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width - 60;

    let btnBack = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton',
    onBackButtonPressed);
    btnBack.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressed(){
    game.state.start('welcome');
}