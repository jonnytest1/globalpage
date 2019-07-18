import { Player } from '../player';
import { p5Added } from '../../p5Module';

export abstract class Action {
    constructor(protected p5: p5Added) { }

    isValid(player: Player) {
        return true;
    }

    abstract execute(player: Player);

}