import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyHead } from '../simple/MyHead.js';
import { MyEye } from '../simple/MyEye.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.head = new MyHead(this.scene);
        this.leftEye = new MyEye(this.scene);
        this.rightEye = new MyEye(this.scene);

        this.headMaterial = this.createMaterial([1, 1, 1], 'images/head1.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8], 'images/eye.png');
	}

    display() {
        // Head
        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        // Left eye
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.2, 0.25);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.eyeMaterial.apply();
        this.leftEye.display();
        this.scene.popMatrix();

        // Right eye
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.2, 0.25);
        this.scene.rotate(-Math.PI / 8, 0, 1, 0);
        this.eyeMaterial.apply();
        this.rightEye.display();
        this.scene.popMatrix();
    }

    createMaterial(colour, texturePath) {
        let r = colour[0];
        let g = colour[1];
        let b = colour[2];
        let texture = new CGFtexture(this.scene, texturePath);
        let material = new CGFappearance(this.scene);
        material.setAmbient(r, g, b, 1.0);
        material.setDiffuse(r, g, b, 1.0);
        material.setSpecular(r, g, b, 1.0);
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }
}
