"use client";

import React from "react";

// Reusable styled button component
export function Button({ text, icon, onClick, className, type = "button" }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        "bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-[8px] hover:bg-gray-200 transition-colors duration-200 " +
        (className || "")
      }
    >
      <div className="flex items-center justify-center">
        {icon && <i className={`${icon} ${text ? "mr-2" : ""}`}></i>}
        {text}
      </div>
    </button>
  );
}

// StoryComponent shows two example buttons
function StoryComponent() {
  return (
    <div className="flex space-x-4 p-4">
      <MainComponent text="Sign in" icon="fas fa-sign-in-alt" />
      <MainComponent icon="fas fa-shopping-cart" />
    </div>
  );
}

// Export the page component
export default function Index() {
  return <StoryComponent />;
}
