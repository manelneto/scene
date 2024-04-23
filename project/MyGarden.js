import { CGFObject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFObject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];

        let flower;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                flower = new MyFlower(scene, 1,1,1,1,1,1,1,1,1,1);
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
