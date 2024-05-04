import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Cylinder radius
 * @param height - Cylinder height
 */
export class MyHive extends CGFobject {
	constructor(scene, radius, height) {
		super(scene);
		this.slices = 64;
		this.radius = radius;
		this.height = height;

		const texture = new CGFtexture(this.scene, 'images/hive.png');
        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.76, 0.6, 0.42, 1.0);
		this.material.setDiffuse(0.54, 0.27, 0.07, 1.0);
		this.material.setEmission(0, 0, 0, 0);
		this.material.setShininess(10.0);
		this.material.setSpecular(0.3, 0.15, 0.05, 1.0);
		this.material.setTexture(texture);

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let phi;		// angle with the XX axis, from 0 to 2PI
		let x, y, z;    // vertices coordinates
		for (let i = 0; i <= this.height; i++) {
			for (let slice = 0; slice <= this.slices; slice++) {
				phi = (2 * Math.PI) * (slice / this.slices);

				x = this.radius * Math.cos(phi);
				y = i;
				z = this.radius * Math.sin(phi);

				this.vertices.push(x, y, z);

				this.normals.push(x/this.radius, 0, z/this.radius);

				this.texCoords.push(slice / this.slices, 1 - i / this.height);
			}
		}

		let lower, upper;
        for (let i = 0; i < this.height; i++) {
			for (let slice = 0; slice <= this.slices; slice++) {
				lower = i * (this.slices + 1) + slice;
				upper = lower + this.slices + 1;

				this.indices.push(lower, upper, lower + 1);
				this.indices.push(upper, upper + 1, lower + 1);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers()
	}

	display() {
        this.material.apply();
        this.scene.pushMatrix();
        super.display();
        this.scene.popMatrix();
    }
}
