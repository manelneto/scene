import { CGFobject } from '../../../lib/CGF.js';
import { MyTriangle } from '../../geometrics/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param length - Petal length
 * @param angle - Petal rotation angle
 */
export class MyPetal extends CGFobject {
	constructor(scene, length, angle) {
		super(scene);

        this.angle = angle;
		
        this.triangle1 = new MyTriangle(this.scene, 1, length/2);
        this.triangle2 = new MyTriangle(this.scene, 1, length/2);
	}

    display() {
        this.scene.pushMatrix();
        this.triangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI - this.angle, 1, 0, 0);
        this.triangle2.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.triangle1.enableNormalViz();
        this.triangle2.enableNormalViz();
    }

    disableNormalViz() {
        this.triangle1.disableNormalViz();
        this.triangle2.disableNormalViz();
    }
}
