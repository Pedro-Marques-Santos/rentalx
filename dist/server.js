"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (request, response) => {
    return response.json({ message: "Hello word" });
});
app.get("/courses", (request, response) => {
    const { name } = request.body;
    return response.json({ name });
});
app.listen(3000);
