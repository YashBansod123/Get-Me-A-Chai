import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import Razorpay from "razorpay";
import User from "@/models/User";

export async function POST(request) {
    await connectDb();
    
    let body = await request.formData();
    body = Object.fromEntries(body)

    let p = await Payment.findOne({ oid: body.razorpay_order_id });

    if(!p){
        return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }
    //fetcch the secret of the user from the database
    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret

    let xx =  validatePaymentVerification({
        "payment_id": body.razorpay_payment_id,
        "order_id": body.razorpay_order_id},
         body.razorpay_signature
        ,secret);   

    if(xx){
       const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true },{new: true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=true`);

    }
    else{
        return NextResponse.json({ message: "Payment failed" }, { status: 400 });
    }

    
}