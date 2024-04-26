import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        const f0 = this.gui.addFolder('Panorama');
        f0.add(this.scene, 'displayPanorama').name('Display Panorama');

        const f1 = this.gui.addFolder('Rock Pyramid');
        f1.add(this.scene, 'displayPyramid').name('Display Pyramid')
        f1.add(this.scene, 'pyramidLevels', 0, 10, 1).name('Rock Pyramid Levels').onChange(this.scene.updatePyramidLevels.bind(this.scene));

        const f2 = this.gui.addFolder('Random Rocks');
        f2.add(this.scene, 'displayRocks').name('Display Rocks');
        f2.add(this.scene, 'nRocks', 0, 10, 1).name('Rocks Number').onChange(this.scene.updateNRocks.bind(this.scene));

        const f3 = this.gui.addFolder('Garden');
        f3.add(this.scene, 'displayGarden').name('Display Garden');
        f3.add(this.scene, 'gardenRows', 0, 10, 1).name('Garden Rows').onChange(this.scene.updateGardenRows.bind(this.scene));
        f3.add(this.scene, 'gardenCols', 0, 10, 1).name('Garden Columns').onChange(this.scene.updateGardenCols.bind(this.scene));

        const f4 = this.gui.addFolder('Bee');
        f4.add(this.scene, 'displayBee').name('Display Bee');

        return true;
    }
}
