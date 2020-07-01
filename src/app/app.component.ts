import { Component, ViewChild, ElementRef } from '@angular/core';
import { P5Initialize } from './p5-initialite';
import { Terrain } from './terrain';
import { Player } from './player/player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends P5Initialize {

  @ViewChild('myCanvas')
  container: ElementRef<HTMLDivElement>;

  private player: Player;
  terrain: Terrain;
  title = 'globalwebpage';
  ter: any;

  font;
  constructor() {
    super();
  }

  getContainer(): HTMLElement {
    return this.container.nativeElement;
  }
  preload() {
    this.font = this.p5.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
  }

  setup() {
    this.p5.createCanvas(this.width, this.height, this.p5.WEBGL);
    this.player = new Player(this.p5);
    this.terrain = new Terrain(this.p5);
    // @ts-ignore
    this.container.nativeElement.children[0].requestPointerLock();

    this.p5.textFont(this.font, 100);
  }
  draw(): void {
    const pos = this.p5.createVector(0, 0, 60);
    this.sphere(pos, 50);
    this.terrain.draw(this.p5.createVector(-1000, -1000, -100));
    this.player.draw();
    this.p5.noCursor();

  }
}
