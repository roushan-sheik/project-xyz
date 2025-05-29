"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ text, icon, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={
        "bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-[8px] hover:bg-gray-200 transition-colors duration-200 " +
        className
      }
    >
      <div className="flex items-center justify-center">
        {icon && <i className={`fas ${icon} ${text ? "mr-2" : ""}`}></i>}
        {text}
      </div>
    </button>
  );
}

function StoryComponent() {
  return (
    <div className="flex space-x-4 p-4">
      <MainComponent text="Sign in" />
      <MainComponent icon="fa-shopping-cart" />
    </div>
  );
});
}