import React from "react";
import logo from './assets/logo.svg'
import { Button } from './Button';
import '../styles/Home.css';
import { useTypewriter } from "react-simple-typewriter";

function Home () {
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
    <div className="bg-black text-white font-bold text-2xl px-[8rem] sticky top-0 py-5 ">
      <h1 >Employ Ease</h1>
    </div>
      <div className="home-container">
      <div>
          <img src={logo} className="logo" alt="logo" />
      </div>
      <h2 className="tex">Employ {text}</h2>
      <div className="home-btns">
        <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large"/>
    </div>
    <div className="mt-8 font-black">
      <h2 className="text-xl">
        An easy-to-use platform for storing your company's employee and department details.
      </h2>
    </div>
    </div>
    </>  
  )
};

export default Home 