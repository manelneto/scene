import { CGFobject } from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometrics/MyCylinder.js';
import { MyTriangle } from '../../geometrics/MyTriangle.js';

/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.radius = 0.08;
        this.cylinderHeight = 1;
        this.width = 1;
        this.triangleHeight = 1;

        this.cylinder = new MyCylinder(this.scene, this.radius, this.cylinderHeight, true);
        this.triangle = new MyTriangle(this.scene, this.width, this.triangleHeight);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate((this.cylinderHeight + this.triangleHeight) * Math.SQRT1_2 - 0.1, (this.cylinderHeight + this.triangleHeight) * Math.SQRT1_2 - 0.1, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.translate(-this.width/2, 0, 0);
        this.scene.rotate(Math.PI/5, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.SQRT1_2 - 0.1, Math.SQRT1_2 - 0.1, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.translate(-this.width/2, this.triangleHeight, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.cylinder.enableNormalViz();
        this.triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.cylinder.disableNormalViz();
        this.triangle.disableNormalViz();
    }
}
