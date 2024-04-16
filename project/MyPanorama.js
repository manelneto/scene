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
        this.sphere.display();
    }
}