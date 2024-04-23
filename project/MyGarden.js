import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];

        let flower;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                flower = new MyFlower(scene, (Math.random() * (7 - 3) + 3) / 2, 8, [0.9, 0.9, 0.9], 1, [1, 0.9, 0.2], 0.5, 3, [0.45, 0.75, 0.2], [0.45, 0.75, 0.2], 0, 0);
                this.flowers.push(flower);
            }
        }
    }

    display() {
        let flower;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                flower = this.flowers[row * col + col];

                this.scene.pushMatrix();
                this.scene.translate(row * 10, 0, col * 10);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }

    enableNormalViz() {
        this.flowers.forEach((flower) => flower.enableNormalViz());
    }

    disableNormalViz() {
        this.flowers.forEach((flower) => flower.disableNormalViz());
    }
}
