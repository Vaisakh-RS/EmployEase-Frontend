import React from "react";
import logo from './assets/logo.svg'
import { Button } from './Button';
import './Home.css';

function Home () {

  return (
    <>
    <div className="home-container">
      <div>
          <img src={logo} className="logo" alt="logo" />
      </div>
      <h2 className="tex">Employ Ease</h2>
      <div className="home-btns">
        <Button className="btns" buttonStyle="btn--primary" buttonSize="btn--large"/>
    </div>
    </div>
    </>  
  )
};

export default Home 