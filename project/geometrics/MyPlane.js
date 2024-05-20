import { CGFobject } from '../../lib/CGF.js';
import { MyUtils } from '../MyUtils.js';

/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
*/
export class MyPlane extends CGFobject {
	constructor(scene) {
		super(scene);

		this.material = MyUtils.createMaterial(scene, [0.5, 1, 0, 1.0], false, 'images/grass.jpeg');

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		let xCoord;
		let yCoord = 0.5;
		for (let j = 0; j < 2; j++) {
			xCoord = -0.5;
			for (let i = 0; i < 2; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(i, j);
				xCoord += 1;
			}
			yCoord -= 1;
		}

		let index = 0;
		for (let j = 0; j < 1; j++) {
			for (let i = 0; i <= 1; i++) {
				this.indices.push(index);
				this.indices.push(index + 2);
				index++;
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	display() {
		this.material.apply();
		super.display();
	}
}
