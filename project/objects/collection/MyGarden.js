import { CGFobject } from '../../../lib/CGF.js';
import { MyFlower } from '../compound/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];
        this.flowersCoords = [];

        this.offset = 10;

        let flower, flowerRadius, petalsNumber, stemRadius, stemNumber, minUnionAngle, maxUnionAngle;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                flowerRadius = this.generateRandom(3, 7) / 2;
                petalsNumber = Math.floor(this.generateRandom(6, 9));
                this.receptacleRadius = this.generateRandom(flowerRadius / 6, flowerRadius / 4);
                stemRadius = this.generateRandom(0.1, this.receptacleRadius / 4);
                stemNumber = Math.floor(this.generateRandom(2, 4));
                minUnionAngle = Math.PI/16;
                maxUnionAngle = Math.PI/12;
                flower = new MyFlower(scene, flowerRadius, petalsNumber, [0.9, 0.9, 0.9], this.receptacleRadius, [1, 0.9, 0.2], stemRadius, stemNumber, [0.45, 0.75, 0.2], [0.35, 0.65, 0.1], minUnionAngle, maxUnionAngle);
                this.flowers.push(flower);
                this.flowersCoords.push([col * (flower.x + this.offset), flower.y, row * this.offset]);
            }
        }
    }

    hasFlower(x, y, z) {
        let flowerX, flowerY, flowerZ;
        for (const flowerCoords of this.flowersCoords) {
            flowerX = flowerCoords[0];
            flowerY = flowerCoords[1];
            flowerZ = flowerCoords[2];
            if (Math.abs(flowerX - x) <= this.receptacleRadius && y - flowerY <= 0.5 && y - flowerY >= 0 && Math.abs(flowerZ - z) <= this.receptacleRadius) {
                return true;
            }
        }
        return false;
    }

    display() {
        let flower;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                flower = this.flowers[row * this.columns + col];

                this.scene.pushMatrix();
                this.scene.translate(col * this.offset, 0, row * this.offset);
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
