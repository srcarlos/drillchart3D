/*
 * Libreria para Crear Graficas en 3D
 *
 * Carlos Marcano
 * clmg1010@gmail.com
 *
 *
 */
var DrillChart3D = DrillChart3D || {};




DrillChart3D.container  = {};
DrillChart3D.scene  = {};
DrillChart3D.camera   = {};
DrillChart3D.renderer  = {};
DrillChart3D.controls  = {};
DrillChart3D.keyboard   = {};
DrillChart3D.clock  = {};
DrillChart3D.stats   = {};



DrillChart3D.splineHelperObjects || [];
DrillChart3D.splinePointsLength = 4;
DrillChart3D.positions = [];
DrillChart3D.options   = {};
DrillChart3D.spritey  = {};
DrillChart3D.objects = [];

DrillChart3D.CollectionRotation = [];
DrillChart3D.axesHeight = 1000;
DrillChart3D.viewPositions = {
    x: DrillChart3D.axesHeight * 1.5,
    y: DrillChart3D.axesHeight * 2.5,
    z: DrillChart3D.axesHeight * 2.5
};


DrillChart3D.ARC_SEGMENTS = 200;
DrillChart3D.INTERSECTED   = {};


DrillChart3D.pointXYZ = {
    x: 0,
    y: 0,
    z: 0
};
DrillChart3D.projector   = {};
DrillChart3D.mouse = {
        x: 0,
        y: 0
    },


DrillChart3D.splineMesh  = {};
DrillChart3D.splines   = {};
DrillChart3D.mesh   = {};
DrillChart3D.cube   = {};




DrillChart3D.init = function() {

    console.log('DrillChart3D VERSION 001-2016');

    // SCENE
    DrillChart3D.scene = new THREE.Scene();
    // CAMERA
    DrillChart3D.SCREEN_WIDTH = window.innerWidth;
    DrillChart3D.SCREEN_HEIGHT = window.innerHeight;


    DrillChart3D.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);



    DrillChart3D.VIEW_ANGLE = 45,
    DrillChart3D.ASPECT = DrillChart3D.SCREEN_WIDTH / DrillChart3D.SCREEN_HEIGHT,
    DrillChart3D.NEAR = 1,
    DrillChart3D.FAR = 20000;

    // POSITION
    DrillChart3D.camera = new THREE.PerspectiveCamera(DrillChart3D.VIEW_ANGLE, DrillChart3D.ASPECT, DrillChart3D.NEAR, DrillChart3D.FAR);


    DrillChart3D.scene.add(DrillChart3D.camera);
    DrillChart3D.camera.position.set(DrillChart3D.viewPositions.x*0.9, DrillChart3D.viewPositions.y*1.1, DrillChart3D.viewPositions.z*1.5);
    DrillChart3D.camera.position.set(3932, 4500, 5470);
    DrillChart3D.camera.lookAt(DrillChart3D.scene.position);


    // RENDERER
    if (Detector.webgl)
        DrillChart3D.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
    else
        DrillChart3D.renderer = new THREE.CanvasRenderer();
    DrillChart3D.renderer.setSize(DrillChart3D.SCREEN_WIDTH, DrillChart3D.SCREEN_HEIGHT);

    //CONTAINER
    DrillChart3D.container = document.getElementById('container');
    DrillChart3D.container.appendChild(DrillChart3D.renderer.domElement);


    // EVENTS
    THREEx.WindowResize(DrillChart3D.renderer, DrillChart3D.camera);
    THREEx.FullScreen.bindKey({
        charCode: 'm'.charCodeAt(0)
    });


    // SKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x0f0f0f0,
        side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    DrillChart3D.scene.add(skyBox);


    // CONTROLS
    DrillChart3D.controls = new THREE.OrbitControls(DrillChart3D.camera, DrillChart3D.renderer.domElement);




};





// Animate the elements
// For rendering
DrillChart3D.animate = function() {
    requestAnimationFrame(DrillChart3D.animate);
    DrillChart3D.render();
    DrillChart3D.update();

};
// Rendering function
DrillChart3D.render = function() {

    // For rendering
    DrillChart3D.renderer.autoClear = false;
    DrillChart3D.renderer.clear();
    DrillChart3D.renderer.render(DrillChart3D.scene, DrillChart3D.camera);
};

DrillChart3D.update = function() {


};


DrillChart3D.init();
DrillChart3D.animate();
