import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';

/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
*/
export class MyPlane extends CGFobject {
	constructor(scene) {
		super(scene);

		const texture = new CGFtexture(this.scene, 'images/grass.jpeg'); // TODO: BETTER TEXTURE
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.5, 1, 0, 1.0);
        this.material.setDiffuse(0.5, 1, 0, 1.0);
        this.material.setEmission(0, 0, 0, 0);
        this.material.setShininess(10.0);
        this.material.setSpecular(0.5, 1, 0, 1.0);
        this.material.setTexture(texture);

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
