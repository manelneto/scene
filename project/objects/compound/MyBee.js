import { CGFobject } from '../../../lib/CGF.js';
import { MyHead } from '../simple/MyHead.js';
import { MyEye } from '../simple/MyEye.js';
import { MyAntenna } from '../simple/MyAntenna.js';
import { MyThorax } from '../simple/MyThorax.js';
import { MyAbdomen } from '../simple/MyAbdomen.js';
import { MyWing } from '../simple/MyWing.js';
import { MyLeg } from '../simple/MyLeg.js';
import { MyUtils } from '../../MyUtils.js';

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

        this.abdomenMaterial = MyUtils.createMaterial(this.scene, [1, 1, 0, 1.0], true, 'images/abdomen.png');
        this.headThoraxMaterial = MyUtils.createMaterial(this.scene, [1, 1, 1, 1.0], true, 'images/head-thorax.png');
        this.antennaLegMaterial = MyUtils.createMaterial(this.scene, [0.1, 0.1, 0.1, 1.0], true, 'images/antenna-leg.png');
        this.eyeMaterial = MyUtils.createMaterial(this.scene, [0.8, 0.8, 0.8, 1.0], true, 'images/eye.png');
        this.wingMaterial = MyUtils.createMaterial(this.scene, [1, 1, 1, 0.2], true, 'images/wing.png');

        this.states = Object.freeze({
            NORMAL: Symbol("normal"),
            DESCEND: Symbol("descend"),
            ASCEND: Symbol("ascend"),
            FLOWER: Symbol("flower"),
            TOHIVE: Symbol("tohive"),
            FROMHIVE: Symbol("fromhive")
        });

        // initial coordinates
        this.x0 = 0;
        this.y0 = 10;
        this.z0 = 0;

        // initial velocity (along each axis)
        this.v0x = 0;
        this.v0y = 5;
        this.v0z = 0;

        this.initMovement();
	}

    /**
     * Initializes the parameters to the movement of the Bee.
     */
    initMovement() {
        this.wingAngle = 0; // angle of the wings
        
        // coordinates
        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;

        this.orientation = 0; // angle around the YY axis, from Z to X (counter-clockwise)
        
        // velocity (along each axis)
        this.vx = this.v0x;
        this.vy = this.v0y;
        this.vz = this.v0z;

        this.time = 0;

        this.state = this.states.NORMAL;
        this.flower = null;
        this.pollen = null;
        
        // coordinates of the Bee in the previous state
        this.previousX = this.x;
        this.previousY = this.y;
        this.previousZ = this.z;

        // hive coordinates
        this.hiveX = null;
        this.hiveY = null;
        this.hiveZ = null;
        
        this.ay = 0; // acceleration along the YY axis

        this.flowerY = 0; // Y coordinate of the flower where the Bee is placed

        // time elapsed while the Bee is in each state
        this.descendTime = 0;
        this.ascendTime = 0;
        this.toHiveTime = 0;
        this.fromHiveTime = 0;
    }

    /**
     * Returns true if the Bee is near a given position, false otherwise.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     * @param tolerance - Tolerance to determine if the Bee is considered near a given position
     * @returns True if the Bee is near the given position, false otherwise
     */
    isNear(x, y, z, tolerance) {
        return Math.abs(x - this.x) < tolerance && Math.abs(y - this.y) < tolerance && Math.abs(z - this.z) < tolerance
    }

    /**
     * Calculates the parabola-shaped trajectory to perform a given movement and sets the movement parameters accordingly.
     * @param deltaX - Offset along the XX axis
     * @param deltaY - Offset along the YY axis
     * @param deltaZ - Offset along the ZZ axis
     * @param fromHive - True if the movement is from the hive, false if it is to the hive
     */
    calculateParabolaTrajectory(deltaX, deltaY, deltaZ, fromHive) {
        this.orientation = Math.atan2(deltaZ, deltaX);
        
        this.vx = deltaX / 4;
        this.vy = fromHive ? -deltaY * 4 : deltaY * 4;
        this.vz = deltaZ / 4;
        
        const horizontalDistance = Math.sqrt(deltaX ** 2 + deltaZ ** 2);
        const time = horizontalDistance / Math.sqrt(this.vx ** 2 + this.vz ** 2);

        this.ay = 2 * (deltaY - this.vy * time) / time ** 2;
    }

    /**
     * Updates the Bee movement parameters periodically.
     * @param t - Time elapsed since the start of the scene
     */
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
                this.y = this.previousY + Math.sin(2 * Math.PI * t); // oscilate periodically

                break;

            case this.states.DESCEND:
                this.descendTime += deltaT;

                this.y = this.previousY + this.vy * this.descendTime - 5 * this.descendTime ** 2; // parabola-shaped trajectory
                this.flowerY = this.y - this.legLength * this.scene.scaleFactor;
                this.flower = this.scene.garden.getFlower(this.x, this.flowerY, this.z);
                
                if (this.flower) {
                    // collision with a flower
                    this.state = this.states.FLOWER;
                    this.descendTime = 0;
                } else if (this.flowerY <= 0) {
                    // collision with the ground (no flower)
                    this.state = this.states.ASCEND;
                    this.descendTime = 0;
                }

                break;

            case this.states.ASCEND:
                this.ascendTime += deltaT;

                if (this.flower && !this.pollen) {
                    this.pollen = this.flower.removePollen();
                    this.flower = null;
                }

                this.y = this.flowerY + 3 * this.vy * this.ascendTime - 5 * this.ascendTime ** 2; // parabola-shaped trajectory

                if (this.y >= this.previousY) {
                    this.state = this.states.NORMAL;
                    this.ascendTime = 0;
                    this.time = 0;
                    this.scene.resetTime();
                }

                break;

            case this.states.TOHIVE:
                this.toHiveTime += deltaT;

                this.y = this.previousY + this.vy * this.toHiveTime + 0.5 * this.ay * this.toHiveTime ** 2; // parabola-shaped trajectory

                if (this.isNear(this.hiveX, this.hiveY, this.hiveZ, 0.5 * this.scene.scaleFactor)) {
                    // collision with the hive
                    this.state = this.states.FROMHIVE;
                    this.toHiveTime = 0;

                    this.pollen = null;

                    const deltaX = this.previousX - this.x;
                    const deltaY = this.previousY - this.y;
                    const deltaZ = this.previousZ - this.z;

                    this.calculateParabolaTrajectory(deltaX, deltaY, deltaZ, true);
                }

                break;
            
            case this.states.FROMHIVE:
                this.fromHiveTime += deltaT;

                this.y = this.hiveY + this.vy * this.fromHiveTime + 0.5 * this.ay * this.fromHiveTime ** 2; // parabola-shaped trajectory

                if (this.isNear(this.previousX, this.previousY, this.previousZ, 0.5 * this.scene.scaleFactor)) {
                    this.state = this.states.NORMAL;
                    this.fromHiveTime = 0;

                    this.vx = this.v0x;
                    this.vy = this.v0y;
                    this.vz = this.v0z;
                }

                break;
        }
    }

    /**
     * Turns the Bee.
     * Directly affects its orientation and updates its velocity (only in direction, maintaining the norm).
     * @param deltaO - Orientation angle increment
     */
    turn(deltaO) {
        if (this.state == this.states.NORMAL) {
            this.orientation += deltaO;
            const v = Math.sqrt(this.vx * this.vx + this.vz * this.vz);
            this.vx = v * Math.sin(this.orientation);
            this.vz = v * Math.cos(this.orientation);
        }
    }

    /**
     * Accelerates the Bee.
     * Directly affects the norm of its velocity, but mantains the direction.
     * @param deltaV - Velocity (norm) increment
     */
    accelerate(deltaV) {
        if (this.state == this.states.NORMAL) {        
            if (deltaV > 0) {
                this.vx += deltaV * Math.sin(this.orientation);
                this.vz += deltaV * Math.cos(this.orientation);
            } else {
                // slows down until the velocity is zero, does not go backwards
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

    /**
     * Reset the Bee's position and speed.
     * The Bee is placed in its initial position, with zero rotation and speed.
     */
    reset() {
        this.initMovement();
        this.scene.resetTime();
    }

    /**
     * Starts the ascending movement of the Bee.
     */
    ascend() {
        if (this.state == this.states.FLOWER) {
            this.state = this.states.ASCEND;
        }
    }

    /**
     * Starts the descending movement of the Bee.
     */
    descend() {
        if (this.state == this.states.NORMAL) {
            this.state = this.states.DESCEND;
            this.previousY = this.y;
        }
    }

    /**
     * Starts the movement of the Bee to the hive, to deliver the pollen.
     * @param hiveX - Hive X coordinate
     * @param hiveY - Hive Y coordinate
     * @param hiveZ - Hive Z coordinate
     */
    deliver(hiveX, hiveY, hiveZ) {
        if (this.state == this.states.NORMAL && this.pollen) {
            this.state = this.states.TOHIVE;
            
            this.previousX = this.x;
            this.previousY = this.y;
            this.previousZ = this.z;

            this.hiveX = hiveX;
            this.hiveY = hiveY;
            this.hiveZ = hiveZ;

            const deltaX = this.hiveX - this.x;
            const deltaY = this.hiveY - this.y;
            const deltaZ = this.hiveZ - this.z;

            this.calculateParabolaTrajectory(deltaX, deltaY, deltaZ, false);
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
}
