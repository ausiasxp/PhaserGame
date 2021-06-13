const game_name = 'nut catcher';
const font_instructions = 'bold sketchtica';
const font_title = 'orange_juice';

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
        fontSize: '60pt',
        fill: '#521b00',
    };

    let title = game.add.text(STAGE_WIDTH/2, 80, textTitle, styleTitle);
    title.anchor.setTo(0.5, 0.5);

    // Add the instructions
    let instructions = 'Control the squirrel with the arrow keys.';
    instructions += '\nHelp the squirrel through its way home.';
    instructions += '\nYou have to jump over branches, try not to get eaten by predators. If you get eaten, your energy will be decreased by one.';
    instructions += " Guess different types of nuts to sum up points. And finally collect all the nuts you can. (Don't let those sneaky spiders steal your precious nuts)";

    let instrucText = game.add.text(0, 0, instructions, {
        font: font_instructions,
        fontSize: '20pt',
        fill: '#240c00'
    });

    //instrucText.anchor.setTo(0.5, 0.5);
    instrucText.setTextBounds(30, 250, STAGE_WIDTH - 50);
    instrucText.boundsAlignH = 'center';
    instrucText.boundsAlignV = 'middle';
    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = STAGE_WIDTH - 60;
    instrucText.smoothed = false;

    let btnBack = game.add.button(STAGE_WIDTH / 2, STAGE_HEIGHT - 60, 'backButton',
    onBackButtonPressed);
    btnBack.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressed(){
    game.state.start('welcome');
}