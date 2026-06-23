import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative -z-50">
      <video autoPlay loop muted>
        <source src={assets.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
