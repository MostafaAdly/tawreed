import { Permission } from './Permission';
export default class EntityRole {
    id: string;
    permissions: Permission[];
    constructor(id: string);
    constructor(id: string, permissions: Permission[]);
}
