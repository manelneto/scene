import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyHead } from '../simple/MyHead.js';
import { MyEye } from '../simple/MyEye.js';
import { MyAntenna } from '../simple/MyAntenna.js';
import { MyThorax } from '../simple/MyThorax.js';
import { MyAbdomen } from '../simple/MyAbdomen.js';
import { MyWing } from '../simple/MyWing.js';
import { MyLeg } from '../simple/MyLeg.js';

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
        this.leftAntenna = new MyAntenna(this.scene);
        this.rightAntenna = new MyAntenna(this.scene);
        this.thorax = new MyThorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);
        this.leftBigWing = new MyWing(this.scene, 0.8);
        this.rightBigWing = new MyWing(this.scene, 0.8);
        this.leftSmallWing = new MyWing(this.scene, 0.6);
        this.rightSmallWing = new MyWing(this.scene, 0.6);
        this.legs = [];

        for (let i=0; i<6; i++) {
            this.legs.push(new MyLeg(this.scene));
        }

        this.headMaterial = this.createMaterial([1, 1, 1], 'images/head1.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8], 'images/eye.png');
        this.antennaMaterial = this.createMaterial([0.1, 0.1, 0.1], 'images/antennae.png');
        this.thoraxMaterial = this.createMaterial([1, 1, 1], 'images/head1.png');
        this.abdomenMaterial = this.createMaterial([1, 1, 1], 'images/abdomen.png');
        this.wingMaterial = this.createMaterial([1, 1, 1], 'images/wing.png');
        this.legMaterial = this.createMaterial([0.1, 0.1, 0.1], 'images/antennae.png');

        this.y = 0;
        this.time = Date.now();
	}

    update(time) {
        // y(t) = a * sin(w * t) 
        const a = 3;            // amplitude
        const w = 2 * Math.PI;  // angular frequency
        const t = (time - this.time) / 1000;
        this.y = a * Math.sin(w * t);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 3 + this.y, 0);

        // Head
        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(-Math.PI / 8, 1, 0, 0);
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

        // Left antennae
        this.scene.pushMatrix();
        this.antennaMaterial.apply();
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.translate(0.1, 0.6, 0);
        this.scene.scale(0.2, 0.2, 0.2);
        this.leftAntenna.display();
        this.scene.popMatrix();

        // Right antennae
        this.scene.pushMatrix();
        this.antennaMaterial.apply();
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.translate(-0.1, 0.6, 0);
        this.scene.scale(0.2, 0.2, 0.2);
        this.rightAntenna.display();
        this.scene.popMatrix();

        // Thorax
        this.scene.pushMatrix();
        this.thoraxMaterial.apply();
        this.scene.translate(0, 0.2, -1);
        this.thorax.display();
        this.scene.popMatrix();

        // Left big wing
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.translate(-1.2, 0.4, -0.7);
        this.scene.rotate(-Math.PI - Math.PI / 2, 0, 1, 0);
        this.leftBigWing.display();
        this.scene.popMatrix();

        // Right big wing
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.translate(1.2, 0.4, -0.7);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.rightBigWing.display();
        this.scene.popMatrix();

        // Left small wing
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.translate(-1.1, 0.35, -1.2);
        this.scene.rotate(-Math.PI - Math.PI / 2, 0, 1, 0);
        this.leftSmallWing.display();
        this.scene.popMatrix();

        // Right small wing
        this.scene.pushMatrix();
        this.wingMaterial.apply();
        this.scene.translate(1.1, 0.35, -1.2);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.rightSmallWing.display();
        this.scene.popMatrix();

        // Legs
        this.scene.pushMatrix();
        this.legMaterial.apply();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(1.5, -0.5, -0.4);
        for (let i=0; i< 3; i++) {
            this.scene.translate(-0.3, 0, 0);
            this.legs[i].display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.legMaterial.apply();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(-1.5, -0.5, -0.4);
        for (let i=3; i< 6; i++) {
            this.scene.translate(0.3, 0, 0);
            this.legs[i].display();
        }
        this.scene.popMatrix();

        // Abdomen
        this.scene.pushMatrix();
        this.abdomenMaterial.apply();
        this.scene.rotate(-Math.PI / 10, 1, 0, 0);
        this.scene.translate(0, 0.7, -2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.update(Date.now());
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
