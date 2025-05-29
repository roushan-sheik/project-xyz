"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ variant = "default", children, className = "", ...props }) {
  const components = {
    button: ({ text, icon, onClick, disabled, type = "button", color = "primary" }) => {
      const colorClasses = {
        primary: "bg-[#357AFF] text-white hover:bg-[#2E69DE]",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        danger: "bg-red-500 text-white hover:bg-red-600"
      };

      return (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${colorClasses[color]} ${className}`}
          {...props}
        >
          {icon && <i className={`${icon} ${text ? "mr-2" : ""}`}></i>}
          {text}
        </button>
      );
    },

    input: ({ label, type = "text", error, ...inputProps }) => (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`w-full rounded-lg border ${
            error ? "border-red-500" : "border-gray-300"
          } px-3 py-2 text-sm focus:border-[#357AFF] focus:outline-none focus:ring-1 focus:ring-[#357AFF] ${className}`}
          {...inputProps}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    ),

    card: ({ title, children }) => (
      <div className={`rounded-lg border border-gray-200 bg-white ${className}`}>
        {title && (
          <div className="border-b border-gray-200 px-4 py-3">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    ),

    header: ({ title, backLink, actions }) => (
      <header className={`border-b border-gray-200 bg-white px-4 py-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {backLink && (
              <a href={backLink} className="mr-4 text-gray-600 hover:text-gray-800">
                <i className="fa-regular fa-arrow-left text-xl"></i>
              </a>
            )}
            <h1 className="text-xl font-medium text-gray-800">{title}</h1>
          </div>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      </header>
    )
  };

  const Component = components[variant];
  return Component ? <Component {...props}>{children}</Component> : null;
}

function StoryComponent() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-lg font-medium">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <MainComponent
            variant="button"
            text="Primary Button"
            icon="fa-regular fa-check"
            color="primary"
          />
          <MainComponent
            variant="button"
            text="Secondary Button"
            icon="fa-regular fa-plus"
            color="secondary"
          />
          <MainComponent
            variant="button"
            text="Danger Button"
            icon="fa-regular fa-trash"
            color="danger"
          />
          <MainComponent
            variant="button"
            text="Disabled Button"
            icon="fa-regular fa-ban"
            disabled
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Input Fields</h2>
        <div className="space-y-4 max-w-md">
          <MainComponent
            variant="input"
            label="Username"
            placeholder="Enter your username"
          />
          <MainComponent
            variant="input"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <MainComponent
            variant="input"
            label="Email"
            type="email"
            placeholder="Enter your email"
            error="Please enter a valid email address"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Cards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <MainComponent variant="card" title="Basic Card">
            <p className="text-gray-600">This is a basic card component with a title and content.</p>
          </MainComponent>
          <MainComponent variant="card">
            <p className="text-gray-600">This is a card without a title.</p>
          </MainComponent>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Headers</h2>
        <div className="space-y-4">
          <MainComponent
            variant="header"
            title="Page Title"
            backLink="/"
            actions={
              <>
                <MainComponent variant="button" icon="fa-regular fa-gear" color="secondary" />
                <MainComponent variant="button" text="Action" color="primary" />
              </>
            }
          />
          <MainComponent
            variant="header"
            title="Simple Header"
          />
        </div>
      </div>
    </div>
  );
});
}