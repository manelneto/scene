import { CGFobject } from '../../../lib/CGF.js';
import { MyUtils } from '../../MyUtils.js';
import { MyFlower } from '../compound/MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 * @param rows - Number of rows with flowers
 * @param columns - Number of columns with flowers
 */
export class MyGarden extends CGFobject {
    constructor(scene, rows, columns) {
        super(scene);
        this.rows = rows;
        this.columns = columns;
        this.flowers = [];
        this.flowersCoords = [];

        this.offset = 10;   // offset between consecutive rows/columns

        const minUnionAngle = Math.PI/16;
        const maxUnionAngle = Math.PI/12;
        let flowerRadius, petalsNumber, receptacleRadius, stemRadius, stemNumber, flower;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                flowerRadius = MyUtils.generateRandom(3, 7) / 2;
                petalsNumber = Math.floor(MyUtils.generateRandom(6, 9));
                receptacleRadius = MyUtils.generateRandom(flowerRadius / 6, flowerRadius / 4);
                stemRadius = MyUtils.generateRandom(0.1, receptacleRadius / 4);
                stemNumber = Math.floor(MyUtils.generateRandom(2, 4));
                flower = new MyFlower(scene, flowerRadius, petalsNumber, [0.9, 0.9, 0.9, 1.0], receptacleRadius, [1, 0.9, 0.2, 1.0], stemRadius, stemNumber, [0.45, 0.75, 0.2, 1.0], [0.35, 0.65, 0.1, 1.0], minUnionAngle, maxUnionAngle);
                this.flowers.push(flower);
                this.flowersCoords.push([col * (flower.x + this.offset), flower.y, row * this.offset]);
            }
        }
    }

    /**
     * Returns the flower at a given position, or null it there is not any flower at that position.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     * @returns a Flower object or null
     */
    getFlower(x, y, z) {
        let flower, flowerCoords, flowerX, flowerY, flowerZ;
        for (let i = 0; i < this.flowers.length; i++) {
            flower = this.flowers[i];
            flowerCoords = this.flowersCoords[i];
            flowerX = flowerCoords[0];
            flowerY = flowerCoords[1];
            flowerZ = flowerCoords[2];
            if (Math.abs(flowerX - x) <= flower.getReceptacleRadius() && y - flowerY <= 0.5 && y - flowerY >= 0 && Math.abs(flowerZ - z) <= flower.getReceptacleRadius()) {
                return this.flowers[i];
            }
        }
        return null;
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
}
