import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyCylinder } from '../../geometrics/MyCylinder.js';
import { MyCircle } from '../../geometrics/MyCircle.js';
import { MyUnitCubeQuad } from '../../geometrics/MyUnitCubeQuad.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);

		this.cylinder = new MyCylinder(scene, 1, 3);
		this.cylinder2 = new MyCylinder(scene, 1.3, 1);
		this.circle = new MyCircle(scene, 32, 1.3);

		const texture = new CGFtexture(this.scene, 'images/hive.png');
		const texture2 = new CGFtexture(this.scene, 'images/tronco.png');

		this.cube = new MyUnitCubeQuad(scene, texture2, texture2, texture2, texture2, texture2, texture2);

        this.material = new CGFappearance(this.scene);
		this.material.setAmbient(0.76, 0.6, 0.42, 1.0);
		this.material.setDiffuse(0.54, 0.27, 0.07, 1.0);
		this.material.setEmission(0, 0, 0, 0);
		this.material.setShininess(10.0);
		this.material.setSpecular(0.3, 0.15, 0.05, 1.0);
		this.material.setTexture(texture);
		this.material.setTextureWrap('REPEAT', 'REPEAT');

		this.material2 = new CGFappearance(this.scene);
		this.material2.setAmbient(1.0, 1.0, 1.0, 1.0);
		this.material2.setDiffuse(0.64, 0.47, 0.47, 1.0);
		this.material2.setEmission(0, 0, 0, 0);
		this.material2.setShininess(10.0);
		this.material2.setSpecular(0.3, 0.15, 0.05, 1.0);
		this.material2.setTexture(texture2);
	}

	display() {
        this.material.apply();

        this.scene.pushMatrix();
        this.cylinder.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1, 0.3, 1);
		this.scene.translate(0, 10, 0);
		this.cylinder2.display();
		this.scene.popMatrix();

		this.material2.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 3, 0);
		this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 3.3, 0);
		this.circle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0.8);
		this.scene.scale(1, 0.2, 0.5);
		this.cube.display();
		this.scene.popMatrix();
    }
}
