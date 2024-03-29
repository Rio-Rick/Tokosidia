"use client";

import { useState } from "react";

export default function ProductPicture ({ images }: { images: string[] }) {
  const [picture, setPicture] = useState(images[0]);

  return (
    <div className=" w-64 h-96 rounded-xl flex-1">
      <img className="rounded-xl ml-48" src={picture} alt="" />
      <div className="overflow-auto w-7/12 ml-44 mt-2">
        <div className="snap-x snap-mandatory flex gap-1">
          {images.map((pic, id) => (
            <div className="snap-center rounded-md" onClick={() => {
                setPicture(pic)
            }} key={id + Math.floor(Math.random() * 100)}>
              <img  src={pic} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
