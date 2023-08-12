"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const testimonials = [
  {
    name: "Vaikruta",
    avatar: "V",
    title: "Software Engineer",
    description: "This is the best AI Tool I've ever used",
  },
  {
    name: "sanju",
    avatar: "S",
    title: "Doctor",
    description: "This is the best AI Tool I've ever used",
  },
  {
    name: "Rajesh",
    avatar: "R",
    title: "Software Engineer",
    description: "This is the best AI Tool I've ever used",
  },
  {
    name: "Mr A",
    avatar: "M",
    title: "Software Engineer",
    description: "This is the best AI Tool I've ever used",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {testimonials.map((test, i, arr) => (
          <Card
            key={test.avatar}
            className="bg-slate-800 border-none text-white"
          >
            <CardHeader>
              <CardTitle className=" flex items-center gap-x-2">
                <div>
                  <p className=" text-lg ">{test.name}</p>
                  <p className=" text-slate-400 text-sm ">{test.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {test.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
