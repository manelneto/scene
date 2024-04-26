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

        this.headMaterial = this.createMaterial([1, 1, 1, 1.0], 'images/head.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8, 1.0], 'images/eye.png');
        this.antennaMaterial = this.createMaterial([0.1, 0.1, 0.1, 1.0], 'images/antenna-leg.png');
        this.thoraxMaterial = this.createMaterial([1, 1, 1, 1.0], 'images/head.png');
        this.abdomenMaterial = this.createMaterial([1, 1, 0, 1.0], 'images/abdomen.png');
        this.wingMaterial = this.createMaterial([1, 1, 1, 0.2], 'images/wing.png');
        this.legMaterial = this.createMaterial([0.1, 0.1, 0.1, 1.0], 'images/antenna-leg.png');

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
        let direction;
        this.scene.pushMatrix();
        this.scene.translate(0, 3 + this.y, 0);

        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.rotate(-Math.PI / 10, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.eyeMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.3, 0.1, 0.1)
            this.scene.rotate(direction * Math.PI / 10, 0, 1, 0);
            this.eyes[i].display();
            this.scene.popMatrix();
        }

        this.antennaMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.rotate(direction * Math.PI / 6, 0, 1, 0);
            this.scene.translate(direction * 0.2, 0.6, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.antennas[i].display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.thoraxMaterial.apply();
        this.scene.translate(0, 0.2, -1);
        this.thorax.display();
        this.scene.popMatrix();

        this.legMaterial.apply();
        for (let i = 0; i < 6; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * -0.4, -0.5, -1.35 + 0.3 * Math.floor(i / 2));
            this.legs[i].display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.abdomenMaterial.apply();
        this.scene.rotate(-Math.PI / 10, 1, 0, 0);
        this.scene.translate(0, 0.7, -2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.wingMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.35, 0.6, -0.7);
            this.scene.rotate(direction * this.alpha, 0, 0, 1);
            this.scene.rotate(direction * Math.PI / 7, 0, 0, 1);
            this.scene.translate(direction * 0.8, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.bigWings[i].display();
            this.scene.popMatrix();
        }
        for (let i = 0; i < 2; i++) {
            this.scene.pushMatrix();
            direction = (-1) ** i;
            this.scene.translate(direction * 0.4, 0.5, -1.2);
            this.scene.rotate(direction * this.alpha, 0, 0, 1);
            this.scene.rotate(direction * Math.PI / 7, 0, 0, 1);
            this.scene.translate(direction * 0.6, 0, 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.smallWings[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.update(Date.now());
    }

    createMaterial(colour, texturePath) {
        let r = colour[0];
        let g = colour[1];
        let b = colour[2];
        let alpha = colour[3];
        let texture = new CGFtexture(this.scene, texturePath);
        let material = new CGFappearance(this.scene);
        material.setAmbient(r, g, b, alpha);
        material.setDiffuse(r, g, b, alpha);
        material.setSpecular(r, g, b, alpha);
        material.setEmission(r, g, b, alpha);
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }
}
