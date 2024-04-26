import { CGFobject } from '../../../lib/CGF.js';
import { MySphere } from '../../geometrics/MySphere.js';

/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeg extends CGFobject {
	constructor(scene) {
		super(scene);

        this.part1 = new MySphere(this.scene, 64, 32, false, 0.1);
        this.part2 = new MySphere(this.scene, 64, 32, false, 0.1);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, 0);
        this.scene.scale(0.5, 2, 0.5);
        this.part2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 2, 0.5);
        this.part1.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.part1.enableNormalViz();
        this.part2.enableNormalViz();
    }

    disableNormalViz() {
        this.part1.disableNormalViz();
        this.part2.disableNormalViz();
    }
}
