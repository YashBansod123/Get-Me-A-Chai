"use server";
import Razorpay from "razorpay";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';


export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();
   let user = await User.findOne({ username: to_username });
   const secret = user.razorpaysecret
  
  

  if (!paymentform?.name || !to_username || amount) {
    throw new Error("Missing required fields: name, to_user, or amount");
  }

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount)*100, // ensure amount is in paisa (₹1 = 100)
    currency: "INR"
  };

  let order = await instance.orders.create(options);

  // Create a pending payment record
  await Payment.create({
    name: paymentform.name,
    message: paymentform.message || "",
    amount: amount,
    oid: order.id,
    to_user: to_username,
    done: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return order;
};

export default initiate;

export const fetchUser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username });
  // if(!u){
  //     throw("User not found");
  // }
  let user = u.toObject({flattenObjectIds: true})
  return user;
};
export const fetchpayments = async (username) =>{
    await connectDb();
    //find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).lean().limit(10);

    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }   
        await User.updateOne({email: ndata.email}, ndata)
    //     //Now Updtaes all payments to the new username
     await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username } )
     } 
     else{
        
        await User.updateOne({email: ndata.email}, ndata)
    
     }

  }