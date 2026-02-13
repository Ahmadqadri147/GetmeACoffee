import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>

        <div className="flex items-center text-center justify-center flex-col  text-white">
          <div className=" flex gap-5 justify-center items-center text-5xl font-extrabold c5 cursor-pointer pt-15 p-5">Buy me a coffee <span className="pb-5"><img src="/coffee.gif" width={50} alt="" /></span></div>
          <h1 className=" text-pink-400 text-lg">A crowdfunding platform for creators. Get funded by your fans and supporters. Start your journey today!</h1>
          <div className="flex gap-3">
            <button className="text-amber-200 cursor-pointer  bg-blue-900 my-5 rounded-3xl px-7 py-2  ">Start Now!</button>
            <button className="text-amber-200 cursor-pointer  bg-blue-900 my-5 rounded-3xl px-7 py-2  ">Read More!</button>
          </div>
        </div>
        <div>
          <div className="text-center text-blue-300 text-2xl font-bold pt-10"><h1>Your fans can buy you a coffee!</h1></div>
          <div className=" container m-auto flex gap-36 justify-center items-baseline p-10">
            <div className=" justify-center items-center flex flex-col"><img src="/man.gif" width={150} alt="" />
              <h1 className="text-center p-5  c4 font-bold">Fund Yourself!</h1>
              <h1 className="text-center p-5 text-pink-700 font-bold">Your fans are available for you.  Whenever you need!</h1>
            </div>
            <div className=" justify-center items-center flex flex-col"><img src="/coin.gif" width={105} alt="" />
              <h1 className="text-center p-5 c2 font-bold">Fans want to help!</h1>
              <h1 className="text-center p-5 text-pink-700 font-bold">Your fans are available for you.  Whenever you need!</h1>
            </div>
            <div className=" justify-center items-center flex flex-col"><img src="/group.gif" width={100} alt="" />
              <h1 className="text-center p-5 c3 font-bold">Fund Yourself!</h1>
              <h1 className="text-center p-5 text-pink-700 font-bold">Your fans are available for you.  Whenever you need!</h1>
            </div>
          </div>

        </div>

        <div>
          <div className="text-center text-blue-300 text-2xl font-bold pt-10 pb-10"><h1> Learn more - About us !</h1></div>
          <div className=" container m-auto flex gap-36 justify-center items-baseline px-5 py-5">
            <div> <iframe className="rounded-2xl" width="450" height="215" src="https://www.youtube.com/embed/YxkGdX4WIBE?si=kRuL4fGpTiRzzWYr" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe></div>
          </div>

        </div>

      </div>


    </>
  );
}
