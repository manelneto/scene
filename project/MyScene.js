import { CGFscene, CGFcamera, CGFaxis, CGFtexture } from '../lib/CGF.js';
import { MyPanorama } from './MyPanorama.js';
import { MyRockSet } from './MyRockSet.js';

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

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Initialize scene objects
    this.axis = new CGFaxis(this);

    const panoramaTexture = new CGFtexture(this, 'images/panorama.jpg');
    this.panorama = new MyPanorama(this, panoramaTexture);

    this.pyramid = new MyRockSet(this, true, 4);
    this.rockSet = new MyRockSet(this, false, 6);

    this.objects = [this.panorama, this.pyramid, this.rockSet];

    // Objects connected to MyInterface
    this.displayAxis = false;
    this.displayNormals = false;

    this.enableTextures(true);
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

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis)
        this.axis.display();

    // Draw normals
    if (this.displayNormals)
		this.objects.forEach((object) => object.enableNormalViz());
    else
		this.objects.forEach((object) => object.disableNormalViz());

    // ---- BEGIN Primitive drawing section
    
	this.panorama.display();

	this.pushMatrix();
	this.translate(-50, 0, 50); // TODO
	this.pyramid.display();
	this.popMatrix();
	
	this.pushMatrix();
	this.translate(-10, -20, 50); // TODO
	this.scale(2, 2, 2);
	this.rockSet.display();
	this.popMatrix();


    this.myFlower.display();
    

    // ---- END Primitive drawing section
  }
}
