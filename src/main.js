var canvas;
var renderer, stage;
var stats;


var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var fileDir;
var spineNameList = [];

var spineList = [];

init();

function init() {

    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
        transparent: true,
    });
    canvas = renderer.view;
    var canvasBox = document.getElementById('canvasBox');
    canvasBox.appendChild(canvas)

    stage = new PIXI.Container();


    // STATS
    stats = new Stats();
    canvasBox.appendChild(stats.dom);


    function dragHandle(event) {
        event.preventDefault();
        if (event.type == "drop") {
            var files = event.dataTransfer.files;
            var info = files[0];

            fileDir = './assets/';
            spineNameList = [];

            fileDir += info.name;
            console.log(fileDir);
            loadConfig(fileDir, info.name);
        }
    }
    canvas.addEventListener("dragenter", dragHandle, false);
    canvas.addEventListener("dragover", dragHandle, false);
    canvas.addEventListener("drop", dragHandle, false);


    //test
    fileDir = './assets/';
    spineNameList = [];
    fileDir += 'tzclb.bundle';
    loadConfig(fileDir, 'tzclb.bundle');
}

function loadConfig(fileDir, infoName) {
    PIXI.loader.add(infoName, fileDir + '/config.json')

    PIXI.loader.load(function(loader, res) {
        console.log(res);
        var arr = res[infoName].data.param;
        console.log(arr);
        for (i in arr) {
            if (arr[i].spine) {
                if (arr[i].spine.spine_name) {
                    spineNameList.push(arr[i].spine.spine_name);
                }
            }
        }

        console.log(spineNameList);

        loadSpines();
    });
}

function loadSpines() {
    for (i in spineNameList) {
        PIXI.loader.add(spineNameList[i], fileDir + '/' + spineNameList[i] + '.json')
    }

    PIXI.loader.load(onAssetsLoaded);
}


function onAssetsLoaded(loader, res) {
    console.log(res);

    for (i in spineNameList) {
        var spine = createSpine(res, spineNameList[i]);
        spineList.push(spine);
        stage.addChild(spine);
    }

    animate();
}


function createSpine(res, name) {
    var spine = new PIXI.spine.Spine(res[name].spineData);

    var scale = Math.min(renderer.width/ spine.width, renderer.height/ spine.height);
    // var scale = 0.5;
    spine.scale.set(scale, scale);

    spine.position.x = renderer.width / 2;
    spine.position.y = renderer.height;

    // set up the mixes!
    // spine.stateData.setMix('walk', 'Jump', 0.2);
    // spine.stateData.setMix('Jump', 'walk', 0.4);

    // play animation
    // spine.state.setAnimation(0, 'walk', true);
    spine.state.setAnimation(0, 0, true);
    spine.state.timeScale = 1;

    return spine;
}



function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
    stats.update();
}