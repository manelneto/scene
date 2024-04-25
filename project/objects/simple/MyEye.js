import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyEyes
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEye extends CGFobject {
	constructor(scene) {
		super(scene);

        this.eye = new MySphere(this.scene, 64, 32, false, 0.5);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.4, 0.8, 0.3);
        this.eye.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.eye.enableNormalViz();
    }

    disableNormalViz() {
        this.eye.disableNormalViz();
    }
}
