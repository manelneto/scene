import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from '../lib/CGF.js';
import { MyPanorama } from './objects/simple/MyPanorama.js';
import { MyRockSet } from './objects/collection/MyRockSet.js';
import { MyGarden } from './objects/collection/MyGarden.js';
import { MyBee } from './objects/compound/MyBee.js';
import { MyPollen } from './objects/simple/MyPollen.js';
import { MyCircle } from './geometrics/MyCircle.js';

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
		this.displayPanorama = true;
		this.displayPyramid = true;
		this.displayRocks = true;
		this.displayGarden = true;
		this.displayBee = true;
		this.moveBee = true;
		this.pyramidLevels = 4;
		this.nRocks = 6;
		this.gardenRows = 4;
		this.gardenCols = 3;
		this.speedFactor = 1;
		this.scaleFactor = 1;

		// Initialize scene objects
		this.axis = new CGFaxis(this);

		this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama.jpg'));
		this.pyramid = new MyRockSet(this, true, this.pyramidLevels);
		this.rockSet = new MyRockSet(this, false, this.nRocks);
		this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
		this.bee = new MyBee(this, true);
		this.pollen = new MyPollen(this, 1, 2);

		//TODO
		this.circle = new MyCircle(this, 32, 1);

		this.objects = [this.panorama, this.pyramid, this.rockSet, this.garden, this.bee, this.pollen, this.circle];

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

	updatePyramidLevels() {
		this.pyramid = new MyRockSet(this, true, this.pyramidLevels);
	}

	updateNRocks() {
		this.rockSet = new MyRockSet(this, false, this.nRocks);
	}

	updateGardenRows() {
		this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
	}

	updateGardenCols() {
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

		// Draw objects
		if (this.displayPanorama) {
			this.panorama.display();
		}

		if (this.displayPyramid) {
			this.pushMatrix();
			this.translate(-50, 0, 50);
			this.pyramid.display();
			this.popMatrix();
		}

		if (this.displayRocks) {
			this.pushMatrix();
			this.translate(-10, -20, 50);
			this.scale(2, 2, 2);
			//this.rockSet.display();
			this.popMatrix();
		}

		if (this.displayGarden) {
			this.pushMatrix();
			this.translate(-30, 0, 10);
			//this.garden.display();
			this.popMatrix();
		}

		if (this.displayBee) {
			this.pushMatrix();
			this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
			//this.bee.display();
			this.popMatrix();
		}

		//this.pollen.display();
		this.circle.display();
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
			this.bee.deliver();
		}
	}

	resetTime() {
		this.time = Date.now();
	}
}
