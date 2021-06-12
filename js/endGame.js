let endState = {
    preload: loadEnd,
    create: createEnd
}

function loadEnd(){
    game.load.image('bg', 'assets/images/welcomeBG.png');
    game.load.spritesheet('energySS', 'assets/images/energyUI.png', 88, 64);
    game.load.spritesheet('jumpsSS', 'assets/images/jumpsUI.png', 96, 64);
    game.load.image('textBg', 'assets/images/rectangle_about.png');
    game.load.image('homeBtn', 'assets/images/button_home.png');
    game.load.image('replayBtn', 'assets/images/button_play-again.png');
    game.load.image('nutHUD', 'assets/images/nutsHUD.png');
}

function createEnd(){
    bg = game.add.image(0, 0, 'bg');
    bg.width = STAGE_WIDTH;
    bg.height = STAGE_HEIGHT;

    let rect = game.add.image(STAGE_WIDTH/2, 15, 'textBg');
    rect.anchor.setTo(0.5, 0);
    rect.alpha = 0.8;
    rect.width = STAGE_WIDTH - 30;
    rect.height = STAGE_HEIGHT - 70;

    // text
    let subtitlesTxt = 'Total time:\n\nRemaining jumps:\nRemaining energy:\nWords score:\nNuts collected:\n\nTotal score:';
    let subtitles = game.add.text(STAGE_WIDTH/4, STAGE_HEIGHT*0.1, subtitlesTxt, {
        fontSize: '20pt',
        font: font_time
    });
    subtitles.anchor.setTo(0, 0);
    subtitles.stroke = '#000000';
    subtitles.strokeThickness = 8;
    subtitles.fill = '#ffffff';
    subtitles.smoothed = false;

    // Total time elapsed
    let time_text = String(Math.trunc(total_time / 60)).padStart(2, "0") + ':'
    + String(total_time % 60).padStart(2, "0");
    let time = game.add.text(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.1, time_text, {
        fontSize: '20pt',
        font: font_time
    });
    time.anchor.setTo(1, 0);
    time.stroke = '#000000';
    time.strokeThickness = 8;
    time.fill = '#ffffff';
    time.smoothed = false;

    // remaining jumps from zone A
    let jumps = game.add.image(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.2, 'jumpsSS', currentJump);
    jumps.anchor.setTo(1, 0);

    // remaining energy from zone B
    let energy = game.add.image(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.3, 'energySS', EnergyValue);
    energy.anchor.setTo(1, 0);

    // score from zone C
    let wordScore = game.add.text(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.4, scorePalabras, {
        fontSize: '20pt',
        font: font_time
    });
    wordScore.anchor.setTo(1, 0);
    wordScore.stroke = '#000000';
    wordScore.strokeThickness = 8;
    wordScore.fill = '#ffffff';
    wordScore.smoothed = false;

    // Nuts collected
    let nutImg = game.add.image(STAGE_WIDTH*3/4 - 20, STAGE_HEIGHT*0.5, 'nutHUD');
    nutImg.anchor.setTo(1, 0);
    nutImg.scale.setTo(0.7);

    let totalNuts = game.add.text(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.5 + 20, "x" + scoreNut, {
        fontSize: '20pt',
        font: font_time
    });
    totalNuts.anchor.setTo(1, 0);
    totalNuts.stroke = '#000000';
    totalNuts.strokeThickness = 8;
    totalNuts.fill = '#ffffff';
    totalNuts.smoothed = false;

    // Total score
    let totalScore = EnergyValue + currentJump + scorePalabras + scoreNut;
    let totalScoreTxt = game.add.text(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.65, totalScore, {
        fontSize: '20pt',
        font: font_time
    });
    totalScoreTxt.anchor.setTo(1, 0);
    totalScoreTxt.stroke = '#000000';
    totalScoreTxt.strokeThickness = 8;
    totalScoreTxt.fill = '#ffffff';
    totalScoreTxt.smoothed = false;

    // home button
    let homeBtn = game.add.button(STAGE_WIDTH/4, STAGE_HEIGHT*0.8, 'homeBtn', returnHome);
    homeBtn.anchor.setTo(0.5, 0.5);

    // Replay button
    let replayBtn = game.add.button(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.8, 'replayBtn', replay);
    replayBtn.anchor.setTo(0.5, 0.5);

    // Reset variables fro next games
    gameState = PLATFORMER;
    total_time = 0;
    currentJump = MAX_JUMPS;
    EnergyValue = MAX_ENERGY;
    squirrel_initial_x = GLOBAL_INITAL_X;
    squirrel_initial_y = WORLD_HEIGHT - 150;

}

function returnHome(){
    game.state.start('welcome');
}

function replay(){
    game.state.start('play');
}