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
    x: DrillChart3D.axesHeight,
    y: DrillChart3D.axesHeight,
    z: DrillChart3D.axesHeight
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




DrillChart3D.init = function(config) {

    console.log('DrillChart3D VERSION 001-2016');

    // SCENE
    DrillChart3D.scene = new THREE.Scene();
   

    if (config.fullScreen) {
      DrillChart3D.SCREEN_WIDTH = window.innerWidth;
      DrillChart3D.SCREEN_HEIGHT = window.innerHeight;
    }else {
        DrillChart3D.SCREEN_WIDTH = 300;
        DrillChart3D.SCREEN_HEIGHT = 300;
    }


     // CAMERA
    if (config.camera) {


        DrillChart3D.VIEW_ANGLE = 45,
        DrillChart3D.ASPECT = DrillChart3D.SCREEN_WIDTH / DrillChart3D.SCREEN_HEIGHT,
        DrillChart3D.NEAR = 1,
        DrillChart3D.FAR = 20000;

    } else {


        DrillChart3D.VIEW_ANGLE = 45,
        DrillChart3D.ASPECT = DrillChart3D.SCREEN_WIDTH / DrillChart3D.SCREEN_HEIGHT,
        DrillChart3D.NEAR = 1,
        DrillChart3D.FAR = 20000;


    }
      // POSITION
    DrillChart3D.camera = new THREE.PerspectiveCamera(DrillChart3D.VIEW_ANGLE, DrillChart3D.ASPECT, DrillChart3D.NEAR, DrillChart3D.FAR);





    DrillChart3D.scene.add(DrillChart3D.camera);
  //  DrillChart3D.camera.position.set(DrillChart3D.viewPositions.x, DrillChart3D.viewPositions.y, DrillChart3D.viewPositions.z);
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
    if (config.container) {
         DrillChart3D.container = document.getElementById(config.container);
         DrillChart3D.container.appendChild(DrillChart3D.renderer.domElement);
    } else {

    }
 
    


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

    if (config.axis){
         
          DrillChart3D.generatingAxis(DrillChart3D.axesHeight);
     };
   

   if (!'scatter'.localeCompare(config.type)) {
    DrillChart3D.chartPoints(DrillChart3D.scene,config.data); //example
   }

  
  DrillChart3D.animate();

};


// function to generating coordinates axis
DrillChart3D.generatingAxis = function(axesHeight) {



    // ejes de coordenadas
    if (axesHeight == undefined || axesHeight == null) axesHeight = 300;

    var axesPosition = {
        x: 0,
        y: 0,
        z: 0
    };
    var boxHeight = axesHeight / 8;
    DrillChart3D.axes = new THREE.AxisHelper(axesHeight);
    DrillChart3D.axes.position = axesPosition;
    DrillChart3D.scene.add(DrillChart3D.axes);

    DrillChart3D.gridXZ = new THREE.GridHelper(axesHeight, boxHeight);
    //  DrillChart3D.gridXZ.setColors(new THREE.Color(0x000000), new THREE.Color(0x000000));
    DrillChart3D.gridXZ.position.set(axesHeight, 0, axesHeight);
    DrillChart3D.scene.add(DrillChart3D.gridXZ);


    DrillChart3D.gridXY = new THREE.GridHelper(axesHeight, boxHeight);
    DrillChart3D.gridXY.position.set(axesHeight, axesHeight, 0);
    DrillChart3D.gridXY.rotation.x = Math.PI / 2;
    //  DrillChart3D.gridXY.setColors(new THREE.Color(0x000000), new THREE.Color(0x000000));
    DrillChart3D.scene.add(DrillChart3D.gridXY);

    DrillChart3D.gridYZ = new THREE.GridHelper(axesHeight, boxHeight);
    DrillChart3D.gridYZ.position.set(0, axesHeight, axesHeight);
    DrillChart3D.gridYZ.rotation.z = Math.PI / 2;
    //   DrillChart3D.gridYZ.setColors(new THREE.Color(0x000000), new THREE.Color(0x000000));
    DrillChart3D.scene.add(DrillChart3D.gridYZ);
};

// function to add points
DrillChart3D.addPointObject = function(scene, points) {
    var geometry = new THREE.CubeGeometry(10, 10, 10);
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        color: 0x000000
    }));

    object.material.ambient = object.material.color;
    object.castShadow = true;
    object.receiveShadow = true;

    for (var i = 0; i < points.length; i++) {
        console.log(points[i]);
        object.position.copy(points[i]);
        scene.add(object); // OJO
    }
};


// function to plot points
DrillChart3D.chartPoints = function(scene, a, color) {

    var points = [];
    var vector = {};

    if (color === undefined) color = 0x000000;
    var geometry = new THREE.SphereGeometry(15, 15, 15);
    var material = new THREE.MeshLambertMaterial({
        color: color
    });


    for (var i = 0; i < a.length; i++) {
        var object = new THREE.Mesh(geometry, material);
        var vector = new THREE.Vector3(a[i].x, a[i].y, a[i].z);
        object.position.copy(vector);
        points.push(vector);
        scene.add(object);
    }



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


