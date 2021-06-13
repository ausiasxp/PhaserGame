// PENDIENTE
// transiciones
// plataformas movible
// Nivel optativo
// Hacer que las ardillas dejen de spawnear antes de lo de las palabras: hay un bug que si te pegan y entras
//   en el juego de las palabras la imagen no está centrada
// Hacer que se quite la interfaz de plataformeo durante el juego de las palabras
// Quitar test


// GLOBAL
const WORLD_WIDTH = 10500;
const WORLD_HEIGHT = 900;//before:800
const GRAVITY = 1000;
const JUMP = 600;
const SQUIRREL_VELOCITY = 300;
const font_sign = 'Sniglet';
const font_time = 'sniglet';
const GLOBAL_INITAL_X = 32;

//game states
const PLATFORMER = 0;
const AVOID_ENEMIES = 1;
const WORD_GAME = 2;
const NUT_CATCHER = 3;
const END = 4;

// PLATFORM
const VICTORY_POINTS = 500;
const PLATFORM_X_OFFSET = 20;
const PLATFORM_VELOCITY = 75;
const BUSH_HEIGHT = 990;
const MAX_JUMPS = 35;


// AVOID ENEMIES
const LEVEL_X_ORIGIN = 4355;

const TIMER_RYTHM = 2*Phaser.Timer.SECOND;
const MAX_ENERGY = 6;

const EAGLES_GROUP_SIZE = 10;
const EAGLE_PROBABILITY = 0.5;
const EAGLE_VELOCITY = 70;

const FOXES_GROUP_SIZE = 10;
const FOXES_PROBABILITY = 0.5;
const FOXES_VELOCITY = 200;
const FOXES_VELOCITY_Y = 800;

const PLAYER_COLLIDE_OFFSET_X = 200;

// WORD GAME
const TIEMPO_PALABRAS = 40;
const SPIDER_PROBABILITY = 0.7;


// GLOBAL 
let gameState = PLATFORMER;  // Start at platformer
let squirrel;
let bg_back, bg_mid, bg_light, bg_front;
let platforms, ground;
let toRight = false;
let cursors, spacebarKey;
let soundMusic;
let music = false;
let soundMusic2;
let music2 = false;
let soundMusic3;
let music3 = false;
let squirrel_initial_x = GLOBAL_INITAL_X; 
let squirrel_initial_y = WORLD_HEIGHT - 150;
let total_time = 0, total_timeHUD, total_time_clock;

// PLATFORM
let bgplatformBehind, bgplatformInfront;
let score = 0;
let scoreText;
let soundJump;
let currentJump = MAX_JUMPS;
let WallAB;
let jumpsHUD;
let sign, signGroup, rect, signText, signTextContainer;
let movingPlat;

// AVOID ENEMIES
let EnergyValue = MAX_ENERGY;
let eagles;
let currentEagleProbability, currentEagleVelocity;
let foxes, foxCall;
let energyHUD;
let gameOverImg, replayButton;
let cry;


///////////////////// WORDS
let wordFound = false; //variable que dice si hemos encontrado las palabras o no
let wordsFound = 0;
let wordFoundText;

let word = ""; //variable que acumula la palabra que pone el jugador
let wordText;

let palabraActual;
//let palabraActualText;
let indicePalabra;

let charText;

var timerPalabras;
var timerTextPalabras;
var timeRemaining = 10;
var scorePalabras = 0;
var scorePalabrasText;

var imagenPalabra;

let wrongSF, correctSF;
let rectBGwords;

let foundTxt;
let timeTxt;
let scoreTxt;

/////////////////////

////////////////////// NUT CATCHER

let fallingNut;
let generadorNut;
let firsNut;
let scoreNut;
let scoreNutHUD, nutHUD;
let nutSnd;
let fallingSpider;

//////////////////////


let playState = {
    preload: loadPlayAssets,
    create: createPlay,
    update: updatePlay,
    //render: render
};

function loadPlayAssets(){
    // BACKGROUND
    game.load.image('bg_back', 'assets/images/parallax-forest-back-trees.png');
    game.load.image('bg_mid', 'assets/images/parallax-forest-middle-trees.png');
    game.load.image('bg_light', 'assets/images/parallax-forest-lights.png');
    game.load.image('bg_front', 'assets/images/parallax-forest-front-trees.png');

    // PLATFORMER
    game.load.image('groundr', 'assets/images/platform.png');
    game.load.image('groundl', 'assets/images/platformleft.png');
    game.load.image('sign', 'assets/images/signpost.png');
    game.load.image('star', 'assets/images/star.png');
    game.load.image('tree', 'assets/images/tree3.png');
    game.load.image('tree2', 'assets/images/tree2.png');
    game.load.image('bush', 'assets/images/bush.png');
    game.load.image('signTextBg', 'assets/images/rectangle_about.png');
    game.load.audio('jump', 'assets/sounds/jump_04.wav');
    game.load.audio('music', 'assets/sounds/music.wav');
    game.load.audio('music2', 'assets/sounds/music2.ogg');
    game.load.audio('music3', 'assets/sounds/music3.mp3');

    game.load.spritesheet('jumpsHUD', 'assets/images/jumpsUI.png', 96, 64);

    loadPlayAssetsAvoidEnemies();
    game.load.audio('cry', 'assets/sounds/cry.mp3');

    ///////////// WORDS
    //["cashew", "almond", "hazelnut", "peanut", "pistachio", "pumpkinseed", "sunflowerseed", "walnut"]
    game.load.image('cashew', 'assets/images/cashew.png');
    game.load.image('almond', 'assets/images/almond.png');
    game.load.image('hazelnut', 'assets/images/hazelnut.png');
    game.load.image('peanut', 'assets/images/peanut.png');
    game.load.image('pistachio', 'assets/images/pistachio.png');
    game.load.image('pumpkin seed', 'assets/images/pumpkin_seeds.png');
    game.load.image('sunflower seed', 'assets/images/sunflower_seeds.png');
    game.load.image('walnut', 'assets/images/walnut.png');

    game.load.audio('wrong', 'assets/sounds/wrong.mp3');
    game.load.audio('correct', 'assets/sounds/correct.mp3');
    /////////////

    // NUT CATCHER
    game.load.image('nutHUD', 'assets/images/nutsHUD.png');
    game.load.audio('nutCatched', 'assets/sounds/nutCatched.wav');
    game.load.spritesheet('spider', 'assets/images/Spider Sprite Sheet.png', 32, 32);
}

function createPlay(){

    game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Background
    createBG();

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys(); 
    spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    setPlatformsBehind();

    // Create ground
    ground = game.add.tileSprite(0, game.world.height - 64, game.world.width, 100, 'ground');
    game.physics.arcade.enable(ground);
    ground.body.immovable = true;

    // Sign
    createSign();

   // Squirrel
    setSquirrel(); 
    // Camera follows the player inside the world
    game.camera.follow(squirrel,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    createPlayAvoidEnemies();

    setPlatformsInfront();

    // Sounds
    soundMusic = game.add.audio('music', 1, true);
    soundMusic2 = game.add.audio('music2', 2, true);
    soundMusic3 = game.add.audio('music3', 2, true);
    soundJump = game.add.audio('jump', 0.6);
    foxCall = game.add.audio('foxCall');
    cry = game.add.audio('cry');
    nutSnd = game.add.audio('nutCatched', 0.7);
    
    // Remaining jumps HUD
    let allX = 50;
    jumpsHUD = game.add.sprite(allX, 50, 'jumpsHUD', currentJump);
    jumpsHUD.anchor.setTo(0.5, 0.5);
    jumpsHUD.fixedToCamera = true;

    // Definitive HUD
    energyHUD = game.add.sprite(allX, jumpsHUD.y + jumpsHUD.height + 10, 'HUDenergy', 6);
    energyHUD.anchor.setTo(0.5, 0.5);
    energyHUD.fixedToCamera = true;

    // Create the clock for the total time
    total_time_clock = game.time.events.loop(Phaser.Timer.SECOND, updateTime, this);
    total_timeHUD = game.add.text(allX, energyHUD.y + energyHUD.height + 10, total_time, {
        fontSize: '20pt',
        font: font_time
    });
    total_timeHUD.anchor.setTo(0.5, 0.5);
    total_timeHUD.fixedToCamera = true;
    total_timeHUD.stroke = '#000000';
    total_timeHUD.strokeThickness = 8;
    total_timeHUD.fill = '#ffffff';

    ////////////////////////// WORDS

    wordText = game.add.text(30, 30, "", {fill:'#000000'});
    wordFoundText = game.add.text(30, 60, "", {fill:'#000000'});
    //palabraActualText = game.add.text(30, 90, "", {fill:'#000000'});
    charText = game.add.text(30, 150, "", {fill:'#000000'})
    charText.fixedToCamera = true;

    timerTextPalabras = game.add.text(200, 30, "", {fill:'#000000'});

    scorePalabrasText = game.add.text(300,70, "", {fill:'#000000'});

    //  Create our Timer
    timerPalabras = game.time.create(false);

    //  Set a TimerEvent to occur after 1 second
    timerPalabras.loop(1000, updateCounter, this);

    //  Start the timerPalabras running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timerPalabras.start();


    //Minijuego palabras
    game.input.keyboard.addCallbacks(this, keyPress, null, null); //pillamos input de teclado para llamar a keyPress

    // Background 
    rectBGwords = game.add.image(100, 30, 'signTextBg');
    rectBGwords.alpha = 0.8;
    rectBGwords.fixedToCamera = true;
    rectBGwords.width = STAGE_WIDTH - 130;
    rectBGwords.height = STAGE_HEIGHT - 140;
    rectBGwords.visible = false;

    // Initialize first 
    imagenPalabra = game.add.sprite(0, STAGE_HEIGHT*2, "almond");
    mostrarImagenPalabra("almond");

    //Inicializamos la lista de palabras y la palabra actual
    misPalabras = ["cashew", "almond", "hazelnut", "peanut", "pistachio", "pumpkin seed", "sunflower seed", "walnut"];
    
    //false es que aún no ha sido encontrada, true es que ha sido encontrada
    for (i in misPalabras) misPalabras[i] = [misPalabras[i], false];

    palabraActual = nuevaPalabra(misPalabras);

    wordsFound = 0;
    scorePalabras = 0;

    wrongSF = game.add.audio('wrong');
    correctSF = game.add.audio('correct');

    // HUD
    foundTxt = game.add.text(150, 80, "found", {
        fontSize: '10pt',
        font: font_time
    });
    foundTxt.fixedToCamera = true;
    foundTxt.anchor.setTo(0.5, 0);
    foundTxt.stroke = '#000000';
    foundTxt.strokeThickness = 3;
    foundTxt.fill = '#ffffff';
    foundTxt.visible = false;

    timeTxt = game.add.text(STAGE_WIDTH - 70, 85, "time", {
        fontSize: '10pt',
        font: font_time
    });
    timeTxt.fixedToCamera = true;
    timeTxt.anchor.setTo(0.5, 0);
    timeTxt.stroke = '#000000';
    timeTxt.strokeThickness = 3;
    timeTxt.fill = '#ffffff';
    timeTxt.visible = false;

    scoreTxt = game.add.text(STAGE_WIDTH/2,85, "score", {
        fontSize: '10pt',
        font: font_time
    });
    scoreTxt.fixedToCamera = true;
    scoreTxt.anchor.setTo(0.5, 0);
    scoreTxt.stroke = '#000000';
    scoreTxt.strokeThickness = 3;
    scoreTxt.fill = '#ffffff';
    scoreTxt.visible = false;


    /////////// NUT_CATCHER
    fallingNut = game.add.sprite(-10, WORLD_HEIGHT + 50, "star");
    fallingNut.scale.setTo(0.5);
    fallingSpider = game.add.sprite(-10, WORLD_HEIGHT + 50, 'spider', 27);
    fallingSpider.scale.setTo(3);
    firsNut = true;
    scoreNut = 0;

    gameState = PLATFORMER;

    // HUD
    nutHUD = game.add.image(allX, 250, 'nutHUD');
    nutHUD.fixedToCamera = true;
    nutHUD.scale.setTo(0.7);
    nutHUD.anchor.setTo(0.5, 0.5);

    scoreNutHUD = game.add.text(allX + 20, 270, "x" + scoreNut, {
        fontSize: '20pt',
        font: font_time
    });
    scoreNutHUD.anchor.setTo(0.5, 0.5);
    scoreNutHUD.fixedToCamera = true;
    scoreNutHUD.stroke = '#000000';
    scoreNutHUD.strokeThickness = 8;
    scoreNutHUD.fill = '#ffffff';    
}

function createBG(){
    bg_back = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'bg_back');
    bg_back.anchor.setTo(0, 0);

    bg_mid = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'bg_mid');
    bg_mid.anchor.setTo(0, 0);

    bg_light = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'bg_light');
    bg_light.anchor.setTo(0, 0);

    bg_front = game.add.tileSprite(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 'bg_front');
    bg_front.anchor.setTo(0, 0);

}

function updateTime(){
    total_time += 1;
    let minutes = String(Math.trunc(total_time / 60)).padStart(2, "0");
    let seconds = String(total_time % 60).padStart(2, "0");
    total_timeHUD.setText(minutes + ':' + seconds);
}

function createSign(){
    // Sign
    sign = game.add.sprite(wallAB.x - 150, ground.y, 'sign');
    sign.anchor.setTo(0, 1);

    // Text background
    rect = game.add.image(sign.x, sign.y - 400, 'signTextBg');
    rect.anchor.setTo(0.5, 0);
    rect.alpha = 0.8;
    rect.width = STAGE_WIDTH *0.8;
    rect.height = STAGE_HEIGHT *0.5;

    // Text 
    signText = 'Well, well, well... What do we have here? ';
    signText += 'A smartass that thought it was going to be that easy. ';
    signText += '\nSorry to disappoint you, but you have to jump over the platforms. ';

    signTextContainer = game.add.text(rect.x - rect.width/2 + 30, rect.y, signText, {
        font: font_sign,
        fontSize: '15pt',
        fill: '#000000'
    });

    signTextContainer.setTextBounds(0, 0, rect.width - 50, rect.height);
    signTextContainer.boundsAlignH = 'center';
    signTextContainer.boundsAlignV = 'middle';
    signTextContainer.wordWrap = true;
    signTextContainer.wordWrapWidth = rect.width - 50; 

    rect.visible = false;
    signText.visible = false;
    signTextContainer.visible = false;
/*
    signGroup = game.add.group();
    signGroup.add(rect);
    signGroup.add(signText);
    signGroup.add(signTextContainer);
    signGroup.visible = false; */
}

function setSquirrel(){
    squirrel = game.add.sprite(squirrel_initial_x, squirrel_initial_y, 'squirrelSpritesheet');
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(squirrel);

    //  Player physics properties. Give the little guy a slight bounce.
    squirrel.body.bounce.y = 0.2;
    squirrel.body.gravity.y = GRAVITY;
    squirrel.body.collideWorldBounds = true;
    squirrel.anchor.setTo(0.5, 0.5);

    // Set animations
    squirrel.animations.add('walk_right', [0, 1, 2], 10, true);
    squirrel.animations.add('walk_left', [3, 4, 5], 10, true);

    // Adjust bounding box
    squirrel.body.setSize(64, 38);
}

function setPlatformsBehind(){
    //  The platforms group contains the ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Background behind the squirrel
    bgplatformBehind = game.add.group();

    // Wall between this and the next level so that the player can't just walk on the ground
    // throught the first zone
    wallAB = game.add.sprite(LEVEL_X_ORIGIN - 100, WORLD_HEIGHT, 'tree');
    wallAB.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(wallAB);
    wallAB.body.immovable = true;

    // PLATFORMER
    //treebg2
    bgtree = bgplatformBehind.create(560, game.world.height - 680, 'tree');
    bgtree.scale.setTo(1, 1);
    bush = bgplatformBehind.create(425, WORLD_HEIGHT - 760, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //treebg4
    bgtree = bgplatformBehind.create(1575, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformBehind.create(1405, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //treebg6
    bgtree = bgplatformBehind.create(2310, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);

    bush = bgplatformBehind.create(2140, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //treebg8
    bgtree = bgplatformBehind.create(3110, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformBehind.create(2940, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //treebg10
    bgtree = bgplatformBehind.create(3850, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformBehind.create(3680, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    // AVOID ENEMIES
    // Here we create the ledges.
    ledge = platforms.create(LEVEL_X_ORIGIN, WORLD_HEIGHT - 400, 'platform5');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 360, WORLD_HEIGHT - 330, 'platform1');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 750, WORLD_HEIGHT - 210, 'platform4');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 850, WORLD_HEIGHT - 330, 'platform5');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;

    ledge = platforms.create(LEVEL_X_ORIGIN + 1300, WORLD_HEIGHT - 450, 'platform3');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 1630, WORLD_HEIGHT - 290, 'platform2');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 2220, WORLD_HEIGHT - 310, 'platform4');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 2020, WORLD_HEIGHT - 390, 'platform1');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;

    ledge = platforms.create(LEVEL_X_ORIGIN + 2530, WORLD_HEIGHT - 290, 'platform5');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 3090, WORLD_HEIGHT - 160, 'platform4');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 3100, WORLD_HEIGHT - 410, 'platform1');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 3360, WORLD_HEIGHT - 320, 'platform3');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;

    ledge = platforms.create(LEVEL_X_ORIGIN + 3900, WORLD_HEIGHT - 200, 'platform1');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 4050, WORLD_HEIGHT - 300, 'platform4');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 4200, WORLD_HEIGHT - 400, 'platform1');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge = platforms.create(LEVEL_X_ORIGIN + 4500, WORLD_HEIGHT - 400, 'platform3');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
}

function setPlatformsInfront(){

    bgplatformInfront = game.add.group();

    // PLATFORMER
    bgplatformInfront.create(wallAB.x - 300, WORLD_HEIGHT - BUSH_HEIGHT + 100, 'bush');

    //treebg1
     // Here we create the background tree
     let bgtree = bgplatformInfront.create(203, game.world.height - 680, 'tree');
     bgtree.scale.setTo(0.65, 1);
     //Here we create the bush of the background tree
     let bush1 = bgplatformInfront.create(20, WORLD_HEIGHT - 760, 'bush');
     bush1.scale.setTo(0.75, 0.75);

     // Here we create the platforms of the game, tree branches
    //branch1
    let ledge = platforms.create(300, WORLD_HEIGHT - 180, 'groundr');
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;

    //branch to the left of the branch1
    ledge = platforms.create(140, WORLD_HEIGHT - 300, 'groundl');
    ledge.body.immovable = true;
    //branch2
    ledge = platforms.create(500, WORLD_HEIGHT - 300, 'groundl');
    ledge.body.immovable = true;

    //branch3
    ledge = platforms.create(705, WORLD_HEIGHT - 420, 'groundr');
    ledge.body.immovable = true;

    //branch4
    ledge = platforms.create(835, WORLD_HEIGHT - 540, 'groundl');
    ledge.body.immovable = true;

    //treebg3
    bgtree = bgplatformInfront.create(890, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformInfront.create(720, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    bgtree = bgplatformInfront.create(1020, game.world.height - 610, 'tree2');
    bgtree.scale.setTo(1.79, 1.79);

    //branch5
    ledge = platforms.create(1005, WORLD_HEIGHT - 650, 'groundr');
    ledge.body.immovable = true;

/*     //branch6
    ledge = platforms.create(1315, WORLD_HEIGHT - 600, 'groundr');
    ledge.body.immovable = true; */

    // MOVING PLATFORM
    movingPlat = game.add.sprite(1100, WORLD_HEIGHT - 650, 'platform4');
    game.physics.arcade.enable(movingPlat);
    movingPlat.body.immovable = true;
    movingPlat.body.velocity.x = 100;

    //treebg5
    bgtree = bgplatformInfront.create(1938, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformInfront.create(1768, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

/*     //branch7
    ledge = platforms.create(1425, WORLD_HEIGHT - 550, 'groundr');
    ledge.body.immovable = true; */

    //branch8
    ledge = platforms.create(1685, WORLD_HEIGHT - 450, 'groundr');
    ledge.body.immovable = true;
    //branch9
    ledge = platforms.create(2055, WORLD_HEIGHT - 550, 'groundr');
    ledge.body.immovable = true;

    //branch10
    ledge = platforms.create(2427, WORLD_HEIGHT - 620, 'groundr');
    ledge.body.immovable = true;
    //branch11
    ledge = platforms.create(2835, WORLD_HEIGHT - 460, 'groundr');
    ledge.body.immovable = true;

    //treebg7
    bgtree = bgplatformInfront.create(2723, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformInfront.create(2553, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //branch12
    ledge = platforms.create(3225, WORLD_HEIGHT - 550, 'groundr');
    ledge.body.immovable = true;
    //branch13
    ledge = platforms.create(3555, WORLD_HEIGHT - 620, 'groundr');
    ledge.body.immovable = true;

    //treebg9
    bgtree = bgplatformInfront.create(3440, game.world.height - 935, 'tree');
    bgtree.scale.setTo(0.77, 1.4);
    bush = bgplatformInfront.create(3270, WORLD_HEIGHT - BUSH_HEIGHT, 'bush');
    bush.scale.setTo(0.75, 0.75);

    //branch14
    ledge = platforms.create(3965, WORLD_HEIGHT - 610, 'groundr');
    ledge.body.immovable = true;
}

function updatePlay(){
    // Manage background music
    if(squirrel.x < LEVEL_X_ORIGIN && gameState === PLATFORMER){
     if (!music){
        soundMusic.play();
        soundMusic.loop = true;
        music = true;
    }
}
    if(squirrel.x > LEVEL_X_ORIGIN && gameState === AVOID_ENEMIES){
        soundMusic.stop();
        if (!music2){
            soundMusic2.play();
            soundMusic2.loop = true;
            music2 = true;
        }

    }

    if(squirrel.x > LEVEL_X_ORIGIN && gameState === NUT_CATCHER){
        soundMusic2.stop();
        if (!music3){
            soundMusic3.play();
            soundMusic3.loop = true;
            music3 = true;
        }

    }


    // Parallax effect for the background
    bg_back.x = game.camera.x * 0.5;
    bg_mid.x = game.camera.x * 0.425;
    bg_light.x = game.camera.x * 0.375;
    bg_front.x = game.camera.x * 0.3;


    // Check if squirrel has passed to the next part
    if(squirrel.x > LEVEL_X_ORIGIN && gameState === PLATFORMER){
        gameState = AVOID_ENEMIES;
        squirrel_initial_x = LEVEL_X_ORIGIN + 32;
        squirrel_initial_y = WORLD_HEIGHT - 500;
        game.camera.deadzone = new Phaser.Rectangle(300, 0, 200, 500);
    }
    
    if (squirrel.x > LEVEL_X_ORIGIN + 5300 && gameState === AVOID_ENEMIES){
        gameState = WORD_GAME;
        console.log(gameState);
        console.log(wordsFound);
        palabraActual = nuevaPalabra(misPalabras);
        scorePalabras = 0;
        rectBGwords.visible = true;
        foundTxt.visible = true;
        timeTxt.visible = true;
        scoreTxt.visible = true;
    }

    if(squirrel.x > LEVEL_X_ORIGIN + 5000 && gameState === NUT_CATCHER){
        game.camera.deadzone = new Phaser.Rectangle(0, 0, 0, 0);
    }



    //  Check collisions
    let hitPlatform = game.physics.arcade.collide(squirrel, platforms);
    let hitGround = game.physics.arcade.collide(squirrel, ground);
    let hitWall = game.physics.arcade.collide(squirrel, wallAB);
    let hitMovPlat = game.physics.arcade.collide(squirrel, movingPlat);

    if(gameState != WORD_GAME){
        //  Reset the players velocity (movement)
        squirrel.body.velocity.x = 0;

        if ((cursors.left.isDown && squirrel.x < LEVEL_X_ORIGIN + 5300 && gameState != NUT_CATCHER)
            || (cursors.left.isDown && squirrel.x > LEVEL_X_ORIGIN + 5370 && gameState == NUT_CATCHER)) {
            //  Move to the left, but don't allow to go back at some points
            squirrel.body.velocity.x = -SQUIRREL_VELOCITY;
            squirrel.animations.play('walk_left');
            toRight = false;
        } else if (cursors.right.isDown) {
            //  Move to the right
            squirrel.body.velocity.x = SQUIRREL_VELOCITY;
            squirrel.animations.play('walk_right');
            toRight = true;
        } else {
            //  Stand still
            squirrel.animations.stop();
            squirrel.frame = toRight? 7 : 6;
        }

        // Allow the player to jump if they are touching the ground and haven't used all of their jumps
        if(gameState == PLATFORMER && currentJump > 0){
            if (cursors.up.isDown && squirrel.body.touching.down && (hitPlatform || hitGround || hitWall || hitMovPlat)) {
                squirrel.body.velocity.y = -JUMP;
                squirrel.animations.stop();
                squirrel.frame = 1;
                soundJump.play();
                //The current jumps decreases by 1 if the player jumps
                currentJump = currentJump - 1;
                jumpsHUD.frame = currentJump;
                
            }   
            
            if(currentJump === 0){
                gameOver();
            }

            manageSign();
            manageMovingPlat();
        }
        // If we are in the second part, jump normally
        else if(gameState == AVOID_ENEMIES){
            if (cursors.up.isDown && squirrel.body.touching.down && (hitPlatform || hitGround || hitWall)) {
                squirrel.body.velocity.y = -JUMP;
                squirrel.animations.stop();
                squirrel.frame = 1;
                soundJump.play(); 
            }  
            // Move eagles and foxes
            eagles.forEachAlive(eaglesMovement, this);
            foxes.forEachAlive(foxesMovement, this);

            // Check collisions
            game.physics.arcade.overlap(squirrel,eagles, enemyHitsSquirrel,null,this);
            game.physics.arcade.overlap(squirrel,foxes, enemyHitsSquirrel,null,this);  
        }

        else if(gameState == NUT_CATCHER && squirrel.x > LEVEL_X_ORIGIN + 5360){

            if(firsNut){
                fallingNut.y = -50;
                fallingSpider.y = -50;
                firsNut = false;
            }

            console.log('spider Y:', fallingSpider.y);
            console.log('nut Y:', fallingNut.y);

            if(fallingNut.y < 0 && fallingSpider.y < 0){
                
                console.log(fallingNut.x, fallingNut.y);
                let ran = Math.random();
                console.log('ran:',ran);
                if(ran <= SPIDER_PROBABILITY){
                    fallingSpider.x = getRandomInt(LEVEL_X_ORIGIN + 5360, LEVEL_X_ORIGIN + 5360 + STAGE_WIDTH - fallingSpider.width);
                    fallingSpider.y = 50;
                    fallingSpider.body.velocity.y = 300;
                    console.log('genera araña');
                } else {
                    fallingNut.x = getRandomInt(LEVEL_X_ORIGIN + 5360, LEVEL_X_ORIGIN + 5360 + STAGE_WIDTH - fallingNut.width);
                    fallingNut.y = 50;
                    fallingNut.body.velocity.y = 300;   
                    console.log("generando nut");                 
                }

            }


            game.physics.arcade.overlap(squirrel, fallingNut, nutOrSpiderCaught, null, this);
            game.physics.arcade.overlap(squirrel, fallingSpider, nutOrSpiderCaught, null, this);

            if(fallingNut.y > STAGE_HEIGHT + squirrel.y + fallingNut.height) fallingNut.y = -50;
            if(fallingSpider.y > STAGE_HEIGHT + squirrel.y + fallingSpider.height) fallingSpider.y = -50;
        }
    }
    else {
        //  Reset the players velocity (movement) 
        squirrel.body.velocity.x = 0;
        squirrel.frame = toRight? 7 : 6;

        showVariables(word, wordsFound, palabraActual, scorePalabras, timeRemaining)

        if(timeRemaining < 1){
            palabraActual = nuevaPalabra(misPalabras);
            scorePalabras -= 100;
            timeRemaining = TIEMPO_PALABRAS;
            word = "";
        }     
    }
}

function manageMovingPlat(){
    if(movingPlat.x >= 1600){
        movingPlat.body.velocity.x = -100;
    } else if(movingPlat.x <= 1100){
        movingPlat.body.velocity.x = 100;

    }
}

function manageSign(){
    if(squirrel.x > sign.x - 50 && squirrel.x < sign.x + sign.width + 50 && squirrel.y > sign.y - sign.height - 50){
        rect.visible = true;
        signText.visible = true;
        signTextContainer.visible = true;
    } else {
        rect.visible = false;
        signText.visible = false;
        signTextContainer.visible = false;  
    }
}

function foxesMovement(fox){
    let foxHitGround = game.physics.arcade.collide(fox, ground);
    if(squirrel.y < WORLD_HEIGHT - 300 && (fox.x - squirrel.x) < 300 && squirrel.x < fox.x && fox.body.touching.down && foxHitGround){
        fox.body.velocity.y = -FOXES_VELOCITY_Y;
        foxCall.play();
        fox.animations.play('jump');
    }
    else if (fox.body.touching.down){
        fox.animations.play('walk');
    }
}

function eaglesMovement(eagle){
    if(eagle.body.y <= WORLD_HEIGHT - 600){
        eagle.body.velocity.y = 70;
    }
    else if(eagle.body.y >= WORLD_HEIGHT - 300){
        eagle.body.velocity.y = -70;
    }
}

function enemyHitsSquirrel(squirrel, enemy){

    cry.play();
    EnergyValue = Math.max(0, EnergyValue - 1);
    energyHUD.frame = EnergyValue;
    squirrel.body.x += enemy.width + 10;


    if (EnergyValue === 0){
        game.camera.fade(0xff0000, 500);
        game.camera.onFadeComplete.add(gameOver, this);
    } else {
        game.camera.flash(0xff0000, 500);
    }
}

function gameOver(){
    game.camera.resetFX();
    game.paused = true;
    gameOverImg = game.add.image(game.camera.centerX, game.camera.centerY - 80, 'gameOver');
    gameOverImg.anchor.setTo(0.5, 0.5);
    replayButton = game.add.button(gameOverImg.x, gameOverImg.y + gameOverImg.height + 50, 'playButton', restart);
    replayButton.anchor.setTo(0.5, 0.5);
    if(spacebarKey.justDown){
        restart();
    } 
}

function restart(){
    game.paused = false;
    squirrel.x = squirrel_initial_x;
    squirrel.y = squirrel_initial_y;
    replayButton.kill();
    gameOverImg.kill();

    if(gameState == PLATFORMER){
        currentJump = MAX_JUMPS;
        jumpsHUD.frame = currentJump;
    }else if(gameState == AVOID_ENEMIES){
        EnergyValue = 6;
        energyHUD.frame = EnergyValue;
        eagles.callAll('kill');
        foxes.callAll('kill');        
    }    
}

function endGame(){
    game.state.start('end');
}

/* function render(){
    platforms.forEachAlive(renderGroup, this);
}

function renderGroup(member) {   
     game.debug.body(member);
} */

function mostrarImagenPalabra(palabra){
    if(gameState == WORD_GAME){
        imagenPalabra.destroy();
        console.log(rectBGwords.x);
        imagenPalabra = game.add.sprite(rectBGwords.x + rectBGwords.width/2, rectBGwords.y + rectBGwords.height/2, palabra);
        //imagenPalabra.fixedToCamera = true;
        imagenPalabra.anchor.setTo(0.5, 0.5);
        //imagenPalabra.width = 100;
        //imagenPalabra.height = 100; 
    }   
}

function nuevaPalabra(palabras){
    //pillamos indice entre 0 y el tamaño del array de palabras y devuelve el contenido de ese indice de palabras
    palabraActual = "";

    //pillamos indice aleatorio entre 0 y el largo del array
    let randomIndex = getRandomInt(1, palabras.length) - 1

    //console.log("Estoy buscando una palabra.")
    //buscamos indice cuya palabra asociada no haya sido encontrada
    while (palabras[randomIndex][1]){
        randomIndex = getRandomInt(1, palabras.length) - 1
    }

    mostrarImagenPalabra(palabras[randomIndex][0]);

    //console.log(palabras);

    indicePalabra = randomIndex;
    //console.log(indicePalabra)

    return palabras[indicePalabra][0];
}

//función para conseguir un random entre min y max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//mostrar estado de variables por pantalla
function showVariables(word, found, pActual, score, time){
    wordText.destroy();
    wordFoundText.destroy();
    //palabraActualText.destroy();

    scorePalabrasText.destroy();

    timerTextPalabras.destroy();

    wordText = game.add.text(rectBGwords.x + rectBGwords.width/2, 150 + rectBGwords.y + rectBGwords.height/2, addSpaces(word, pActual), {
        fontSize: '20pt',
        font: font_time
    });
    //wordText.fixedToCamera = true;
    wordText.anchor.setTo(0.5, 0.5);
    wordText.stroke = '#000000';
    wordText.strokeThickness = 8;
    wordText.fill = '#ffffff';

    wordFoundText = game.add.text(150, 70, found, {
        fontSize: '20pt',
        font: font_time
    });
    wordFoundText.fixedToCamera = true;
    wordFoundText.anchor.setTo(0.5, 0.5);
    wordFoundText.stroke = '#000000';
    wordFoundText.strokeThickness = 8;
    wordFoundText.fill = '#ffffff';

    //palabraActualText = game.add.text(30, 90, "Palabra actual: " + pActual, {fill:'#000000'});
    //palabraActualText.fixedToCamera = true;
    // We don't want to show the answer
    
    timerTextPalabras = game.add.text(STAGE_WIDTH - 70, 50, String(time).padStart(2, "0"), {
        fontSize: '20pt',
        font: font_time
    });
    timerTextPalabras.fixedToCamera = true;
    timerTextPalabras.anchor.setTo(0.5, 0);
    timerTextPalabras.stroke = '#000000';
    timerTextPalabras.strokeThickness = 8;
    timerTextPalabras.fill = '#ffffff';


    scorePalabrasText = game.add.text(STAGE_WIDTH/2, 50, score, {
        fontSize: '20pt',
        font: font_time
    });
    scorePalabrasText.fixedToCamera = true;
    scorePalabrasText.anchor.setTo(0.5, 0);
    scorePalabrasText.stroke = '#000000';
    scorePalabrasText.strokeThickness = 8;
    scorePalabrasText.fill = '#ffffff';

}

//si hay una presion de tecla hace lo de la funcion
function keyPress(char){

    if(gameState == WORD_GAME){
        //charText.destroy();
        //charText = game.add.text(30, 120, "char: " + char.key, {fill:'#000000'});
        //charText.fixedToCamera = true;

        //console.log("Codigo: " + char.keyCode)
        //mientras que lo que escribe el jugador sea mas pequeño que la palabra dada va escibiendo
        if (word.length != palabraActual.length && char.keyCode != 13){ //enter no pulsado
            if (word.length < palabraActual.length && ((char.keyCode >= 65 && char.keyCode <= 90) || char.keyCode == 32)){
                word += char.key;
            }
            else if (word.length >= 0 && char.keyCode == 8) { //backspace
                word = word.slice(0, word.length-1);
            }
        }
        else {
            wordFound = palabraIgual(word, palabraActual)
            if (wordFound){
                wordsFound += 1;
                if(timeRemaining >= TIEMPO_PALABRAS/2){

                    //score si la palabra es bien y tiempo es fast
                    scorePalabras += 200;
                }
                else if(timeRemaining > 0){

                    //score si la palabra es bien y tiempo es slow
                    scorePalabras += 150;
                }
                misPalabras[indicePalabra][1] = true;
                correctSF.play();
            }
            //score si la palabra es mal
            else {
                wrongSF.play();
                scorePalabras -= 100;
            }
            word = "";
            timeRemaining = TIEMPO_PALABRAS;

            //comprobamos si hemos encontrado todas las palabras
            if (wordsFound == 1) endPalabras(); //if (wordsFound == misPalabras.length) endPalabras(); Test
            else palabraActual = nuevaPalabra(misPalabras);
        }
    }
}

function endPalabras(){
    //console.log("El juego ha acabado.")
    rectBGwords.destroy();
    imagenPalabra.destroy();
    scorePalabrasText.destroy();
    wordFoundText.destroy();
    wordText.destroy();
    timerTextPalabras.destroy();
    foundTxt.destroy();
    timeTxt.destroy();
    scoreTxt.destroy();

    game.physics.arcade.enable(fallingNut);
    game.physics.arcade.enable(fallingSpider);
    gameState = NUT_CATCHER;
}

function addSpaces(palabra, palabraCompleta){
    let palabraEspacios = "";
    for (i of palabra) palabraEspacios += (i + " ");
    for (i = 0; i< palabraCompleta.length - palabra.length; i++) palabraEspacios += " _";
    return palabraEspacios;
}

function palabraIgual(word1, word2){
    return (word1 == word2)
}

function updateCounter() {
    if(timeRemaining > 0 && gameState == WORD_GAME){
        timeRemaining--;
    }
}

function endNutCatcher(){
    gameState = END;
    endGame();
}

function nutOrSpiderCaught(squirrel, object){
    if(object === fallingNut){
        fallingNut.y = -50;
        scoreNut += 1;
        nutSnd.play();        
    } else if(object === fallingSpider){
        fallingSpider.y = -50;
        scoreNut = Math.max(scoreNut - 1, 0);
        cry.play();
        game.camera.flash(0xff0000, 500);
    }

    scoreNutHUD.setText("x"+scoreNut);
    

    if(scoreNut > 5){   //temporal
        endNutCatcher();
    }
}