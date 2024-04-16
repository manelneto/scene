import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene, texture) {
        super(scene);
        this.texture = texture;

        this.sphere = new MySphere(this.scene, 64, 32, true, 200);
    }

    display() {
        this.texture.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display();
        this.scene.popMatrix();
    }
}