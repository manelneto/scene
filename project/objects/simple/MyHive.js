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

		this.hive = new MyCylinder(scene, 1, 3);
		this.trunck = new MyCylinder(scene, 1.3, 1);
		this.cover = new MyCircle(scene, 32, 1.3);

		const trunckTexture = new CGFtexture(this.scene, 'images/trunck.png');

		this.entrance = new MyUnitCubeQuad(scene, trunckTexture, trunckTexture, trunckTexture, trunckTexture, trunckTexture, trunckTexture);

		this.hiveMaterial = this.createMaterial([0.76, 0.6, 0.42, 1.0], 'images/hive.png');
		this.trunckMaterial = this.createMaterial([0.64, 0.47, 0.47, 1.0], 'images/trunck.png');
	}

	display() {
        this.hiveMaterial.apply();

        this.scene.pushMatrix();
        this.hive.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(1, 0.3, 1);
		this.scene.translate(0, 10, 0);
		this.trunck.display();
		this.scene.popMatrix();

		this.trunckMaterial.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 3, 0);
		this.cover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 3.3, 0);
		this.cover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0.8);
		this.scene.scale(1, 0.2, 0.5);
		this.entrance.display();
		this.scene.popMatrix();
    }

	createMaterial(colour, texturePath) {
        let r = colour[0];
        let g = colour[1];
        let b = colour[2];
        let alpha = colour[3];
        let texture = new CGFtexture(this.scene, texturePath);
        let material = new CGFappearance(this.scene);
        material.setAmbient(r, g, b, alpha);
        material.setDiffuse(r, g, b, alpha);
        material.setSpecular(r, g, b, alpha);
        material.setEmission(r, g, b, alpha);
        material.setTexture(texture);
        material.setTextureWrap('REPEAT', 'REPEAT');
        return material;
    }
}
