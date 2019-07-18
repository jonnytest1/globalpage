import * as p5 from "p5";
import { p5Added } from '../p5Module';
import { Action } from './actions/action';
import { MoveAction } from './actions/move-action';
import { MouseAction } from './actions/mouse-action';

export class Player {


    private position: p5.Vector

    private velocity: p5.Vector
    private speed = 100;
    private actions: Action[]
    private camera: p5.Camera;

    look: p5.Vector
    constructor(private p5: p5Added) {
        this.position = p5.createVector();
        this.velocity = p5.createVector();
        this.speed
        this.actions = [
            new MoveAction(p5),
            new MouseAction(p5)
        ]

        this.camera = p5.createCamera();
        this.look = p5.createVector(1, 0, 0);
    }

    move(direction: p5.Vector) {
        const multiplied = direction.mult(this.speed)
        this.position.add(multiplied.copy());
    }


    action() {
        for (let action of this.actions) {
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
        //this.p5.sphre(this.position, 50);

    }

    setLook(look: p5.Vector) {
        this.camera.lookAt(look.x, look.y, look.z)
    }
    setPos(pos: p5.Vector) {
        this.camera.setPosition(pos.x, pos.y, pos.z);
    }
}