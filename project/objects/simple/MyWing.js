import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param size - size of the wing
 */
export class MyWing extends CGFobject {
	constructor(scene, size) {
		super(scene);

        this.size = size;

        this.wing = new MySphere(this.scene, 64, 32, false, size);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.4, 0.1, 1);
        this.wing.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.wing.enableNormalViz();
    }

    disableNormalViz() {
        this.head.disableNormalViz();
    }
}
