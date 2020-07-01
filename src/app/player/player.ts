import * as p5 from 'p5';
import { P5Added } from '../p5Module';
import { Action } from './actions/action';
import { MoveAction } from './actions/move-action';
import { MouseAction } from './actions/mouse-action';

export class Player {


    private position: p5.Vector;

    private velocity: p5.Vector;
    private speed = 100;
    private actions: Action[];
    private camera: p5.Camera;

    look: p5.Vector;
    constructor(private p5Inner: P5Added) {
        this.position = p5Inner.createVector();
        this.velocity = p5Inner.createVector();
        this.actions = [
            new MoveAction(p5Inner),
            new MouseAction(p5Inner)
        ];

        this.camera = p5Inner.createCamera();
        this.look = p5Inner.createVector(1, 0, 0);
    }

    move(direction: p5.Vector) {
        const multiplied = direction.mult(this.speed);
        this.position.add(multiplied.copy());
    }


    action() {
        for (const action of this.actions) {
            if (action.isValid(this)) {
                action.execute(this);
            }
        }
    }
    update() {
        // this.position.add(this.velocity);
    }

    draw() {
        this.setLook(this.position.copy().add(this.look));
        this.setPos(this.position);
        this.action();
        this.update();
        // this.p5.sphre(this.position, 50);

    }

    setLook(look: p5.Vector) {
        this.camera.lookAt(look.x, look.y, look.z);
    }
    setPos(pos: p5.Vector) {
        this.camera.setPosition(pos.x, pos.y, pos.z);
    }
}
