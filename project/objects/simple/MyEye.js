import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyEye
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEye extends CGFobject {
	constructor(scene) {
		super(scene);

        this.sphere = new MySphere(this.scene, 64, 32, false, 1);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.2, 0.35, 0.15);
        this.sphere.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}
