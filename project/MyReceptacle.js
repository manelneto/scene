import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Receptacle radius
 */
export class MyReceptacle extends CGFobject {
	constructor(scene, radius) {
		super(scene);
		
        this.sphere = new MySphere(this.scene, 64, 32, false, radius);
	}

    display() {
        this.sphere.display();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}
