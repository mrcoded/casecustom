import { db } from "@/config/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import OrderRecievedEmail from "@/components/emails/OrderRecievedEmail";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature") as string;

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    //verify it is coming from stripe event
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (!event) {
      throw new Error("Invalid Stripe Event");
    }
    //user already paid
    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }

      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata ?? {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.customer_details!.address;

      await db.order.update({
        where: {
          id: orderId!,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: shippingAddress!.city!,
              country: shippingAddress!.country!,
              postalCode: shippingAddress!.postal_code!,
              street: shippingAddress!.line1!,
              state: shippingAddress!.state!,
            },
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state!,
            },
          },
        },
      });

      //   await resend.emails.send({
      //     from: "CaseCustom <de*****@gmail.com>",
      //     to: [event.data.object.customer_details.email],
      //     subject: "Thanks for your order!",
      //     react: OrderRecievedEmail({
      //       orderId,
      //       orderDate: updatedOrder.createdAt.toLocaleDateString(),
      //       //@ts-ignore
      //       shippingAddress: {
      //         name: session.customer_details!.name!,
      //         city: shippingAddress!.city!,
      //         country: shippingAddress!.country!,
      //         postalCode: shippingAddress!.postal_code!,
      //         street: shippingAddress!.line1!,
      //         state: shippingAddress!.state!,
      //       },
      //     }),
      //   });
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, ok: false }, { status: 502 });
  }
}
