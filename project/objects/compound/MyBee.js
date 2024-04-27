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

        this.bigWingsLength = 0.8;
        this.smallWingsLength = 0.6;
        
        this.head = new MyHead(this.scene);
        this.eyes = [new MyEye(this.scene), new MyEye(this.scene)];
        this.antennas = [new MyAntenna(this.scene), new MyAntenna(this.scene)];
        this.thorax = new MyThorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);
        this.bigWings = [new MyWing(this.scene, this.bigWingsLength), new MyWing(this.scene, this.bigWingsLength)];
        this.smallWings =  [new MyWing(this.scene, this.smallWingsLength), new MyWing(this.scene, this.smallWingsLength)];
        this.legs = [];

        for (let i = 0; i < 6; i++) {
            this.legs.push(new MyLeg(this.scene));
        }

        this.abdomenMaterial = this.createMaterial([1, 1, 0, 1.0], 'images/abdomen.png');
        this.headThoraxMaterial = this.createMaterial([1, 1, 1, 1.0], 'images/head-thorax.png');
        this.antennaLegMaterial = this.createMaterial([0.1, 0.1, 0.1, 1.0], 'images/antenna-leg.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8, 1.0], 'images/eye.png');
        this.wingMaterial = this.createMaterial([1, 1, 1, 0.2], 'images/wing.png');

        this.wingAngle = 0;
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.orientation = 0; // around the YY axis, from Z to X (counter-clockwise)
        this.vx = 0;
        this.vz = 0;
	}

    update(t) {
        this.x += this.vx * t;
        this.y = 3 + Math.sin(2 * Math.PI * t);
        this.z += this.vz * t;
        this.wingAngle = (Math.PI / 4) * Math.sin(8 * Math.PI * t);
        console.log(this.z, this.vz, t);
    }

    turn(orientation) {
        this.orientation += orientation;
        const v = Math.sqrt(this.vx * this.vx + this.vz * this.vz);
        this.vx = v * Math.sin(this.orientation);
        this.vz = v * Math.cos(this.orientation);
    }

    accelerate(delta) {
        if (delta > 0) {
            this.vx += delta * Math.sin(this.orientation);
            this.vz += delta * Math.cos(this.orientation);
        } else {
            if (this.vx > 0) {
                this.vx = Math.max(0, this.vx + delta * Math.sin(this.orientation));
            } else if (this.vx < 0) {
                this.vx = Math.min(0, this.vx + delta * Math.sin(this.orientation));
            }

            if (this.vz > 0) {
                this.vz = Math.max(0, this.vz + delta * Math.cos(this.orientation));
            } else if (this.vz < 0) {
                this.vz = Math.min(0, this.vz + delta * Math.cos(this.orientation));
            }
        }
    }

    display() {
        let direction;
        this.scene.pushMatrix();
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.translate(this.x, this.y, 1 + this.z);

        this.abdomenMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 10, 1, 0, 0);
        this.scene.translate(0, 0.7, -2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.headThoraxMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 10, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -1);
        this.thorax.display();
        this.scene.popMatrix();

        this.antennaLegMaterial.apply();

        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.rotate(direction * Math.PI / 6, 0, 1, 0);
            this.scene.translate(direction * 0.2, 0.6, 0);
            this.antennas[i].display();
            this.scene.popMatrix();
        }
        
        for (let i = 0; i < 6; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * -0.4, -0.5, -1.35 + 0.3 * Math.floor(i / 2));
            this.scene.scale(direction, 1, 1);
            this.legs[i].display();
            this.scene.popMatrix();
        }

        this.eyeMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.3, 0.1, 0.1);
            this.scene.rotate(direction * Math.PI / 10, 0, 1, 0);
            this.eyes[i].display();
            this.scene.popMatrix();
        }

        this.wingMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.35, 0.6, -0.7);
            this.scene.rotate(direction * (Math.PI / 7 + this.wingAngle), 0, 0, 1);
            this.scene.translate(direction * this.bigWingsLength, 0, 0);
            this.bigWings[i].display();
            this.scene.popMatrix();
        }
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.4, 0.5, -1.2);
            this.scene.rotate(direction * (Math.PI / 7 + this.wingAngle), 0, 0, 1);
            this.scene.translate(direction * this.smallWingsLength, 0, 0);
            this.smallWings[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.eyes.forEach((eye) => eye.enableNormalViz());
        this.antennas.forEach((antenna) => antenna.enableNormalViz());
        this.thorax.enableNormalViz();
        this.abdomen.enableNormalViz();
        this.bigWings.forEach((bigWing) => bigWing.enableNormalViz());
        this.smallWings.forEach((smallWing) => smallWing.enableNormalViz());
        this.legs.forEach((leg) => leg.enableNormalViz());
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.eyes.forEach((eye) => eye.disableNormalViz());
        this.antennas.forEach((antenna) => antenna.disableNormalViz());
        this.thorax.disableNormalViz();
        this.abdomen.disableNormalViz();
        this.bigWings.forEach((bigWing) => bigWing.disableNormalViz());
        this.smallWings.forEach((smallWing) => smallWing.disableNormalViz());
        this.legs.forEach((leg) => leg.disableNormalViz());
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
