import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks, radius, height) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.radius = radius;
		this.height = height;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		var alpha = 2 * Math.PI/this.slices;

        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
				let x = Math.cos(alpha * j);
				let y = Math.sin(alpha * j);
				let z = (i / this.stacks) * this.height;

                this.vertices.push(x * this.radius, y * this.radius, z * this.radius);

                this.normals.push(x, y, 0);
            }
        }

        for (let i = 0; i < this.slices * this.stacks; i++) {
			if ((i + 1) % this.slices == 0) {
				this.indices.push(i, i + 1 - this.slices, i + 1);
				this.indices.push(i, i + 1, i + this.slices);
			} else {
				this.indices.push(i, i + 1, i + 1 + this.slices);
				this.indices.push(i, i + 1 + this.slices, i + this.slices);
			}
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		
	}
}

