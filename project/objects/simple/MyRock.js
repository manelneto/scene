import { CGFobject } from '../../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
    constructor(scene) {
        super(scene);
        this.stacks = 8;
        this.slices = 8;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];

        let phi;        // angle with the YY axis, from -PI/2 to PI/2
        let theta;      // angle with the XX axis, from 0 to 2PI
        let x, y, z;    // vertices coordinates
        let u, v;       // texture coordinates
        let r;          // random factor, from -0.1 to 0.1
        for (let stack = -this.stacks; stack <= this.stacks; stack++) {
            phi = (Math.PI / 2) * (stack / this.stacks);
            for (let slice = 0; slice <= this.slices; slice++) {
                r = (slice > 0 && slice < this.slices) ? (Math.random() * 2 - 1) / 10 : 0;

                theta = (2 * Math.PI) * (slice / this.slices);

                x = Math.cos(phi) * Math.cos(theta);
                y = Math.sin(phi);
                z = Math.cos(phi) * Math.sin(theta);
                
                this.vertices.push(x + r, y + r, z + r);

				this.normals.push(x, y, z);

                u = 1 - (slice / this.slices);
				v = 1/2 - (stack / (2 * this.stacks));
				this.texCoords.push(u, v);
            }
        }

        let lower, upper;
        for (let stack = 0; stack <= 2 * this.stacks; stack++) {
            for (let slice = 0; slice <= this.slices; slice++) {
                lower = stack * (this.slices + 1) + slice;
                upper = lower + this.slices + 1;

                this.indices.push(lower, upper, lower + 1);
                this.indices.push(upper, upper + 1, lower + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        super.display();
    }
}
