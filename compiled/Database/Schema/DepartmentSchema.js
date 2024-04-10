"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class DepartmentSchema extends mongoose_1.Schema {
    constructor({ id, options, schema = {
        departmentId: String,
        name: String,
        images: [String]
    } }) {
        if (id === null || id === void 0 ? void 0 : id.enabled)
            schema[id.key] = id.value;
        super(schema, options);
        this.model = "Department";
    }
}
exports.default = DepartmentSchema;
