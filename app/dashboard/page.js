"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile, fetchUser } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({});

  useEffect(() => {
    getData();
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const getData = async () => {
    let u = await fetchUser(session.user.name);
    setForm(u);
  };
  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name);
    toast("Profile Updated", {
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
      <div className="min-h-screen  text-white flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">
          Setup Your Developer Profile ⚙️
        </h1>
        <p className="mb-6 text-gray-400 text-center max-w-lg">
          Fill the details below so your followers can support you via Razorpay.
        </p>

        <form
          action={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="e.g. Yash Bansod"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Username (unique)
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="e.g. yashdev"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="you@example.com"
            />
          </div>

          {/* Profile Pic URL */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Profile Picture URL
            </label>
            <input
              name="profilepic"
              type="url"
              value={form.profilepic}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="https://..."
            />
          </div>

          {/* Cover Pic URL */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Cover Picture URL
            </label>
            <input
              name="coverpic"
              type="url"
              value={form.coverpic}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="https://..."
            />
          </div>

          {/* Razorpay Id */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Razorpay Key ID
            </label>
            <input
              name="razorpayid"
              type="text"
              value={form.razorpayid}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="rzp_test_**********"
            />
          </div>

          {/* Razorpay Secret */}
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Razorpay Secret
            </label>
            <input
              name="razorpaysecret"
              type="password"
              value={form.razorpaysecret}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
              placeholder="••••••••"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white py-2 rounded-lg font-semibold transition"
          >
            Save Profile ✅
          </button>
        </form>

        <button
          onClick={() => signOut()}
          className="mt-6 text-red-400 hover:text-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
