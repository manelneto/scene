import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
	constructor(scene) {
		super(scene);

        this.head = new MySphere(this.scene, 64, 32, false, 0.5);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.head.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.head.enableNormalViz();
    }

    disableNormalViz() {
        this.head.disableNormalViz();
    }
}
