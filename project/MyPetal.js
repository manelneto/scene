import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene) {
		super(scene);
		
        this.myTriangle1 = new MyTriangle(this.scene);
        this.myTriangle2 = new MyTriangle(this.scene);
	}

    display() {
        this.scene.pushMatrix();
        this.myTriangle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.myTriangle2.display();
        this.scene.popMatrix();

    }
}

