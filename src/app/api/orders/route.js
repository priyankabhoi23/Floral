import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let orders;
    if (email) {
      orders = await prisma.order.findMany({
        where: { email },
        orderBy: { date: 'desc' }
      });
    } else {
      orders = await prisma.order.findMany({
        orderBy: { date: 'desc' }
      });
    }
    
    return Response.json(orders);
  } catch (e) {
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const orders = await prisma.order.findMany();
    let newIdNum = 1000;
    if (orders.length > 0) {
      const maxId = Math.max(...orders.map(o => parseInt(o.id.replace("ORD-", "")) || 0));
      newIdNum = maxId > 0 ? maxId + 1 : 1000;
    }
    
    const newOrder = await prisma.order.create({
      data: {
        id: `ORD-${newIdNum}`,
        customer: data.customer || "Unknown",
        email: data.email || "", 
        product: data.product || "Custom Order",
        amount: data.amount || 0,
        address: data.address || "",
        date: new Date().toISOString().split("T")[0],
        status: "Processing"
      }
    });
    
    return Response.json(newOrder, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return Response.json({ error: "id and status required" }, { status: 400 });
    
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) return Response.json({ error: "Order not found" }, { status: 404 });
    
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status }
    });
    
    return Response.json(updatedOrder);
  } catch (e) {
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
