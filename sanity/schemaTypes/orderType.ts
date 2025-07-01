
import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    defineField({ name: "customerName", title: "Customer Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Customer Email", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({ name: "clerkUserId", title: "Clerk User ID", type: "string", validation: (Rule) => Rule.required() }),
    
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ 
              name: "product", 
              title: "Product", 
              type: "reference", 
              to: [{ type: "product" }], 
              validation: (Rule) => Rule.required() 
            }),

            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "XS", value: "XS" }, { title: "S", value: "S" }, { title: "M", value: "M" }, 
                  { title: "L", value: "L" }, { title: "XL", value: "XL" }, { title: "6", value: "6" }, 
                  { title: "8", value: "8" }, { title: "10", value: "10" }, { title: "12", value: "12" }, 
                  { title: "14", value: "14" }, { title: "34", value: "34" }, { title: "36", value: "36" }, 
                  { title: "38", value: "38" }, { title: "40", value: "40" }, { title: "42", value: "42" }, 
                  { title: "7", value: "7" }, { title: "9", value: "9" }, { title: "11", value: "11" }, 
                  { title: "13", value: "13" }, { title: "15", value: "15" }, { title: "5", value: "5" }, 
                  { title: "3", value: "3" }, { title: "4", value: "4" }, { title: "35", value: "35" }, 
                  { title: "37", value: "37" }, { title: "39", value: "39" }, { title: "41", value: "41" }, 
                  { title: "22", value: "22" }, { title: "23", value: "23" }, { title: "24", value: "24" }, 
                  { title: "25", value: "25" }, { title: "26", value: "26" }, { title: "27", value: "27" }, 
                  { title: "28", value: "28" },
                ],
              },
             
            }),

            defineField({ name: "quantity", title: "Quantity", type: "number", validation: (Rule) => Rule.required().min(1) }),
            defineField({ name: "price", title: "Price Per Unit", type: "number", validation: (Rule) => Rule.required().min(0) }),
            defineField({ name: "currency", title: "Currency", type: "string", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),

    defineField({ name: "totalPrice", title: "Total Price", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "currency", title: "Currency", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "amountDiscounted", title: "Amount Discounted", type: "number", validation: (Rule) => Rule.required() }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: { list: ["pending", "paid", "shipped", "delivered", "cancelled"] },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: "stripeSessionId", title: "Stripe Session ID", type: "string" }),
    defineField({ name: "stripePaymentId", title: "Stripe Payment ID", type: "string" }),
    defineField({ name: "paid", title: "Paid", type: "boolean", initialValue: false }),
    defineField({ name: "orderDate", title: "Order Date", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],

  preview: {
    select: {
      customerName: "customerName",
      email: "email",
      totalPrice: "totalPrice",
      currency: "currency",
      stripeSessionId: "stripeSessionId",
      product: "products.0.product",
      size: "products.0.size",
      quantity: "products.0.quantity",
      price: "products.0.price",
      productImage: "products.0.productImage",
    },
    prepare(selection) {
      const { customerName, email, totalPrice, currency, stripeSessionId, product, size, quantity, price, productImage } = selection;
      const orderIdSnippet = stripeSessionId ? `${stripeSessionId.slice(0, 5)}...${stripeSessionId.slice(-5)}` : "N/A";

      return {
        title: `${customerName} (${orderIdSnippet})`,
        subtitle: `${totalPrice} ${currency}, ${email}`,
        description: product ? `${product} (Size: ${size}) x ${quantity}, $${price * quantity}` : "No products",
        media: productImage,  
      };
    },
  },
});
