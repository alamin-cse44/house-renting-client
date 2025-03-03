"use client";

import Image from "next/image";
import React, { useState } from "react";

const images = ["/apartments/1.png", "/apartments/2.png", "/apartments/3.png"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="lg:col-span-2">
      <div className="relative w-full lg:h-[600px] h-[400px] mb-4">
        <Image
          src={selectedImage}
          alt="Selected Apartment"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-24 h-24 relative cursor-pointer border-2 ${
              selectedImage === img ? "border-blue-500" : "border-transparent"
            } rounded-lg overflow-hidden`}
            onClick={() => setSelectedImage(img)}
          >
            <Image src={img} alt="Thumbnail" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center my-5">
        <h2 className="text-lg font-bold">Family Apartment</h2>
        <p className="text-gray-500">Rent/Month: $500</p>
      </div>

      <p>
        description Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Blanditiis consectetur obcaecati ab laboriosam ad tenetur accusamus
        eaque voluptatum laborum consequatur.
      </p>

      <h2 className="text-lg font-bold my-3">Price Details - </h2>

      <div className="flex flex-col gap-2">
        <p>
          <span className="text-md font-semibold">Rent/Month:</span>{" "}
          <span className="text-gray-500">$500 (negotiable)</span>
        </p>
        <p>
          <span className="text-md font-semibold">Service Charge:</span>{" "}
          <span className="text-gray-500">$8 per month, subject to change</span>{" "}
        </p>
        <p>
          {" "}
          <span className="text-md font-semibold">Security Deposit:</span>{" "}
          <span className="text-gray-500">3 month's rent</span>{" "}
        </p>
        <p>
          <span className="text-md font-semibold">Flat Release Policy :</span>{" "}
          <span className="text-gray-500">
            3 months earlier notice required
          </span>
        </p>
      </div>
    </div>
  );
};

export default Gallery;
