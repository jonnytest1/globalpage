import { R3_PATCH_COMPONENT_DEF_WTIH_SCOPE } from '@angular/core/src/ivy_switch/compiler';
import { p5Module, p5Added } from './p5Module';
import * as p5 from "p5";

export class Terrain {

    private terrainData: number[][] = [];

    private rows = 200;
    private columns = 200;

    private scale = 20;
    constructor(private p5: p5Added) {
        const noise = 0.1;
        const size = 50;
        let yoff = 0;
        for (let y = 0; y < this.rows; y++) {
            let xoff = 0;
            this.terrainData[y] = [];
            for (let x = 0; x < this.columns; x++) {
                this.terrainData[y][x] = this.p5.map(this.p5.noise(xoff, yoff), 0, 1, -size, size);
                xoff += noise;
            }
            yoff += noise;
        }
    }

    draw(offset: p5.Vector) {
        this.p5.background(0);
        this.p5.noStroke();
        this.p5.fill('green')
        this.p5.translate(offset)
        // this.p5.rotateX(-this.p5.PI / 3)

        for (let x = 0; x < this.rows; x++) {
            this.p5.beginShape(this.p5.TRIANGLE_STRIP)
            for (let z = 0; z < this.columns; z++) {
                this.p5.vertex(z * this.scale, this.terrainData[z][x], x * this.scale);
                this.p5.vertex(z * this.scale, this.terrainData[z][x + 1], (x + 1) * this.scale);
            }
            this.p5.endShape();
        }
    }
}