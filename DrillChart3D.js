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


