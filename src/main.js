var renderer, stage;


var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var spineBoy = null;



init();

function init() {
    renderer = PIXI.autoDetectRenderer(600, 600);
    document.getElementById('canvasBox').appendChild(renderer.view);

    stage = new PIXI.Container();

    // load spine data
    PIXI.loader
        // .add('spineBoy', './assets/spine/renlianshibie_qiutian.json')
        .add('spineBoy', './assets/spine/raptor.json')
        .load(onAssetsLoaded);
}


function onAssetsLoaded(loader, res) {
    spineBoy = new PIXI.spine.Spine(res.spineBoy.spineData);

    spineBoy.position.x = renderer.width / 2;
    spineBoy.position.y = renderer.height;

    var scale = Math.min((renderer.width * 0.7) / spineBoy.width, (renderer.height * 0.7) / spineBoy.height);
    spineBoy.scale.set(scale, scale);


    // set up the mixes!
    // spineBoy.stateData.setMix('walk', 'Jump', 0.2);
    // spineBoy.stateData.setMix('Jump', 'walk', 0.4);

    // play animation
    spineBoy.state.setAnimation(0, 2, true);
    spineBoy.state.timeScale = 1;

    stage.addChild(spineBoy);

    animate();
}



function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}