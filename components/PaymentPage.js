"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import initiate from "@/actions/useractions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUser, fetchpayments } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";
import { searchParams } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name:"",
    message:"",
    amount:"", 
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { data: session } = useSession();
  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };
 useEffect(() => {
  if (searchParams.get("paymentDone") === "true") {
    toast("Payment Done", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  router.push(`/${username}`);
}, [searchParams, router, username]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/userdata?username=${username}`);
        const data = await res.json();

        setCurrentUser(data.user);
        setPayments(data.payments);
        console.log("current user", data.user, data.payments);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    getData();
  }, [username]);
  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let order_Id = a.id;

    if (typeof window !== "undefined") {
      const options = {
        key: process.env.NEXT_PUBLIC_KEY_ID,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "BuyMeAChai",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order_Id,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: paymentform.name,
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true, // ✅ force UPI only
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
       
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <div className="cover w-full ">
       <Image className="object-cover w-full" src="/patreon_banner.gif" alt="" />
        <div className="w-[100px] h-[120px]  absolute my-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
         <Image
            className="object-contain  border border-white rounded-lg"
            src={currentUser?.profilepic || "/cat1.jpg"}
            alt=""
          />
        </div>
      </div>
      <div className="info flex items-center justify-center flex-col my-10 mt-20">
        <h2 className="text-2xl font-bold">@{username}</h2>
        <div className="text-slate-400">Lets help @{username} gets a Chai</div>
        <div className="text-slate-400 text-center">
          {payments?.length || 0} Supporters. {currentUser?.name || "Someone"}{" "}
          has raised ₹{payments?.reduce((a, b) => a + b.amount, 0) || 0} for
          this project.
        </div>
        <div className="payment flex flex-col md:flex-row gap-3 w-[80%] mt-11">
          <div className="supoorters md:w-1/2 w-full bg-gray-800 rounded-lg p-10">
            <h2 className=" text-white text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="text-white ">
              {payments.length == 0 && (
                <li className=" flex items-center gap-2 ">
                 <Image
                    src="avatar.gif"
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <span>No one donated yet</span>
                </li>
              )}
              {payments.map((payment, i) => (
                <li key={i} className=" flex items-center gap-2 ">
                 <Image
                    src="avatar.gif"
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <span>
                    {payment.name} donated{" "}
                    <span className="font-bold ">₹{payment.amount}</span> With
                    Message &quot;{payment.message}&quot;
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="makepayment md:w-1/2 w-full bg-gray-800 rounded-lg">
            <div className="flex flex-col  gap-2 p-10">
              <input
                type="text"
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                placeholder="Enter Name"
                 className="w-full p-2 border border-slate-300 bg-gray-700 rounded-lg"
              ></input>
              <input
                type="text"
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                placeholder="Enter message"
                 className="w-full p-2 border border-slate-300 bg-gray-700 rounded-lg"
              ></input>
              <input
                type="number"
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                placeholder="Enter Amount"
                className="w-full p-2 border border-slate-300 bg-gray-700 rounded-lg"
              ></input>
              <button
                onClick={() => pay(paymentform.amount)}
                type="button"
                disabled={
                  paymentform.amount < 1 ||
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className=" disabled:cursor-not-allowed cursor-pointer mt-4 bg-gradient-to-r from-white to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
              >
                Pay
              </button>
            </div>
            {/* Or Choose from this amount */}
            <div className="flex flex-col md:flex-row gap-2 mx-10 mb-10 overflow-auto">
              <button
                onClick={() => pay(300)}
                type="button"
                disabled={
                  
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className="disabled:cursor-not-allowed border cursor-pointer border-slate-300 bg-slate-400 hover:bg-slate-600 p-2 rounded-lg "
              >
                Pay ₹300
              </button>
              <button
                onClick={() => pay(500)}
                disabled={
                  
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className="disabled:cursor-not-allowed border cursor-pointer border-slate-300 bg-slate-400 hover:bg-slate-600 p-2 rounded-lg "
              >
                Pay ₹500
              </button>
              <button
                onClick={() => pay(700)}
                disabled={
                  paymentform.amount.length < 1 ||
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className="disabled:cursor-not-allowed border cursor-pointer border-slate-300 bg-slate-400 hover:bg-slate-600 p-2 rounded-lg "
              >
                Pay ₹700
              </button>
              <button
                onClick={() => pay(930)}
                disabled={
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className="disabled:cursor-not-allowed border cursor-pointer border-slate-300 bg-slate-400 hover:bg-slate-600 p-2 rounded-lg "
              >
                Pay ₹930
              </button>
              <button
                onClick={() => pay(1200)}
                disabled={
                 
                  paymentform.name.length < 3 ||
                  paymentform.message.length < 3
                }
                className=" disabled:cursor-not-allowed cursor-pointer border-slate-300 bg-slate-400 hover:bg-slate-600 p-2 rounded-lg "
              >
                Pay ₹1200
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
