import { CGFobject } from '../../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, texturaTopo, texturaFrente, texturaDireita, texturaTras, texturaEsquerda, texturaFundo) {
		super(scene);

        this.texturaTopo = texturaTopo;
        this.texturaFrente = texturaFrente;
        this.texturaDireita = texturaDireita;
        this.texturaTras = texturaTras;
        this.texturaEsquerda = texturaEsquerda;
        this.texturaFundo = texturaFundo;

        this.face = new MyQuad(scene);
	}

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5); //face de tras
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.texturaTras.bind();
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5); //face da frente
        this.texturaFrente.bind();
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0); //face da esquerda
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.texturaEsquerda.bind();
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0); //face da direita
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.texturaDireita.bind();
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0); //face de baixo
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.texturaFundo.bind();
        this.face.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0); //face de cima
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.texturaTopo.bind();
        this.face.display();
        this.scene.popMatrix();
    }
}
