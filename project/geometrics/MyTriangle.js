import { CGFobject } from '../../lib/CGF.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Triangle width
 * @param height - Triangle height
 */
export class MyTriangle extends CGFobject {
	constructor(scene, width, height) {
		super(scene);
		this.width = width;
		this.height = height;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			this.width/2, this.height, 0,	// 0
			0, 0, 0,						// 1
			this.width, 0, 0, 				// 2

			this.width/2, this.height, 0,	// 3
			0, 0, 0,						// 4
			this.width, 0, 0 				// 5
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
