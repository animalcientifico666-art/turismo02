"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = require("./seed");
const prisma_1 = __importDefault(require("../lib/prisma"));
async function main() {
    console.log(seed_1.initialData);
    await prisma_1.default.user.deleteMany();
    await prisma_1.default.productImage.deleteMany();
    await prisma_1.default.product.deleteMany();
    await prisma_1.default.category.deleteMany();
    const { categories, products, users } = seed_1.initialData;
    await prisma_1.default.user.createMany({
        data: users
    });
    const categoriesData = categories.map((name) => ({ name }));
    await prisma_1.default.category.createMany({
        data: categoriesData
    });
    const categoriesDB = await prisma_1.default.category.findMany();
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {});
    console.log(categoriesDB);
    for (const product of products) {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma_1.default.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id,
        }));
        await prisma_1.default.productImage.createMany({
            data: imagesData
        });
    }
    console.log('ejecutado correctamente');
}
(() => {
    main();
})();
