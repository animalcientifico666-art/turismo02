"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = require("./seed");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function main() {
    console.log(seed_1.initialData);
    await Promise.all([
        prisma_1.default.productImage.deleteMany(),
        prisma_1.default.product.deleteMany(),
        prisma_1.default.category.deleteMany(),
    ]);
    await prisma_1.default.category.create({
        data: {
            name: 'Shirt',
        }
    });
    console.log('ejecutado correctamente');
}
(() => {
    main();
})();
