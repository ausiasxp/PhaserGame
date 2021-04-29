
let initialState = {
    preload: loadAssets,
    create: displayScreen
};

function loadAssets(){
    game.load.image('bg', 'assets/images/parallax-forest.png');
    game.load.image('playImg', 'assets/images/button_play.png');
    game.load.image('aboutImg', 'assets/images/button_about.png');
}

function displayScreen(){
    game.input.enabled = true;
    game.add.image(0, 0, 'bg');

    showAuthors();
}

function showAuthors(){
    let msgAuthors = 'Ausias García Torres\nVanessa Jiménez Tarazona\nJosaem Silva Sanmiguel';
    let styleAuthors = {
        font: '12pt Sniglet',
        fill: '#FFFFFF'
    };

    game.add.text(125, game.world.height / 6 + 60, msgAuthors, styleAuthors);
}