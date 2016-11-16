var canvasBox;
var renderer, stage;


var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var fileDir = './assets/';
var spineNameList = [];

var spineList = [];

init();

function init() {
    renderer = PIXI.autoDetectRenderer(600, 800);
    canvasBox = document.getElementById('canvasBox').appendChild(renderer.view);

    stage = new PIXI.Container();

    function dragHandle(event) {
        event.preventDefault();
        if(event.type == "drop") {
            var files = event.dataTransfer.files;
            var info = files[0];

            console.log(info);
            fileDir +=info.name;
            console.log(fileDir);
            loadConfig(fileDir);
        }
    }
    canvasBox.addEventListener("dragenter", dragHandle, false);
    canvasBox.addEventListener("dragover", dragHandle, false);
    canvasBox.addEventListener("drop", dragHandle, false);
}

function loadConfig(fileDir) {
    PIXI.loader.add('config', fileDir + '/config.json')

    PIXI.loader.load(function(loader, res)
    {
        console.log(res);
        var arr=res.config.data.param;
        console.log(arr);
        for(i in arr)
        {
            if(arr[i].spine)
            {
                if(arr[i].spine.spine_name)
                {
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
        PIXI.loader.add(spineNameList[i], fileDir +'/'+ spineNameList[i] + '.json')
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

    spine.position.x = renderer.width / 2;
    spine.position.y = renderer.height *3/4;

    var scale = Math.min((renderer.width * 0.7) / spine.width, (renderer.height * 0.7) / spine.height);
    // var scale = 0.5;
    spine.scale.set(scale, scale);


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
}