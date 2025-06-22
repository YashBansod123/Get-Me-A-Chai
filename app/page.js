import Image from "next/image";
import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className=" text-white">
      <div className="flex flex-col gap-5 items-center justify-center h-[44vh]">
        <div className="text-5xl md:flex font-bold items-center justify-center">
          <span className="flex justify-center items-center ">Buy Me A Chai</span>
          <span className="flex justify-center items-center">
            <img className="InvertImg " src="/tea.gif" width={88} alt="Chai" />
          </span>
        </div>
        <p className=" text-center">
          A crowdfunding platfrom for developers. Get funded by your fans and
          followers. Start Now!
        </p>
        <div>
          <Link href="/login">
          <button
            type="button"
            className="text-white mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          </Link>
          <Link href="/about">
          <button
            type="button"
            className="text-white mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
          </Link>
        </div>
      </div>
      <div className="h-[2px] mt-4 bg-gradient-to-r from-purple-500 to-pink-500 opacity-45"></div>
      <div className="flex flex-col gap-5 items-center justify-center  py-16">
        <h1 className="text-center text-3xl font-bold">Your fans can buy you Chai</h1>
        <div className="md:flex  justify-around gap-46 md:mt-5 ">
          <div className="item flex flex-col items-center justify-center mb-8 ">
            <img
              className="mb-4 flex flex-col rounded-full bg-amber-200 p-3 text-black my-10"
              src="/man.gif"
              width={78}
              alt="Man"
            />
            <p className="font-bold">Fund Your Project</p>
            <p>Your Fans are available to help you</p>
          </div>
          <div className="item flex flex-col items-center justify-center mb-8">
            <img
              className="mb-4 flex flex-col rounded-full bg-amber-200 p-3 text-black"
              src="/coin.gif"
              width={78}
              alt="Man"
            />
            <p className="font-bold">Fund Your Project</p>
            <p>Your Fans are available to help you</p>
          </div>
          <div className="item flex flex-col items-center justify-center mb-8 ">
            <img
              className="mb-4 flex flex-col rounded-full bg-amber-200 p-3 text-black"
              src="/group.gif"
              width={78}
              alt="Man"
            />
            <p className="font-bold">Fans Wants to help You</p>
            <p>Your Fans are available to help you</p>
          </div>
        </div>
      </div>
      <div className="h-[2px] mt-4 bg-gradient-to-r from-purple-500 to-pink-500 space-y-4 opacity-45"></div>
      <div className="flex flex-col items-center justify-center  py-14">
                <h1 className="text-3xl font-bold mb-4">Learn More About Chai ☕</h1>

        <iframe
          className="mt-5 rounded-2xl border border-amber-50"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/57HlOheYTzY?si=TNApVrThUW8WfoXO"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
