import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MyTriangle } from '../../geometrics/MyTriangle.js';

/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 * @param width - Triangle width
 * @param height - Triangle height
 */
export class MyGrass extends CGFobject {
    constructor(scene, width, height) {
        super(scene);
        this.width = width;
        this.height = height;
        this.initBuffers();

        /*
        this.texture = new CGFtexture(this.scene, "./images/grass.avif");
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.22, 0.47, 0.11, 1.0);
        this.material.setDiffuse(0.22, 0.47, 0.11, 1.0);
        this.material.setSpecular(0.22, 0.47, 0.11, 1.0);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');*/
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        //this.texCoords = [];

        const m = this.height / this.width;
        for (let i = -1; i <= 1; i += 2) {
            for (let x = -this.width; x <= 0; x++) {
                this.vertices.push(x, m * x + this.height, 0);
                this.vertices.push(-x, m * x + this.height, 0);
                this.normals.push(0, 0, i);
                this.normals.push(0, 0, i);
            }
        }

        for (let i = 0; i < 2; i++) {
            let j = 0;
            if (i == 0) {
                for (j = 0; j <= this.width; j += 2) {
                    this.indices.push(j, j + 1, j + 2);
                    this.indices.push(j + 1, j + 3, j + 2);
                }
                this.indices.push(j, j + 1, j + 2);
            } else {
                for (j = 0; j <= this.width; j += 2) {
                    this.indices.push(j + 2, j + 1, j);
                    this.indices.push(j + 2, j + 3, j + 1);
                }
                this.indices.push(j + 2, j + 1, j);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}