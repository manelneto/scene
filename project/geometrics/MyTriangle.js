import { CGFobject } from '../../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - Triangle height
 */
export class MyTriangle extends CGFobject {
	constructor(scene, height) {
		super(scene);
		this.height = height;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, this.height, 0,	// 0
			0, 0, 0,				// 1
			1, 0, 0, 				// 2

			0.5, this.height, 0,	// 3
			0, 0, 0,				// 4
			1, 0, 0 				// 5
		];

		this.indices = [
			0, 1, 2,

			5, 4, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [	
			0, 1,
			0.5, 1,
			0, 0.5,

			0, 1,
			0.5, 1,
			0, 0.5,
		];


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
