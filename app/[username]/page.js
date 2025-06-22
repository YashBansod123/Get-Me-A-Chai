// app/username/[username]/page.jsx
import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDb from '@/db/connectDb';
import User from '@/models/User';

const Username = async ({ params }) => {
  await connectDb();

  const user = await User.findOne({ username: params.username });

  if (!user) return notFound();

  return <PaymentPage username={params.username} />;
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} Profile Page - Get Me a Chai`,
    description: 'Learn more about Get Me a Chai',
  };
}
