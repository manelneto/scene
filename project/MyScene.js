import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from '../lib/CGF.js';
import { MyPlane } from './geometrics/MyPlane.js'
import { MyPanorama } from './objects/simple/MyPanorama.js';
import { MyRockSet } from './objects/collection/MyRockSet.js';
import { MyGarden } from './objects/collection/MyGarden.js';
import { MyBee } from './objects/compound/MyBee.js';
import { MyHive } from './objects/simple/MyHive.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
	constructor() {
		super();
	}

	init(application) {
		super.init(application);

		this.initCameras();
		this.initLights();
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		// Objects connected to MyInterface
		this.displayAxis = false;
		this.displayNormals = false;
		this.displayPlane = true;
		this.displayPanorama = true;
		this.displayPyramid = true;
		this.displayRocks = true;
		this.displayGarden = true;
		this.displayBee = true;
		this.moveBee = true;
		this.displayPollen = true;
		this.displayHive = true;
		this.pyramidLevels = 4;
		this.nRocks = 6;
		this.gardenRows = 4;
		this.gardenCols = 3;
		this.speedFactor = 1;
		this.scaleFactor = 1;
		this.hiveRadius = 3;
		this.hiveHeight = 9;

		// Initialize scene objects
		this.axis = new CGFaxis(this);
		this.plane = new MyPlane(this, 30);

		this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama.jpg'));
		this.pyramid = new MyRockSet(this, true, this.pyramidLevels, 0);
		this.rockSet = new MyRockSet(this, false, this.nRocks);
		this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
		this.bee = new MyBee(this);
		this.hive = new MyHive(this, this.hiveRadius, this.hiveHeight);
		this.hivePyramid = new MyRockSet(this, true, this.pyramidLevels, 3);

		this.hiveX = -20;
		this.hiveY = this.pyramidLevels * 2;
		this.hiveZ = -20;

		this.objects = [this.panorama, this.pyramid, this.rockSet, this.garden, this.bee, this.hive];

		this.enableTextures(true);

		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);

		this.setUpdatePeriod(10);
		this.time = Date.now();
	}

	update() {
		if (this.moveBee) {
			const t = (Date.now() - this.time) / 1000;
			this.bee.update(t);
			this.checkKeys();
		}
	}

	initLights() {
		this.lights[0].setPosition(15, 0, 5, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();
		this.lights[0].update();
	}

	initCameras() {
		this.camera = new CGFcamera(
			1.5,
			0.1,
			1000,
			vec3.fromValues(50, 10, 15),
			vec3.fromValues(0, 0, 0)
		);
	}

	setDefaultAppearance() {
		this.setAmbient(0.2, 0.4, 0.8, 1.0);
		this.setDiffuse(0.2, 0.4, 0.8, 1.0);
		this.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.setShininess(10.0);
	}

	updatePyramid() {
		this.pyramid = new MyRockSet(this, true, this.pyramidLevels, 0);
	}

	updateRocks() {
		this.rockSet = new MyRockSet(this, false, this.nRocks);
	}

	updateGarden() {
		this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
	}

	display() {
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.updateProjectionMatrix();
		this.loadIdentity();
		this.applyViewMatrix();

		// Draw axis
		if (this.displayAxis)
			this.axis.display();

		// Draw normals
		if (this.displayNormals)
			this.objects.forEach((object) => object.enableNormalViz());
		else
			this.objects.forEach((object) => object.disableNormalViz());

		if (this.displayPlane) {
			this.pushMatrix();
			this.scale(100, 100, 100);
			this.rotate(-Math.PI/2, 1, 0, 0);
			this.plane.display();
			this.popMatrix();
		}

		// Draw objects
		if (this.displayPanorama) {
			this.panorama.display();
		}

		if (this.displayPyramid) {
			this.pushMatrix();
			this.translate(-35, 2 * this.pyramidLevels, 35);
			this.pyramid.display();
			this.popMatrix();
		}

		if (this.displayRocks) {
			this.pushMatrix();
			this.translate(20, 2, -20);
			this.scale(2, 2, 2);
			this.rockSet.display();
			this.popMatrix();
		}

		if (this.displayGarden) {
			this.pushMatrix();
			//this.translate(-30, 0, 10); TODO: falar sobre isto
			this.garden.display();
			this.popMatrix();
		}

		if (this.displayBee) {
			this.pushMatrix();
			this.bee.display();
			this.popMatrix();
		}

		if (this.displayHive) {
			this.pushMatrix();
			this.translate(this.hiveX, this.hiveY, this.hiveZ);
			this.pushMatrix();
			this.rotate(Math.PI/4, 0, 1, 0);
			this.hive.display();
			this.popMatrix();
			this.hivePyramid.display();
			this.popMatrix();
		}
	}

	checkKeys() {
		if (this.gui.isKeyPressed("KeyW")) {
			this.bee.accelerate(1 * this.speedFactor);
		}

		if (this.gui.isKeyPressed("KeyS")) {
			this.bee.accelerate(-1 * this.speedFactor);
		}

		if (this.gui.isKeyPressed("KeyA")) {
			this.bee.turn(Math.PI/16);
		}

		if (this.gui.isKeyPressed("KeyD")) {
			this.bee.turn(-Math.PI/16);
		}

		if (this.gui.isKeyPressed("KeyR")) {
			this.bee.reset();
		}

		if (this.gui.isKeyPressed("KeyF")) {
			this.bee.descend();
		}

		if (this.gui.isKeyPressed("KeyP")) {
			this.bee.ascend();
		}

		if (this.gui.isKeyPressed("KeyO")) {
			this.bee.deliver(this.hiveX, this.hiveY + this.hiveHeight/2, this.hiveZ, this.hiveRadius);
		}
	}

	resetTime() {
		this.time = Date.now();
	}
}
