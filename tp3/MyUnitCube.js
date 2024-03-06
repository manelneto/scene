import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			// Face de Cima
			0.5, 0.5, 0.5, 		// 0
			0.5, 0.5, -0.5, 	// 1 
			-0.5, 0.5, -0.5, 	// 2
			-0.5, 0.5, 0.5, 	// 3

			// Face de Baixo
			0.5, -0.5, 0.5,		// 4
			0.5, -0.5, -0.5,	// 5
			-0.5, -0.5, -0.5,	// 6
			-0.5, -0.5, 0.5,	// 7

			// Face da Esquerda
			-0.5, 0.5, -0.5,	// 8
			-0.5, 0.5, 0.5,		// 9
			-0.5, -0.5, 0.5,	// 10
			-0.5, -0.5, -0.5,	// 11

			// Face da Direita
			0.5, 0.5, -0.5,		// 12
			0.5, 0.5, 0.5,		// 13
			0.5, -0.5, 0.5,		// 14
			0.5, -0.5, -0.5,	// 15
			
			// Face da Frente
			0.5, 0.5, 0.5,		// 16
			-0.5, 0.5, 0.5,		// 17
			-0.5, -0.5, 0.5,	// 18
			0.5, -0.5, 0.5,		// 19

			// Face de Trás
			0.5, 0.5, -0.5,		// 20
			-0.5, 0.5, -0.5,	// 21
			-0.5, -0.5, -0.5,	// 22
			0.5, -0.5, -0.5,	// 23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
			4, 7, 6,
			6, 5, 4,
			8, 11, 10,
			10, 9, 8,
			12, 13, 14,
			14, 15, 12,
			16, 17, 18,
			18, 19, 16,
			20, 23, 22,
			22, 21, 20
		];

		this.normals = [
			// Face de Cima
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			// Face de Baixo
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			// Face da Esquerda
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// Face da Direita
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			
			// Face da Frente
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			// Face de Trás
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
