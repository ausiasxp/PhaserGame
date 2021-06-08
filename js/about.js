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
    bg.width = STAGE_WIDTH;
    bg.height = STAGE_HEIGHT;

    let rect = game.add.image(STAGE_WIDTH/2, 15, 'textBg');
    rect.anchor.setTo(0.5, 0);
    rect.alpha = 0.8;
    rect.width = STAGE_WIDTH - 30;
    rect.height = STAGE_HEIGHT - 130;

    // Add the title
    let textTitle = game_name;
    let styleTitle = {
        font: font_title,
        fontSize: '20pt',
        fill: '#000000'
    };

    let title = game.add.text(STAGE_WIDTH/2, 50, textTitle, styleTitle);
    title.anchor.setTo(0.5, 0.5);

    // Add the instructions
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
    instrucText.setTextBounds(30, 150, STAGE_WIDTH - 50);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = STAGE_WIDTH - 60;

    let btnBack = game.add.button(STAGE_WIDTH / 2, STAGE_HEIGHT - 60, 'backButton',
    onBackButtonPressed);
    btnBack.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressed(){
    game.state.start('welcome');
}