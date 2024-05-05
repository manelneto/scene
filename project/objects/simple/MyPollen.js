import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param y1 - Scale along the YY axis to apply to the "south" hemisphere
 * @param y2 - Scale along the YY axis to apply to the "north" hemisphere
 */
export class MyPollen extends CGFobject {
    constructor(scene, y1, y2) {
        super(scene);
        this.stacks = 32;
        this.slices = 64;
        this.y1 = y1;
        this.y2 = y2;

        const texture = new CGFtexture(this.scene, 'images/pollen.png');
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1.0, 0.65, 0, 1.0);
        this.material.setDiffuse(1.0, 0.65, 0, 1.0);
        this.material.setEmission(0, 0, 0, 0);
        this.material.setShininess(10.0);
        this.material.setSpecular(1.0, 0.65, 0, 1.0);
        this.material.setTexture(texture);

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
        for (let stack = -this.stacks; stack <= this.stacks; stack++) {
            phi = (Math.PI / 2) * (stack / this.stacks);
            for (let slice = 0; slice <= this.slices; slice++) {
                theta = (2 * Math.PI) * (slice / this.slices);

                x = Math.cos(phi) * Math.cos(theta);
                y = Math.sin(phi);
                z = Math.cos(phi) * Math.sin(theta);
                
                if (stack < 0) {
                    this.vertices.push(x, this.y1 * y, z);
                } else if (stack > 0) {
                    this.vertices.push(x, this.y2 * y, z);
                } else {
                    this.vertices.push(x, y, z);
                }

				this.normals.push(x, y, z); // TODO: a direção das normais está errada - é preciso corrigir

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
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.35, 0.35, 0.35);
        super.display();
        this.scene.popMatrix();
    }
}
