import React from "react";
import logo from './assets/logo.svg'
import { Button } from './Button';
import '../styles/Home.css';
import { useTypewriter } from "react-simple-typewriter";

function Home() {
  const [text, count] = useTypewriter({
    words: [
      "Ease",
      "Simple",
      "Easy",
      "Anytime",
      "Now...",
    ],
    loop: true,
    delaySpeed: 2500,
  });

  return (
    <>
      <div className="bg-black text-white font-bold text-2xl px-8 sticky top-0 py-5">
        <h1>Employ Ease</h1>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="home-container">
          <div className="text-center sm:text-left">
            <img src={logo} className="mx-auto sm:mx-0 max-w-xs sm:max-w-full logo" alt="logo" />
          </div>
          <h2 className="text-center sm:text-left mt-4 sm:mt-0 text-xl sm:text-2xl lg:mt-3 font-bold">
            Employ {text}
          </h2>
          <div className="text-center sm:text-left mt-4 sm:mt-0 lg:mt-9 home-btns">
            <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large" />
          </div>
          <div className="mt-8 font-black text-center sm:text-left">
            <h2 className="text-base sm:text-lg">
              An easy-to-use platform for storing your company's employee and department details.
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
