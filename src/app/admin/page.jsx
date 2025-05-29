"use client";
import React, { useState } from "react";

function MainComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: "ユーザー管理",
      icon: "fa-regular fa-users",
      path: "/admin/users",
    },
    {
      id: 2,
      title: "アリバイ写真DL管理",
      icon: "fa-regular fa-images",
      path: "/admin/photo-albums",
    },
    {
      id: 3,
      title: "アリバイ加工依頼一覧",
      icon: "fa-regular fa-image",
      path: "/admin/photo-edit-requests",
    },
    {
      id: 4,
      title: "アリバイ動画音声依頼一覧",
      icon: "fa-regular fa-video",
      path: "/admin/video-requests",
    },
    {
      id: 5,
      title: "アリバイLINE依頼一覧",
      icon: "fa-regular fa-comment",
      path: "/admin/line-requests",
    },
    {
      id: 6,
      title: "アリバイ相談チャット一覧",
      icon: "fa-regular fa-comments",
      path: "/admin/chat-history",
    },
    {
      id: 7,
      title: "アリバイお土産依頼一覧",
      icon: "fa-regular fa-gift",
      path: "/admin/souvenir-requests",
    },
    {
      id: 8,
      title: "ダミー請求書依頼一覧",
      icon: "fa-regular fa-file-lines",
      path: "/admin/invoice-requests",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h1 className="text-xl font-medium text-gray-800">管理画面</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-500 md:hidden"
          >
            <i className="fa-regular fa-times"></i>
          </button>
        </div>
        <nav className="mt-4 space-y-1 px-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                window.location.pathname === item.path
                  ? "bg-gray-100 text-[#357AFF]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <i className={`${item.icon} text-lg`}></i>
              <span>{item.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 md:hidden"
          >
            <i className="fa-regular fa-bars"></i>
          </button>
          <div className="flex items-center space-x-4">
            <a
              href="/admin/signout"
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="fa-regular fa-right-from-bracket text-lg"></i>
            </a>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-800">
              ダッシュボード
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-gray-100 p-3">
                    <i className={`${item.icon} text-xl text-[#357AFF]`}></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainComponent;
