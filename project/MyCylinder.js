import { CGFobject } from '../lib/CGF.js';

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Cylinder radius
 * @param height - Cylinder height
 */
export class MyCylinder extends CGFobject {
	constructor(scene, radius, height) {
		super(scene);
		this.slices = 64;
		this.radius = radius;
		this.height = height;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

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
}
