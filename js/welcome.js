
let initialState = {
    preload: loadAssets,
    create: displayScreen
};

function loadAssets(){
    game.load.image('bg', 'assets/images/parallax-forest.png');
}

function displayScreen(){
    game.add.image(0, 0, 'bg');
}