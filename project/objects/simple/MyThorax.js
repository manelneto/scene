import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyThorax
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyThorax extends CGFobject {
	constructor(scene) {
		super(scene);

        this.thorax = new MySphere(this.scene, 64, 32, false, 0.5);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.thorax.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.thorax.enableNormalViz();
    }

    disableNormalViz() {
        this.thorax.disableNormalViz();
    }
}
