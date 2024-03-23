import Utils from '../../Utils';
import { Permission } from './Permission';

export default class EntityRole {

    public id: string = Utils.roleId_prefix + Utils.createId();
    public name: string;
    public permissions: Permission[];

    constructor({ id }: { id: string });
    constructor({ id, name, permissions }: { id?: string, name: string, permissions: Permission[] });
    constructor(input: any) {
        this.id = input.id || this.id;
        this.name = input.name;
        this.permissions = input.permissions || [];
    }
}