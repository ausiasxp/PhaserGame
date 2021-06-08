

function loadPlayAssetsAvoidEnemies(){
    loadSprites();
    loadImages();
    loadSounds();
}

function loadSprites() {
    game.load.spritesheet('eagleSpriteSheet', 'assets/images/bird_2_eagleSS.png', 84, 108);
    game.load.spritesheet('squirrelSpritesheet', 'assets/images/squirrel.png', 64, 52);
    game.load.spritesheet('foxSpritesheet', 'assets/images/fox.png', 160, 160);
    game.load.spritesheet('HUDenergy', 'assets/images/energyUI.png', 88, 64);
}

function loadImages(){
    game.load.image('bgGame', 'assets/images/parallax-forest.png');
    game.load.image('ground', 'assets/images/ground.png');
    game.load.image('fox', '/assets/images/fox.png');
    game.load.image('gameOver', 'assets/images/gameOver.png');
    game.load.image('playButton', 'assets/images/button_play.png');
    game.load.image('platform1', 'assets/images/platform1.png');
    game.load.image('platform2', 'assets/images/platform2.png');
    game.load.image('platform3', 'assets/images/platform3.png');
    game.load.image('platform4', 'assets/images/platform4.png');
    game.load.image('platform5', 'assets/images/platform5.png');
}

function loadSounds(){
    game.load.audio('foxCall', 'assets/sounds/fox.mp3');
}

function createPlayAvoidEnemies(){
    createEagles(EAGLES_GROUP_SIZE);
    createFoxes(FOXES_GROUP_SIZE);
}

function createEagles(number){
    eagles = game.add.group();
    eagles.enableBody = true;
    eagles.createMultiple(number, 'eagleSpriteSheet');
    eagles.callAll('animations.add', 'animations', 'fly', [0, 1, 2], 8, true);
    eagles.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);    
    eagles.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    eagles.setAll('checkWorldBounds', true);

    currentEagleProbability = EAGLE_PROBABILITY;
    currentEagleVelocity = EAGLE_VELOCITY;
        game.time.events.loop(TIMER_RYTHM, activateEagle, this);

}

function activateEagle(){
    if(gameState == AVOID_ENEMIES){
        if(Math.random() < currentEagleProbability){
            let eagle = eagles.getFirstExists(false);
            if(eagle){
                let gh = STAGE_HEIGHT;
                let uh = eagle.body.height;
                let h = gh - uh;
                let y = Math.floor(Math.random()*h);
                let z = uh / 2 + y;
                let x = Math.max(squirrel.body.x + STAGE_WIDTH/2, STAGE_WIDTH);
                eagle.reset(x, z);
                eagle.body.velocity.x = -currentEagleVelocity;
                let velY = Math.round(Math.random()) == 1? 70 : -70;
                eagle.body.velocity.y = velY;
                eagle.animations.play('fly');
            }
        }        
    }

}

function createFoxes(number){
    foxes = game.add.group();
    foxes.enableBody = true;
    foxes.createMultiple(number, 'foxSpritesheet');
    foxes.callAll('animations.add', 'animations', 'walk', [26, 27, 28, 29 ,30, 31, 32, 33], 8, true);
    foxes.callAll('animations.add', 'animations', 'jump', [42, 43, 44], 3, false);
    foxes.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resetMember);

    // Adjust bounding box
    foxes.callAll('body.setSize', 'body', 100, 80, 30, 80);

    // Add Physics
    game.physics.arcade.enable(foxes);
    foxes.setAll('body.gravity.y', GRAVITY);

    foxes.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
    foxes.setAll('body.checkWorldBounds', true);
    game.time.events.loop(TIMER_RYTHM, activateFoxes, this);

}

function resetMember(item){
    item.kill();
}

function activateFoxes(){
    if(gameState == AVOID_ENEMIES){
        if(Math.random() < FOXES_PROBABILITY){
            let fox = foxes.getFirstExists(false);
            if(fox){
                let x = Math.max(squirrel.body.x + STAGE_WIDTH/2, STAGE_WIDTH);
                fox.reset(x, WORLD_HEIGHT - 80);
                fox.body.velocity.x = -FOXES_VELOCITY;
                //fox.body.velocity.y = -FOXES_VELOCITY_Y;
                fox.animations.play('walk');
            }
        }        
    }

}
