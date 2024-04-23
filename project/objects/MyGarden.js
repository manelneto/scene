import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];

        let flower, flowerRadius, petalsNumber, receptacleRadius, stemRadius, stemNumber, minUnionAngle, maxUnionAngle;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                flowerRadius = this.generateRandom(3, 7) / 2;
                petalsNumber = Math.floor(this.generateRandom(6, 13));
                receptacleRadius = this.generateRandom(flowerRadius / 6, flowerRadius / 3);
                stemRadius = this.generateRandom(0.1, receptacleRadius / 4);
                stemNumber = Math.floor(this.generateRandom(1, 5));
                minUnionAngle = Math.PI/16;
                maxUnionAngle = Math.PI/10;
                flower = new MyFlower(scene, flowerRadius, petalsNumber, [0.9, 0.9, 0.9], receptacleRadius, [1, 0.9, 0.2], stemRadius, stemNumber, [0.45, 0.75, 0.2], [0.35, 0.65, 0.1], minUnionAngle, maxUnionAngle);
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

    generateRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
}
