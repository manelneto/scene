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
        this.eyes = [new MyEye(this.scene), new MyEye(this.scene)];
        this.antennas = [new MyAntenna(this.scene), new MyAntenna(this.scene)];
        this.thorax = new MyThorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);
        this.bigWings = [new MyWing(this.scene, 0.8), new MyWing(this.scene, 0.8)];
        this.smallWings =  [new MyWing(this.scene, 0.6), new MyWing(this.scene, 0.6)];
        this.legs = [];

        for (let i = 0; i < 6; i++) {
            this.legs.push(new MyLeg(this.scene));
        }

        this.headMaterial = this.createMaterial([1, 1, 1], 'images/head1.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8], 'images/eye.png');
        this.antennaMaterial = this.createMaterial([0.1, 0.1, 0.1], 'images/antennae.png');
        this.thoraxMaterial = this.createMaterial([1, 1, 1], 'images/head1.png');
        this.abdomenMaterial = this.createMaterial([1, 1, 1], 'images/abdomen.png');
        this.wingMaterial = this.createMaterial([1, 1, 1], 'images/wing.png');
        this.legMaterial = this.createMaterial([0.1, 0.1, 0.1], 'images/antennae.png');

        this.alpha = 0;
        this.y = 0;
        this.time = Date.now();
	}

    update(time) {
        // f(t) = a * sin(w * t) 
        const t = (time - this.time) / 1000;

        const a1 = 1;           // amplitude
        const w1 = 2 * Math.PI; // angular frequency
        this.y = a1 * Math.sin(w1 * t);

        const a2 = Math.PI / 4; // amplitude
        const w2 = 4 * Math.PI; // angular frequency
        this.alpha = a2 * Math.sin(w2 * t);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 3 + this.y, 0);

        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(-Math.PI / 8, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.eyeMaterial.apply();
        let eye;
        for (let i = 0; i < 2; i++) {
            eye = this.eyes[i];

            this.scene.pushMatrix();
            this.scene.translate(0.4 * (-1) ** i, 0.2, 0.25)
            this.scene.rotate(Math.PI / 8 * (-1) ** i, 0, 1, 0);
            eye.display();
            this.scene.popMatrix();
        }

        this.antennaMaterial.apply();
        let antenna;
        for (let i = 0; i < 2; i++) {
            antenna = this.antennas[i];

            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 6 * (-1) ** i, 0, 1, 0);
            this.scene.translate(0.1 * (-1) ** i, 0.6, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            antenna.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.thoraxMaterial.apply();
        this.scene.translate(0, 0.2, -1);
        this.thorax.display();
        this.scene.popMatrix();

        this.wingMaterial.apply();
        let bigWing;
        for (let i = 0; i < 2; i++) {
            bigWing = this.bigWings[i];

            this.scene.pushMatrix();
            this.scene.translate(0.4 * (-1) ** i, 0.4, -0.7);
            this.scene.rotate(this.alpha * (-1) ** i, 0, 0, 1);
            this.scene.translate(0.8 * (-1) ** i, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            bigWing.display();
            this.scene.popMatrix();
        }

        let smallWing;
        for (let i = 0; i < 2; i++) {
            smallWing = this.bigWings[i];

            this.scene.pushMatrix();
            this.scene.translate(0.5 * (-1) ** i, 0.35, -1.2);
            this.scene.rotate(this.alpha * (-1) ** i, 0, 0, 1);
            this.scene.translate(0.6 * (-1) ** i, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            smallWing.display();
            this.scene.popMatrix();
        }

        this.legMaterial.apply();
        let leg;
        for (let i = 0; i < 6; i++) {
            leg = this.legs[i];

            this.scene.pushMatrix();
            this.scene.translate(-0.4 * (-1) ** i, -0.5, -1.2 + 0.3 * Math.floor(i / 2));
            leg.display();
            this.scene.popMatrix();
        }

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
