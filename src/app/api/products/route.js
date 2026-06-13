import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    
    // Parse categories and options from JSON strings
    const parsedProducts = products.map(product => ({
      ...product,
      categories: JSON.parse(product.categories),
      options: JSON.parse(product.options)
    }));

    return Response.json(parsedProducts);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    if (!newProduct.name || !newProduct.basePrice) {
      return Response.json({ error: "Name and base price are required" }, { status: 400 });
    }

    const slug = newProduct.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const id = slug || `product-${Date.now()}`;

    // Verify uniqueness
    const existing = await prisma.product.findUnique({ where: { slug: id } });
    if (existing) {
      return Response.json({ error: "A product with this name already exists" }, { status: 400 });
    }

    const createdProduct = await prisma.product.create({
      data: {
        id,
        slug: id,
        name: newProduct.name,
        basePrice: Number(newProduct.basePrice),
        description: newProduct.description || "",
        image: newProduct.image || "/floral_hoodie.png",
        trending: !!newProduct.trending,
        categories: JSON.stringify(newProduct.categories || []),
        options: JSON.stringify(newProduct.options || {
          colors: null, sizes: null, shapes: null, models: null, flowers: null, palettes: null, backgrounds: null, customText: { enabled: false }, addOns: []
        })
      }
    });

    const parsedProduct = {
      ...createdProduct,
      categories: JSON.parse(createdProduct.categories),
      options: JSON.parse(createdProduct.options)
    };

    return Response.json(parsedProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedProduct = await request.json();
    if (!updatedProduct.id || !updatedProduct.name || !updatedProduct.basePrice) {
      return Response.json({ error: "ID, name, and base price are required" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id: updatedProduct.id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const product = await prisma.product.update({
      where: { id: updatedProduct.id },
      data: {
        name: updatedProduct.name,
        basePrice: Number(updatedProduct.basePrice),
        description: updatedProduct.description || existing.description,
        image: updatedProduct.image || existing.image,
        trending: !!updatedProduct.trending,
        categories: JSON.stringify(updatedProduct.categories || JSON.parse(existing.categories)),
        options: JSON.stringify(updatedProduct.options || JSON.parse(existing.options))
      }
    });

    const parsedProduct = {
      ...product,
      categories: JSON.parse(product.categories),
      options: JSON.parse(product.options)
    };

    return Response.json(parsedProduct);
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
