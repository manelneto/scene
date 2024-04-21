import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param n - Number of rocks
 */
export class MyRockSet extends CGFobject {
    constructor(scene, n) {
        super(scene);
        this.n = n;
        this.rocks = [];
        this.randoms = [];

        for (let i = 0; i < this.n; i++) {
            this.rocks.push(new MyRock(this.scene));
            this.randoms.push([1, 1, 1]);
        }
    }

    display() {
        let rock, random;
        for (let i = 0; i < this.n; i++) {
            rock = this.rocks[i];
            random = this.randoms[i];

            this.scene.pushMatrix();
            this.scene.scale(random[0], random[1], random[2]);
            this.scene.translate(0, 2 * i, 0);
            rock.display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        this.rocks.forEach((rock) => rock.enableNormalViz());
    }

    disableNormalViz() {
        this.rocks.forEach((rock) => rock.disableNormalViz());
    }
}
