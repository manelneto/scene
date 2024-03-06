import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
            for(let j = 0; j < this.slices; j++) {
                this.vertices.push(Math.cos(alpha * j), Math.sin(alpha * j), i / this.stacks);
                this.vertices.push(Math.cos((j + 1) * alpha), Math.sin((j + 1) * alpha), i / this.stacks);

				for (let k = 0; k < 2; k++) {
                	this.normals.push(Math.cos(alpha * j + alpha / 2), Math.sin(alpha * j + alpha / 2), 0);
				}
            }
        }

        for (let i = 0; i < 2 * this.slices * this.stacks; i += 2) {
            this.indices.push(i, i + 1, i + 1 + this.slices * 2);
            this.indices.push(i, i + 1 + this.slices * 2, i + this.slices * 2);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		
	}
}

