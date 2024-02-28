import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.face = new MyQuad(scene);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5); //face de tras
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5); //face da frente
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0); //face da esquerda
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0); //face da direita
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0); //face de baixo
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0); //face de cima
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.face.display();
        this.scene.popMatrix();

    }
	

}
