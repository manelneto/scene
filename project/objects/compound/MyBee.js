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

        this.bigWingLength = 0.8;
        this.smallWingLength = 0.6;
        this.legLength = 0.4;
        
        this.head = new MyHead(this.scene);
        this.eye = new MyEye(this.scene);
        this.antenna = new MyAntenna(this.scene);
        this.thorax = new MyThorax(this.scene);
        this.abdomen = new MyAbdomen(this.scene);
        this.bigWing = new MyWing(this.scene, this.bigWingLength);
        this.smallWing = new MyWing(this.scene, this.smallWingLength);
        this.leg = new MyLeg(this.scene, this.legLength);

        this.abdomenMaterial = this.createMaterial([1, 1, 0, 1.0], 'images/abdomen.png');
        this.headThoraxMaterial = this.createMaterial([1, 1, 1, 1.0], 'images/head-thorax.png');
        this.antennaLegMaterial = this.createMaterial([0.1, 0.1, 0.1, 1.0], 'images/antenna-leg.png');
        this.eyeMaterial = this.createMaterial([0.8, 0.8, 0.8, 1.0], 'images/eye.png');
        this.wingMaterial = this.createMaterial([1, 1, 1, 0.2], 'images/wing.png');

        this.wingAngle = 0;
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.orientation = 0; // angle around the YY axis, from Z to X (counter-clockwise)
        this.vx = 0;
        this.vy = 5;
        this.vz = 0;

        this.x0 = this.x;
        this.y0 = this.y;
        this.z0 = this.z;
        this.v0x = this.vx;
        this.v0y = this.vy;
        this.v0z = this.vz;

        this.time = 0;

        this.states = Object.freeze({
            NORMAL: Symbol("normal"),
            DESCEND: Symbol("descend"),
            ASCEND: Symbol("ascend"),
            FLOWER: Symbol("flower"),
            HIVE: Symbol("hive")
        });
        this.state = this.states.NORMAL;
        this.flower = null;
        this.pollen = null;
        
        this.previousX = this.x;
        this.previousY = this.y;
        this.previousZ = this.z;
        this.targetX = null;
        this.targetY = null;
        this.targetZ = null;

        this.targetRadius = null;
	}

    isNear(x, y, z, tolerance) {
        return Math.abs(x - this.x) < tolerance && Math.abs(y - this.y) < tolerance && Math.abs(z - this.z) < tolerance
    }

    update(t) {
        const deltaT = t - this.time;
        this.time = t;
        this.wingAngle = (Math.PI / 4) * Math.sin(8 * Math.PI * t);

        if (this.state == this.states.FLOWER) {
            return;
        }

        this.x += this.vx * deltaT;
        this.z += this.vz * deltaT;

        switch (this.state) {
            case this.states.NORMAL:
                this.y = this.previousY + Math.sin(2 * Math.PI * t);
                break;

            case this.states.DESCEND:
                this.y -= this.vy * deltaT;
                
                this.flower = this.scene.garden.getFlower(this.x, this.y - this.legLength, this.z);
                if (this.flower) {
                    this.state = this.states.FLOWER;
                } else if (this.y <= 0) {
                    this.state = this.states.ASCEND;
                }

                break;

            case this.states.ASCEND:
                if (this.flower) {
                    this.pollen = this.flower.removePollen();
                    this.flower = null;
                }

                this.y += this.vy * deltaT;

                if (this.y >= this.previousY) {
                    this.state = this.states.NORMAL;
                    this.time = 0;
                    this.scene.resetTime();
                }

                break;

            case this.states.HIVE:
                this.y += this.vy * deltaT;

                if (this.isNear(this.targetX, this.targetY, this.targetZ, this.targetRadius)) {
                    this.pollen = null;
                    this.vx = -this.vx;
                    this.vy = -this.vy;
                    this.vz = -this.vz;
                    this.orientation += Math.PI;
                }

                if (this.pollen == null && this.isNear(this.previousX, this.previousY, this.previousZ, 0.5)) {
                    this.state = this.states.NORMAL;
                    this.vx = this.v0x;
                    this.vy = this.v0y;
                    this.vz = this.v0z;
                }

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
        this.wingAngle = 0;
        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;
        this.orientation = 0;
        this.vx = this.v0x;
        this.vy = this.v0y;
        this.vz = this.v0z;
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
            this.previousY = this.y;
        }
    }

    deliver(targetX, targetY, targetZ, targetRadius) {
        if (this.state == this.states.NORMAL && this.pollen) {
            this.state = this.states.HIVE;
            
            this.previousX = this.x;
            this.previousY = this.y;
            this.previousZ = this.z;

            this.targetX = targetX;
            this.targetY = targetY;
            this.targetZ = targetZ;
            this.targetRadius = targetRadius;

            const opposite = this.targetX - this.x;
            const adjacent = this.targetZ - this.z;

            this.vx = opposite / 5;
            this.vy = (targetY - this.y) / 5;
            this.vz = adjacent / 5;
            this.orientation = Math.PI + Math.atan(opposite / adjacent);
        }
    }

    display() {
        let direction;
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
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
            this.antenna.display();
            this.scene.popMatrix();
        }
        
        for (let i = 0; i < 6; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * -0.4, -0.5, -1.35 + 0.3 * Math.floor(i / 2));
            this.scene.scale(direction, 1, 1);
            this.leg.display();
            this.scene.popMatrix();
        }

        if (this.pollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.6, -1.1);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.eyeMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.3, 0.1, 0.1);
            this.scene.rotate(direction * Math.PI / 10, 0, 1, 0);
            this.eye.display();
            this.scene.popMatrix();
        }

        this.wingMaterial.apply();
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.35, 0.5, -0.7);
            this.scene.rotate(direction * (Math.PI / 7 + this.wingAngle), 0, 0, 1);
            this.scene.translate(direction * this.bigWingLength, 0, 0);
            this.bigWing.display();
            this.scene.popMatrix();
        }
        for (let i = 0; i < 2; i++) {
            direction = (-1) ** i;
            this.scene.pushMatrix();
            this.scene.translate(direction * 0.4, 0.4, -1.2);
            this.scene.rotate(direction * (Math.PI / 7 + this.wingAngle), 0, 0, 1);
            this.scene.translate(direction * this.smallWingLength, 0, 0);
            this.smallWing.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.eye.enableNormalViz();
        this.antenna.enableNormalViz();
        this.thorax.enableNormalViz();
        this.abdomen.enableNormalViz();
        this.bigWing.enableNormalViz();
        this.smallWing.enableNormalViz();
        this.leg.enableNormalViz();
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.eye.disableNormalViz();
        this.antenna.disableNormalViz();
        this.thorax.disableNormalViz();
        this.abdomen.disableNormalViz();
        this.bigWing.disableNormalViz();
        this.smallWing.disableNormalViz();
        this.leg.disableNormalViz();
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
