import {CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyReceptacle extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.MySphere = new MySphere(this.scene, 64, 32, false, 0.5);
	}

    display() {
        this.scene.pushMatrix();
        this.MySphere.display();
        this.scene.popMatrix();
    }
}

