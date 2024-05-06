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
        this.legsLength = 0.4
        
        this.head = new MyHead(this.scene);
        this.eyes = [new MyEye(this.scene), new MyEye(this.scene)];
        this.antennas = [new MyAntenna(this.scene), new MyAntenna(this.scene)];
        this.thorax = new MyThorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);
        this.bigWings = [new MyWing(this.scene, this.bigWingsLength), new MyWing(this.scene, this.bigWingsLength)];
        this.smallWings =  [new MyWing(this.scene, this.smallWingsLength), new MyWing(this.scene, this.smallWingsLength)];
        this.legs = [];

        for (let i = 0; i < 6; i++) {
            this.legs.push(new MyLeg(this.scene, this.legsLength));
        }

        this.abdomenMaterial = this.createMaterial([1, 1, 0, 1.0], 'images/abdomen.png');
        this.headThoraxMaterial = this.createMaterial([1, 1, 1, 1.0], 'images/head-thorax.png');
        this.antennaLegMaterial = this.createMaterial([0.1, 0.1, 0.1, 1.0], 'images/antenna-leg.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8, 1.0], 'images/eye.png');
        this.wingMaterial = this.createMaterial([1, 1, 1, 0.2], 'images/wing.png');

        this.wingAngle = 0;
        this.x = 0;
        this.y = 10;
        this.y0 = this.y;
        this.z = 0;
        this.orientation = 0; // around the YY axis, from Z to X (counter-clockwise)
        this.vx = 0;
        this.vy = 5;
        this.vz = 0;

        this.time = 0;

        this.states = Object.freeze({
            NORMAL: Symbol("normal"),
            DESCEND: Symbol("descend"),
            ASCEND: Symbol("ascend"),
            FLOWER: Symbol("flower"),
            HIVE: Symbol("hive")
        });
        this.state = this.states.NORMAL;
        this.pollen = null;
	}

    update(t) {
        const deltaT = t - this.time;
        this.time = t;
        this.wingAngle = (Math.PI / 4) * Math.sin(8 * Math.PI * t);

        switch (this.state) {
            case this.states.NORMAL:
                this.x += this.vx * deltaT;
                this.y = this.y0 + Math.sin(2 * Math.PI * t);
                this.z += this.vz * deltaT;
                break;

            case this.states.DESCEND:
                this.x += this.vx * deltaT;
                this.y -= this.vy * deltaT;
                this.z += this.vz * deltaT;
                if (this.scene.garden.hasFlower(this.x, this.y - this.legsLength, this.z)) {
                    this.state = this.states.FLOWER;
                } else if (this.y <= 0) {
                    this.state = this.states.ASCEND;
                }

                break;

            case this.states.ASCEND:
                this.x += this.vx * deltaT;
                this.y += this.vy * deltaT;
                this.z += this.vz * deltaT;

                if (this.y >= this.y0) {
                    this.state = this.states.NORMAL;
                    this.time = 0;
                    this.scene.resetTime();
                }

                break;

            case this.states.FLOWER:
                break;

            case this.states.HIVE:
                break;
        }
    }

    turn(deltaO) {
        if (this.state == this.states.NORMAL) {
            this.orientation += deltaO;
            const v = Math.sqrt(this.vx * this.vx + this.vz * this.vz);
            this.vx = v * Math.sin(this.orientation);
            this.vz = v * Math.cos(this.orientation);
        }
    }

    accelerate(deltaV) {
        if (this.state == this.states.NORMAL) {        
            if (deltaV > 0) {
                this.vx += deltaV * Math.sin(this.orientation);
                this.vz += deltaV * Math.cos(this.orientation);
            } else {
                if (this.vx > 0) {
                    this.vx = Math.max(0, this.vx + deltaV * Math.sin(this.orientation));
                } else if (this.vx < 0) {
                    this.vx = Math.min(0, this.vx + deltaV * Math.sin(this.orientation));
                }

                if (this.vz > 0) {
                    this.vz = Math.max(0, this.vz + deltaV * Math.cos(this.orientation));
                } else if (this.vz < 0) {
                    this.vz = Math.min(0, this.vz + deltaV * Math.cos(this.orientation));
                }
            }
        }
    }

    reset() {
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.orientation = 0;
        this.vx = 0;
        this.vz = 0;
        this.time = 0;
        this.scene.resetTime();
    }

    ascend() {
        if (this.state == this.states.FLOWER) {
            this.state = this.states.ASCEND;
        }
    }

    descend() {
        if (this.state == this.states.NORMAL) {
            this.state = this.states.DESCEND;
            this.y0 = this.y;
        }
    }

    deliver() {
        // TODO
    }

    display() {
        let direction;
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.translate(0, 0, 1);

        this.abdomenMaterial.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/10, 1, 0, 0);
        this.scene.translate(0, 0.7, -2.5);
        this.abdomen.display();
        this.scene.popMatrix();

        this.headThoraxMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/10, 1, 0, 0);
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
            this.scene.translate(direction * 0.35, 0.5, -0.7);
            this.scene.rotate(direction * (Math.PI / 7 + this.wingAngle), 0, 0, 1);
            this.scene.translate(direction * this.bigWingsLength, 0, 0);
            this.bigWings[i].display();
            this.scene.popMatrix();
        }
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.4, 0.4, -1.2);
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
        const r = colour[0];
        const g = colour[1];
        const b = colour[2];
        const alpha = colour[3];
        const texture = new CGFtexture(this.scene, texturePath);
        const material = new CGFappearance(this.scene);
        material.setAmbient(r, g, b, alpha);
        material.setDiffuse(r, g, b, alpha);
        material.setSpecular(r, g, b, alpha);
        material.setEmission(r, g, b, alpha);
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }
}
