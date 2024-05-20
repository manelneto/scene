import { CGFobject } from '../../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices ("sides" around the Y axis)
 * @param stacks - Number of stacks (divisions from the "equator" to the "poles")
 * @param isInverted - Boolean to indicate if the sphere should be inverted (i.e. visible from the inside and not the outside)
 * @param radius - Sphere radius
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

        let phi;        // angle with the YY axis, from -PI/2 to PI/2
        let theta;      // angle with the XX axis, from 0 to 2PI
        let x, y, z;    // vertices coordinates
        let u, v;       // texture coordinates
        let r = this.radius;
        for (let stack = -this.stacks; stack <= this.stacks; stack++) {
            phi = (Math.PI / 2) * (stack / this.stacks);
            for (let slice = 0; slice <= this.slices; slice++) {
                theta = (2 * Math.PI) * (slice / this.slices);
                
                x = r * Math.cos(phi) * Math.cos(theta);
                y = r * Math.sin(phi);
                z = r * Math.cos(phi) * Math.sin(theta);

                this.vertices.push(x, y, z);

                if (this.isInverted) {
					this.normals.push(-x/r, -y/r, -z/r);
				} else {
					this.normals.push(x/r, y/r, z/r);
				}


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

				if (this.isInverted) {
                    this.indices.push(lower + 1, upper, lower);
					this.indices.push(lower + 1, upper + 1, upper);
				} else {
                    this.indices.push(lower, upper, lower + 1);
					this.indices.push(upper, upper + 1, lower + 1);
				}
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
