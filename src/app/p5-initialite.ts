import { AfterViewInit } from '@angular/core';
import { p5Module } from './p5Module';

import * as p5 from 'p5';
export abstract class p5Initialize extends p5Module implements AfterViewInit {

    protected height: number;
    protected width: number;


    abstract getContainer(): HTMLElement;

    p5Init(p5: p5) {
        p5.draw = () => this.draw.call(this);
        p5.setup = () => this.setup.call(this);
        p5.keyPressed = () => this.keyPressed.call(this);
        p5.preload = () => this.preload.call(this);
    }

    keyPressed() {
    }

    abstract draw(): void;

    setup() {
        this.p5.createCanvas(this.width, this.height);
    }
    preload() {

    }
    ngAfterViewInit(): void {
        const comp = this.getContainer();
        this.height = comp.offsetHeight;
        this.width = comp.offsetWidth;
        // @ts-ignore
        this.p5 = this.add(new this.p5((p) => this.p5Init.call(this, p), comp));
    }

}

