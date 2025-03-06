import React, { useState } from "react";

import ImageSlider from "../cards/ImageSlider";


export default function ReminiClone() {
  return (
    <div className="bg-cyan-100 text-white h-screen flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-12">
        
        <ImageSlider/>
     
      </div>
    </div>
  );
}