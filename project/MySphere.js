import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, isInverted, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.isInverted = isInverted;
		this.radius = radius;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];

        let phi, theta;
        let x, y, z;
        for (let stack = 0; stack <= this.stacks; stack++) {
            phi = Math.PI * stack / this.stacks; 	
            for (let slice = 0; slice <= this.slices; slice++) {
                theta = 2 * Math.PI * slice / this.slices; 
                x = Math.sin(phi) * Math.cos(theta);
                y = Math.cos(phi);
                z = Math.sin(phi) * Math.sin(theta);
                this.vertices.push(x * this.radius, y * this.radius, z * this.radius);

                let magnitude = Math.sqrt(x * x + y * y + z * z); // TODO

				if (this.isInverted) {
					this.normals.push(-(x / magnitude), -(y / magnitude), -(z / magnitude));
				} else {
					this.normals.push(x / magnitude, y / magnitude, z / magnitude);
				}

				let u = 1 - (slice / this.slices);
				let v = stack / this.stacks;
				this.texCoords.push(u, v);
            }
        }

        for (let stack = 0; stack <= this.stacks; stack++) {
            for (let slice = 0; slice <= this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

				if (this.isInverted) {
					this.indices.push(first, second, first + 1);
					this.indices.push(second, second + 1, first + 1);
				} else {
					this.indices.push(first + 1, second, first);
					this.indices.push(first + 1, second + 1, second);
				}
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}