import { stripe } from "@/lib/stripe";
import { absoluteURL } from "@/lib/utils";
import Subscription from "@/models/subscriptionModel";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const settingsUrl = absoluteURL("settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorised", { status: 400 });
    }
    const userSubscription = await Subscription.findOne({ userId: userId });
    // let stripeSession;
    if (userSubscription && userSubscription.stripeId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeId,
        return_url: settingsUrl,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user!.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Panda PRO",
              description: "PRO PANDA SUBSCRIPTION",
            },
            unit_amount: 400000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("STRIPE_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
