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
        this.vertices = [
            0, 0, 0,
            0, 0, 0
        ];
        this.indices = [];
        this.normals = [
            0, 1, 0,
            0, -1, 0
        ];
        this.texCoords = [
            0.5, 0.5,
            0.5, 0.5
        ];
    
        const angleStep = (2 * Math.PI) / this.slices;
        let angle, x, z, u, v;
        for (let i = 0; i < this.slices; i++) {
            angle = i * angleStep;
    
            x = this.radius * Math.cos(angle);
            z = this.radius * Math.sin(angle);

            u = 0.5 + 0.5 * Math.cos(angle);
            v = 0.5 + 0.5 * Math.sin(angle);
    
            this.vertices.push(x, 0, z);
            this.normals.push(0, 1, 0);
            this.texCoords.push(u, v);
    
            this.vertices.push(x, 0, z);
            this.normals.push(0, -1, 0);
            this.texCoords.push(u, v);
        }

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(0, 2 + 2 * i, 2 + (2 + 2 * i) % (2 * this.slices));
            this.indices.push(1, 3 + (2 + 2 * i) % (2 * this.slices), 3 + 2 * i);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
