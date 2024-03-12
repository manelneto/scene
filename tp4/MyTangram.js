import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { CGFappearance } from "../lib/CGF.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.paralellogram = new MyParallelogram(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene);
        this.triangleSmall2 = new MyTriangleSmall(scene);
        this.triangleBig1 = new MyTriangleBig(scene);
        this.triangleBig2 = new MyTriangleBig(scene);

        this.initMaterials();
	}

    initMaterials() {
        // Green (Diamond)
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.green.setDiffuse(0, 1, 0, 1.0);
        this.green.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.green.setShininess(10.0);

        // Pink (Triangle)
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.pink.setDiffuse(1, 155/255, 207/255, 1.0);
        this.pink.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.pink.setShininess(10.0);

        // Yellow (Paralellogram)
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.yellow.setDiffuse(1, 1, 0, 1.0);
        this.yellow.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.yellow.setShininess(10.0);

        // Purple (TriangleSmall1)
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.purple.setDiffuse(150/255, 80/255, 190/255, 1.0);
        this.purple.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.purple.setShininess(10.0);

        // Red (TriangleSmall2)
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.red.setDiffuse(1, 27/155, 27/155, 1.0);
        this.red.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.red.setShininess(10.0);

        // Orange (TriangleBig1)
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.orange.setDiffuse(1, 155/255, 0, 1.0);
        this.orange.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.orange.setShininess(10.0);

        // Blue (TriangleBig2)
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.0, 0.0, 0.0, 1.0);
        this.blue.setDiffuse(0, 155/255, 1, 1.0);
        this.blue.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.blue.setShininess(10.0);

        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        var translate = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.9, Math.sqrt(2) + 0.87 , 0, 1
          ];
      
        var rotate = [
            Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6), 0, 0,
            -Math.sin(-Math.PI / 6), Math.cos(-Math.PI / 6), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        
        this.scene.pushMatrix();
        this.scene.multMatrix(translate);
        this.scene.multMatrix(rotate);
        //this.green.apply();
        this.tangramMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.orange.apply();
        this.triangleBig1.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2) ,0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.blue.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.translate(-1.81, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.yellow.apply();
        this.paralellogram.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-4.9, 0.1, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.purple.apply();
        this.triangleSmall1.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -2 * Math.sqrt(2), 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -4.3, 0);
        this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
        this.red.apply();
        this.triangleSmall2.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.paralellogram.enableNormalViz();
        this.triangleSmall1.enableNormalViz();
        this.triangleSmall2.enableNormalViz();
        this.triangleBig1.enableNormalViz();
        this.triangleBig2.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.paralellogram.disableNormalViz();
        this.triangleSmall1.disableNormalViz();
        this.triangleSmall2.disableNormalViz();
        this.triangleBig1.disableNormalViz();
        this.triangleBig2.disableNormalViz();
    }
}
