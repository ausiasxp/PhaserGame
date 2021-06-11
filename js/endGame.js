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
}

function createEnd(){
    bg = game.add.image(0, 0, 'bg');
    bg.width = STAGE_WIDTH;
    bg.height = STAGE_HEIGHT;

    let rect = game.add.image(STAGE_WIDTH/2, 15, 'textBg');
    rect.anchor.setTo(0.5, 0);
    rect.alpha = 0.8;
    rect.width = STAGE_WIDTH - 30;
    rect.height = STAGE_HEIGHT - 130;

    // Total time elapsed
    let time_text = String(Math.trunc(total_time / 60)).padStart(2, "0") + ':'
    + String(total_time % 60).padStart(2, "0");
    let time = game.add.text(STAGE_WIDTH/2, STAGE_HEIGHT/2 - 50, time_text, {
        fontSize: '20pt',
        font: font_time
    });
    time.anchor.setTo(0.5, 0.5);
    time.stroke = '#000000';
    time.strokeThickness = 8;
    time.fill = '#ffffff';
    time.smoothed = false;

    // remaining jumps from zone A
    let jumps = game.add.image(STAGE_WIDTH/2, STAGE_HEIGHT*0.3, 'jumpsSS', currentJump);
    jumps.anchor.setTo(0.5, 0.5);

    // remaining energy from zone B
    let energy = game.add.image(STAGE_WIDTH/2, STAGE_HEIGHT*0.5, 'energySS', EnergyValue);
    energy.anchor.setTo(0.5, 0.5);

    // remaining time from zone C
    

    // home button
    let homeBtn = game.add.button(STAGE_WIDTH/4, STAGE_HEIGHT*0.7, 'homeBtn', returnHome);
    homeBtn.anchor.setTo(0.5, 0.5);

    // Replay button
    let replayBtn = game.add.button(STAGE_WIDTH*3/4, STAGE_HEIGHT*0.7, 'replayBtn', replay);
    replayBtn.anchor.setTo(0.5, 0.5);

    // Reset variables fro next games
    gameState = PLATFORMER;
    total_time = 0;
    currentJump = MAX_JUMPS;
    EnergyValue = MAX_ENERGY;
    squirrel_initial_x = 32;
    squirrel_initial_y = WORLD_HEIGHT - 150;
}

function returnHome(){
    game.state.start('welcome');
}

function replay(){
    game.state.start('play');
}