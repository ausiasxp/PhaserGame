const VICTORY_POINTS = 500;
const TOTAL_STARS = 12;

let playState = {
    preload: loadAssets,
    create: initialiseGame,
    update: gameUpdate
};

let platforms;
let bgplatform;
let player;
let cursors;
let stars;
let bombs;
let score = 0;
let scoreText;
let numStars;
let gameOver = false;
let victoryAtEnd;
let soundVictory;
let soundDefeat;
const WORLD_WIDTH = 2500
const WORLD_HEIGHT = 800


//game.state.add('play', playState);
//game.state.add('final', finalState);

//game.state.start('play');

// methods
/**
 * Load the assets
 */
function loadAssets() {
    game.load.image('sky', 'assets/images/sky.png');
    game.load.image('ground', 'assets/images/ground.png');
    game.load.image('groundr', 'assets/images/platform.png');
    game.load.image('groundl', 'assets/images/platformleft.png');
    game.load.image('star', 'assets/images/star.png');
    game.load.image('tree', 'assets/images/tree3.png');
    game.load.image('tree2', 'assets/images/tree2.png');
    game.load.image('bush', 'assets/images/bush.png');
    //game.load.image('bomb', 'assets/images/bomb.png');
    game.load.spritesheet('dude', 'assets/images/dude.png', 32, 36);
    //game.load.audio('victory', 'assets/snds/victoryCry.wav');
    //game.load.audio('defeat', 'assets/snds/defeated.wav');
}

/**
 * Initialise the stage
 */
function initialiseGame() {

    // initial value for numStars
    numStars = TOTAL_STARS;
    console.log("created");

    // Set World bounds (same size as the image background in this case)
    game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    console.log(game.world.width);
    // Background
    let bg = game.add.sprite(0, 0, 'sky');
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    //let sky = game.add.sprite(0, 0, 'sky');
    bg.width = game.world.width;
    bg.height = game.world.height;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    
    // Here we create the ground.

    //ground1
    let ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(1, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    for (let i = 0; i < 2250; i= i+450) {
    //ground2
    ground = platforms.create(600 +i, game.world.height - 64, 'ground');
    ground.scale.setTo(0.75, 0.75);
    ground.body.immovable = true;

    }

    //ground5
    ground = platforms.create(2275, game.world.height - 300, 'ground');
    ground.scale.setTo(0.5, 0.5);
    ground.body.immovable = true;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    bgplatform = game.add.group();

    //  We will enable physics for any object that is created in this group
    bgplatform.enableBody = true;

     // Here we create the ground.
     let bgground = bgplatform.create(195, game.world.height - 515, 'tree');

     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
     bgground.scale.setTo(0.5, 0.75);

     //  This stops it from falling away when you jump on it
     bgground.body.immovable = true;

    console.log(game.world);
    //  Now let's create two ledges
    //branch1
    let ledge = platforms.create(135, 684, 'groundl');
    ledge.body.immovable = true;

    //ledge = platforms.create(130, 684, 'tree');
    //ledge.body.immovable = true;
    bgground = bgplatform.create(435, game.world.height - 515, 'tree');
    bgground.scale.setTo(0.5, 0.75);

    //branch2
    ledge = platforms.create(260, 640, 'groundr');
    ledge.body.immovable = true;
    //branch3
    ledge = platforms.create(380, 600, 'groundl');
    ledge.body.immovable = true;

    //branch4
    ledge = platforms.create(510, 550, 'groundr');
    ledge.body.immovable = true;

    //branch4left1
    ledge = platforms.create(510, 330, 'groundr');
    ledge.body.immovable = true;

    //branch4left2
    ledge = platforms.create(440, 250, 'groundr');
    ledge.body.immovable = true;

    let bush = platforms.create(0, 175, 'bush');
    bush.body.immovable = true;
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    bush.scale.setTo(0.75, 0.6);

    //branch5
    ledge = platforms.create(630, 475, 'groundl');
    ledge.body.immovable = true;

    let bgground2 = bgplatform.create(670, game.world.height - 450, 'tree2');

     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
     bgground2.scale.setTo(1.25, 1.25);

    //branch6
    ledge = platforms.create(690, 390, 'groundl');
    ledge.body.immovable = true;
    //branch7
    ledge = platforms.create(780, 345, 'groundl');
    ledge.body.immovable = true;
     //branch8
     ledge = platforms.create(910, 375, 'groundr');
     ledge.body.immovable = true;
    //branch9
    ledge = platforms.create(975, 450, 'groundr');
    ledge.body.immovable = true;
    //branch10
    ledge = platforms.create(1125, 475, 'groundl');
    ledge.body.immovable = true;
    //backgroundtree3
    bgground = bgplatform.create(1175, game.world.height - 600, 'tree');
    bgground.scale.setTo(1.25, 1);
    //branch10
    ledge = platforms.create(1350, 575, 'groundr');
    ledge.body.immovable = true;
    //branch11
    ledge = platforms.create(1500, 500, 'groundr');
    ledge.body.immovable = true;

    //branch12
    ledge = platforms.create(1650, 450, 'groundr');
    ledge.body.immovable = true;
    //branch13
    ledge = platforms.create(1800, 575, 'groundr');
    ledge.body.immovable = true;

    //branch14
    ledge = platforms.create(2000, 525, 'groundr');
    ledge.body.immovable = true;
    //branch14
    ledge = platforms.create(2200, 500, 'groundr');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    // Same with bombs
    bombs = game.add.group();
    bombs.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < numStars; i++) {
        //  Create a star inside of the 'stars' group
        let star = stars.create(i * 250, 100, 'star');
        //  Let gravity do its thing
        star.body.gravity.y = 300;
        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.2 + Math.random() * 0.2;
    }
    for (let i = 0; i < 7; i++) {
    let star2 = stars.create(i *65, 100, 'star');
    //  Let gravity do its thing
    star2.body.gravity.y = 300;
    //  This just gives each star a slightly random bounce value
    star2.body.bounce.y = 0.5 + Math.random() * 0.2;
    }

    // The score
    scoreText = game.add.text(16, 16, 'Score: ' + score, {
        fontSize: '32px',
        fill: '#000'
    });

    // Sounds
    soundVictory = game.add.audio('victory');
    soundDefeat = game.add.audio('defeat');

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(player);
}
function createLevel() {
    console.log("created");

    console.log(game.world.width);
    // Set World bounds (same size as the image background in this case)
    game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    console.log(game.world.width);
    // Background
    let bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bgGame');
    // Smooth scrolling of the background in both X and Y axis
    bg.scrollFactorX = 0.7;
    bg.scrollFactorY = 0.7;

    // Collide with this image to exit level
    platforms = game.add.group();

    platforms.enableBody = true;

    // Create ground and platforms (with enemies, stars and aids) according to JSON data
    // Be aware that enemies ara not in a group. Each enemy is an instance and is stored in the array enemies
    createGround();

    createPlatforms();

    // Now, set time and create the HUD
    remainingTime = secondsToGo;
    createHUD();

    // Create player. Initial position according to JSON data
    player = game.add.sprite(levelConfig.collectorStart.x, game.world.height -
        levelConfig.collectorStart.y, 'collector');

        console.log("Player: ", player)

    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = BODY_GRAVITY;
    player.body.collideWorldBounds = true;

    // Camera follows the player inside the world
    game.camera.follow(player);

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    // Update elapsed time each second
    timerClock = game.time.events.loop(Phaser.Timer.SECOND, updateTime, this);
}
/**
 * Game loop: update elements and check events
 */
function gameUpdate() {
    //  If game is already over do nothing
    if (gameOver) {
        return;
    }
    //  Collide the player, the stars and the bombs with the platforms
    let hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the
    //  collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // Same with bombs
    game.physics.arcade.overlap(player, bombs, hitBomb, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }

    // Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -325;
    }
}

function collectStar(player, star) {
    // Removes the star from the screen
    star.kill();
    numStars--;
    // Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

    // If there are no more stars, reset them and drop a bomb
    if (numStars === 0) {
        stars.forEachDead(function (s) {
            s.revive();
            s.y = 0;
        });
        numStars = TOTAL_STARS;
        let x = (player.x < 400) ? Phaser.Math.between(400, 800) : Phaser.Math.between(0, 400);
        let bomb = bombs.create(x, 16, 'bomb');
        bomb.body.bounce.x = bomb.body.bounce.y = 1;
        bomb.body.collideWorldBounds = true;
        bomb.body.velocity.x = Phaser.Math.between(-200, 200);
        bomb.body.velocity.y = 200;
        bomb.body.allowGravity = false;
    }

    // check if the player wins
    if (score > VICTORY_POINTS) {
        victoryAtEnd = true;
        endGame();
    }
}

function hitBomb(player, bomb) {
    player.tint = 0xff0000;
    victoryAtEnd = false;
    endGame();
}

function endGame() {
    // Game Over
    gameOver = true;

    // Stop and reset input
    game.input.enabled = false;
    cursors.left.reset(true);
    cursors.right.reset(true);
    cursors.up.reset(true);
    cursors.down.reset(true);

    // Stop player
    player.animations.stop();
    player.frame = 4;
    player.body.velocity.x = player.body.velocity.y = 0;
    player.body.bounce.y = 0;
    player.body.gravity.y = 0;

    // Cleaning...
    stars.removeAll(true);
    bombs.removeAll(true);

    // Final animation (a tween)
    let finalTween = game.add.tween(player.scale).to({
            x: 2,
            y: 2
        }, 1000,
        Phaser.Easing.Cubic.Out, true, 0, 2, true);

    finalTween.onComplete.add(function () {
        player.destroy();
        platforms.removeAll(true);
        game.state.start('final');
    });

    if (victoryAtEnd) {
        soundVictory.play();
    } else {
        soundDefeat.play();
    }
}