import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> App
          </h1>
          <p>
            I'm baby woke cray chartreuse, squid crucifix organic shaman
            intelligentsia distillery. Salvia keffiyeh cronut copper mug
            distillery. Messenger bag live-edge bicycle rights, chillwave vegan
            fingerstache chambray gochujang seitan four loko tumblr brooklyn
            cred palo santo. Trust fund shoreditch bespoke paleo poke tousled
            freegan single-origin coffee.
          </p>
          <Link className="btn btn-hero" to="/register">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
