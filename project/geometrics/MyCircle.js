import { CGFobject } from '../../lib/CGF.js';

/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices (segments that make up the circle)
 * @param radius - Circle radius
 */
export class MyCircle extends CGFobject {
    constructor(scene, slices, radius) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angleStep = (2 * Math.PI) / this.slices;
        let angle;

        for (let i = 0; i <= this.slices; i++) {
            angle = i * angleStep;

            let x = this.radius * Math.cos(angle);
            let z = this.radius * Math.sin(angle);
            this.vertices.push(x, 0, z);

            this.normals.push(0, 0, 1);

            let u = 0.5 + 0.5 * Math.cos(angle);
            let v = 0.5 + 0.5 * Math.sin(angle);
            this.texCoords.push(u, v);

            this.indices.push(0, i, i + 1);
            this.indices.push(0, i + 1, i);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
