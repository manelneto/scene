import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyAbdomen
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyAbdomen extends CGFobject {
	constructor(scene) {
		super(scene);

        this.abdomen = new MySphere(this.scene, 64, 32, false, 0.6);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 2, 1);
        this.abdomen.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.abdomen.enableNormalViz();
    }

    disableNormalViz() {
        this.abdomen.disableNormalViz();
    }
}
