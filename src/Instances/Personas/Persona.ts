import { v4 as uuid } from 'uuid';
import Utils from '../../Utils';
export default class Persona {

    public id: string = Utils.personaId_prefix + Utils.createId();

    constructor() {
    }
}