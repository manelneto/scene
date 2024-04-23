import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, petalLength, angle) {
		super(scene);

        this.petalLength = petalLength;
        this.angle = angle;
		
        this.myTriangle1 = new MyTriangle(this.scene, petalLength / 2);
        this.myTriangle2 = new MyTriangle(this.scene, petalLength / 2);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.myTriangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(this.angle, 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.myTriangle2.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.myTriangle1.enableNormalViz();
        this.myTriangle2.enableNormalViz();
    }

    disableNormalViz() {
        this.myTriangle1.disableNormalViz();
        this.myTriangle2.disableNormalViz();
    }
}

