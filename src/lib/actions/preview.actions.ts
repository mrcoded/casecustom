"use server";

import { db } from "@/config/db";

import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";

import { stripe } from "@/lib/stripe";
import { authOptions } from "@/lib/authOptions";

import { BASE_PRICE, PRODUCT_PRICES } from "@/constant/product";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  try {
    //Get configuration matching the id from db
    const configuration = await db.configuration.findUnique({
      where: { id: configId },
    });

    //if no configuration
    if (!configuration) {
      throw new Error("No such configuration found!");
    }

    //Get logged in user
    const session = await getServerSession(authOptions);
    const user = session?.user;

    //if no user
    if (!user) {
      throw new Error("You need to be logged in");
    }

    //extract finish and material from configuration
    const { finish, material } = configuration;

    let price = BASE_PRICE;
    if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
    if (material === "polycarbonate")
      price += PRODUCT_PRICES.material.polycarbonate;

    //initialize order
    let order: Order | undefined = undefined;

    // Find existing order or create a new one
    const existingOrder = await db.order.findFirst({
      where: { userId: user.id, configurationId: configuration.id },
    });

    if (existingOrder) {
      order = existingOrder;
    } else {
      order = await db.order.create({
        data: {
          amount: price / 100,
          userId: user.id,
          configurationId: configuration.id,
        },
      });
    }

    //create a new product
    const product = await stripe.products.create({
      name: "Custom iPhone Case",
      images: [configuration.imageUrl],
      default_price_data: {
        currency: "USD",
        unit_amount: price,
      },
    });

    //payment session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment-completed?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["NG", "GB", "CA", "US"],
      },
      metadata: {
        userId: user.id,
        orderId: order.id,
      }, //for webhooks
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.log(error);
    throw Error;
  }
};
