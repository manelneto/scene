import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		var alpha = 2 * Math.PI/this.slices;

        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                this.vertices.push(Math.cos(alpha * j), Math.sin(alpha * j), i / this.stacks);

                this.normals.push(Math.cos(alpha * j), Math.sin(alpha * j), 0);
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

