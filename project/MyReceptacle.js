import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, radius) {
		super(scene);

        this.radius = radius;
		
        this.mySphere = new MySphere(this.scene, 64, 32, false, radius);
	}

    display() {
        this.scene.pushMatrix();
        this.mySphere.display();
        this.scene.popMatrix();
    }
}

