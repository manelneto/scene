import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyRock } from '../simple/MyRock.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param pyramid - Boolean to indicate if the rocks should be organized as a pyramid
 * @param n - If pyramid is set, number of levels; else, number of rocks
 */
export class MyRockSet extends CGFobject {
    constructor(scene, pyramid, n) {
        super(scene);
        this.pyramid = pyramid;
        this.n = n;
        this.rocks = [];

        let rock, random;
        for (let i = 0; i < this.n; i++) {
            rock = new MyRock(this.scene);
            
            if (this.pyramid) {
                random = [Math.random()/2 + 1.25, Math.random()/2 + 1.25, Math.random()/2 + 1.25];
            } else {
                random = [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1];
            }

            this.rocks.push([rock, random]);
        }

        const texture = new CGFtexture(this.scene, 'images/rock.jpg');
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.material.setEmission(0, 0, 0, 0);
        this.material.setShininess(10.0);
        this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material.setTexture(texture);
    }

    display() {
        this.material.apply()

        let rock, random;
        for (let i = 1; i <= this.n; i++) {
            rock = this.rocks[i - 1][0];
            random = this.rocks[i - 1][1];

            this.scene.pushMatrix();
            
            if (this.pyramid) {
                this.scene.translate(0, -1.5 * i, 0);
                this.displaySquare(i, rock, random);
            } else {
                this.scene.translate(random[0] * 20, 0, random[2] * 20);
                this.scene.scale(Math.abs(random[0]) + 1, Math.abs(random[1]) + 1, Math.abs(random[2]) + 1);
                rock.display();
            }
            
            this.scene.popMatrix();
        }
    }

    displaySquare(n, rock, random) {
        for (let i = -n; i < n; i += 2) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0, i * random[2]);
            this.displayLine(n, rock, random);
            this.scene.popMatrix();
        }
    }

    displayLine(n, rock, random) {
        for (let i = -n; i < n; i += 2) {
            this.scene.pushMatrix();
            this.scene.translate(i * random[0], 0, 0);
            this.scene.scale(random[0], random[1], random[2]);
            rock.display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        this.rocks.forEach((rock) => rock[0].enableNormalViz());
    }

    disableNormalViz() {
        this.rocks.forEach((rock) => rock[0].disableNormalViz());
    }
}
