import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from '../lib/CGF.js';
import { MyPanorama } from './objects/simple/MyPanorama.js';
import { MyRockSet } from './objects/collection/MyRockSet.js';
import { MyGarden } from './objects/collection/MyGarden.js';
import { MyBee } from './objects/compound/MyBee.js';

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
		this.displayGarden = false;
		this.displayBee = true;
		this.animateBee = false;
		this.pyramidLevels = 4;
		this.nRocks = 6;
		this.gardenRows = 4;
		this.gardenCols = 3;

		// Initialize scene objects
		this.axis = new CGFaxis(this);

		this.panorama = new MyPanorama(this, new CGFtexture(this, 'images/panorama.jpg'));
		this.pyramid = new MyRockSet(this, true, this.pyramidLevels);
		this.rockSet = new MyRockSet(this, false, this.nRocks);
		this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
		this.bee = new MyBee(this, true);

		this.objects = [this.panorama, this.pyramid, this.rockSet, this.garden, this.bee];

		this.enableTextures(true);

		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);

		this.setUpdatePeriod(10);
		this.time = Date.now();
	}

	update() {
		const now = Date.now();
		const t = (now - this.time) / 1000;
		this.time = now;
		this.bee.update(t);
		this.checkKeys();
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
			this.rockSet.display();
			this.popMatrix();
		}

		if (this.displayGarden) {
			this.pushMatrix();
			this.translate(-30, 0, 10);
			this.garden.display();
			this.popMatrix();
		}

		if (this.displayBee) {
			this.bee.display();
		}
	}

	checkKeys() {
		if (this.gui.isKeyPressed("KeyW")) {
			this.bee.accelerate(1);
		}

		if (this.gui.isKeyPressed("KeyS")) {
			this.bee.accelerate(-1);
		}
	}
}
