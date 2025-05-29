"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: "ダッシュボード",
      icon: "fa-regular fa-chart-line",
      path: "/admin",
    },
    {
      id: 2,
      title: "ユーザー管理",
      icon: "fa-regular fa-users",
      path: "/admin/users",
    },
    {
      id: 3,
      title: "注文管理",
      icon: "fa-regular fa-list-check",
      path: "/admin/orders",
    },
    {
      id: 4,
      title: "写真管理",
      icon: "fa-regular fa-images",
      path: "/admin/photos",
    },
    {
      id: 5,
      title: "チャット管理",
      icon: "fa-regular fa-comments",
      path: "/admin/chats",
    },
    {
      id: 6,
      title: "設定",
      icon: "fa-regular fa-gear",
      path: "/admin/settings",
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

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

function StoryComponent() {
  return (
    <div>
      <MainComponent>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-medium text-gray-800">ダッシュボード</h2>
          <p className="mt-2 text-gray-600">
            これは管理画面のサンプルコンテンツです。
          </p>
        </div>
      </MainComponent>

      <MainComponent>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-medium text-gray-800">ユーザー管理</h2>
          <p className="mt-2 text-gray-600">
            これはユーザー管理画面のサンプルコンテンツです。
          </p>
        </div>
      </MainComponent>
    </div>
  );
});
}