"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    type: String, unique;
    true;
}
displayName: {
    type: String;
}
credentials: {
    username: {
        type: String, required;
        true;
    }
    password: {
        type: String, required;
        true;
    }
}
entity: {
    type: mongoose.Types.ObjectId, required;
    true, ref;
    'Entity';
}
role: {
    type: mongoose.Types.ObjectId, required;
    true, ref;
    'Role';
}
