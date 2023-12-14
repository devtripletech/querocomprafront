"use server"

import { cookies } from "next/headers"

import type { CartLineItem, CheckoutItem } from "@/types"

import { z } from "zod"

import { checkoutItemSchema } from "@/lib/validations/cart"
import type { getOrderLineItemsSchema } from "@/lib/validations/order"

export async function getOrderLineItemsAction(
  input: z.infer<typeof getOrderLineItemsSchema> & {
    paymentIntent?: any | null
  }
): Promise<CartLineItem[]> {
  try {
    const safeParsedItems = z
      .array(checkoutItemSchema)
      .safeParse(JSON.parse(input.items ?? "[]"))

    if (!safeParsedItems.success) {
      throw new Error("Could not parse items.")
    }

    const lineItems = [] as any

    // Temporary workaround for payment_intent.succeeded webhook event not firing in production
    // TODO: Remove this once the webhook is working
    if (input.paymentIntent?.status === "succeeded") {
      const cartId = Number(cookies().get("cartId")?.value)

      const cart = {} as any

      if (!cart || cart.closed) {
        return lineItems
      }

      if (!cart.clientSecret || !cart.paymentIntentId) {
        return lineItems
      }

      const payment = {} as any

      if (!payment?.stripeAccountId) {
        return lineItems
      }

      // Create new address in DB
      const stripeAddress = input.paymentIntent.shipping?.address

      const newAddress = {} as any

      if (!newAddress.insertId) throw new Error("No address created.")

      // Create new order in db
      // await db.insert(orders).values({
      //   storeId: payment.storeId,
      //   items: input.items as unknown as CheckoutItem[],
      //   quantity: safeParsedItems.data.reduce(
      //     (acc, item) => acc + item.quantity,
      //     0
      //   ),
      //   amount: String(Number(input.paymentIntent.amount) / 100),
      //   stripePaymentIntentId: input.paymentIntent.id,
      //   stripePaymentIntentStatus: input.paymentIntent.status,
      //   name: input.paymentIntent.shipping?.name,
      //   email: input.paymentIntent.receipt_email,
      //   addressId: Number(newAddress.insertId),
      // })

      // Update product inventory in db
      for (const item of safeParsedItems.data) {
        const product = {} as any

        if (!product) {
          return lineItems
        }

        const inventory = product.inventory - item.quantity

        if (inventory < 0) {
          return lineItems
        }

        // await db
        //   .update(products)
        //   .set({
        //     inventory: product.inventory - item.quantity,
        //   })
        //   .where(eq(products.id, item.productId))
      }

      // await db
      //   .update(carts)
      //   .set({
      //     closed: true,
      //     items: [],
      //   })
      //   .where(eq(carts.paymentIntentId, cart.paymentIntentId))
    }

    return lineItems
  } catch (err) {
    console.error(err)
    return []
  }
}
