import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "src", "data");

async function main() {
  console.log("Seeding database...");

  // Seed Products
  try {
    const productsPath = path.join(DATA_DIR, "products.json");
    const productsData = JSON.parse(await fs.readFile(productsPath, "utf8"));

    for (const product of productsData) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          basePrice: product.basePrice,
          description: product.description || "",
          image: product.image || "",
          trending: product.trending || false,
          categories: JSON.stringify(product.categories || []),
          options: JSON.stringify(product.options || {}),
        },
      });
    }
    console.log(`Seeded ${productsData.length} products.`);
  } catch (error) {
    console.error("Error seeding products:", error);
  }

  // Seed Orders
  try {
    const ordersPath = path.join(DATA_DIR, "orders.json");
    const ordersData = JSON.parse(await fs.readFile(ordersPath, "utf8"));

    for (const order of ordersData) {
      await prisma.order.upsert({
        where: { id: order.id },
        update: {},
        create: {
          id: order.id,
          customer: order.customer,
          email: order.email,
          product: order.product,
          amount: order.amount,
          address: order.address || "",
          date: order.date,
          status: order.status,
        },
      });
    }
    console.log(`Seeded ${ordersData.length} orders.`);
  } catch (error) {
    console.error("Error seeding orders:", error);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
