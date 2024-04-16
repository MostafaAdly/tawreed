"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class EntityRoleSchema extends mongoose_1.Schema {
    constructor({ id, options, schema = {
        roleId: String,
        name: String,
        permissions: [String],
        priority: Number
    } }) {
        if (id === null || id === void 0 ? void 0 : id.enabled)
            schema[id.key] = id.value;
        super(schema, options);
        this.model = "EntityRole";
    }
}
exports.default = EntityRoleSchema;
