import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';

/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - Number of divisions in both directions of the surface
 * @param minS - Minimum texture coordinate in S
 * @param maxS - Maximum texture coordinate in S
 * @param minT - Minimum texture coordinate in T
 * @param maxT - Maximum texture coordinate in T
*/
export class MyPlane extends CGFobject {
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);

		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1; // nrDivs = 1 if not provided
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;

		const texture = new CGFtexture(this.scene, 'images/plane.png')
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(0.44, 0.47, 0.18, 1.0);
        this.material.setEmission(0, 0, 0, 0);
        this.material.setShininess(10.0);
        this.material.setSpecular(0.87, 0.94, 0.36, 1.0);
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
		for (let j = 0; j <= this.nrDivs; j++) {
			xCoord = -0.5;
			for (let i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}

		let ind = 0;
		for (let j = 0; j < this.nrDivs; j++) {
			for (let i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() { 
		this.primitiveType = this.scene.gl.LINES;
	};

	display() {
		this.material.apply();
		super.display();
	}
}
