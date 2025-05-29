"use client";
import React from "react";



export default function Index() {
  return (function MainComponent({ currentPath = "/" }) {
  const menuItems = [
    {
      id: 1,
      title: "ダッシュボード",
      icon: "fa-regular fa-chart-line",
      path: "/admin",
    },
    {
      id: 2,
      title: "顧客情報マスタ",
      icon: "fa-regular fa-users",
      path: "/admin/customers",
    },
    {
      id: 3,
      title: "発注データ管理",
      icon: "fa-regular fa-file-lines",
      path: "/admin/orders",
    },
    {
      id: 4,
      title: "納品データ管理",
      icon: "fa-regular fa-truck",
      path: "/admin/deliveries",
    },
    {
      id: 5,
      title: "画像データ管理",
      icon: "fa-regular fa-images",
      path: "/admin/images",
    },
    {
      id: 6,
      title: "商品データ管理",
      icon: "fa-regular fa-box",
      path: "/admin/products",
    },
    {
      id: 7,
      title: "決済情報管理",
      icon: "fa-regular fa-credit-card",
      path: "/admin/payments",
    },
    {
      id: 8,
      title: "アカウント管理",
      icon: "fa-regular fa-user-gear",
      path: "/admin/accounts",
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">管理画面</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className={`flex items-center px-4 py-2 ${
              currentPath === item.path
                ? "text-gray-700 bg-gray-100"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <i className={`${item.icon} mr-3`}></i>
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function StoryComponent() {
  const [currentPath, setCurrentPath] = useState("/admin");

  const handleMenuClick = (path) => {
    setCurrentPath(path);
  };

  return (
    <div className="flex h-[600px] bg-gray-100">
      <MainComponent onMenuClick={handleMenuClick} currentPath={currentPath} />
      <div className="flex-1 p-6">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-gray-600">
            現在のパス: <code>{currentPath}</code>
          </p>
        </div>
      </div>
    </div>
  );
});
}