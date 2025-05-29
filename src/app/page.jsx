"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser({ email: "user@example.com" });
      setLoading(false);
    }, 1000);
  }, []);

  const menuItems = [
    {
      id: 1,
      title: "アリバイ写真DL",
      description: "高品質なアリバイ写真をダウンロード",
      icon: "fa-regular fa-images",
      path: "/alibi-photos",
    },
    {
      id: 2,
      title: "アリバイ写真加工",
      description: "プロフェッショナルな写真加工サービス",
      icon: "fa-regular fa-image",
      path: "/photo-edit",
    },
    {
      id: 3,
      title: "アリバイ動画音声",
      description: "リアルで説得力のある動画・音声制作",
      icon: "fa-regular fa-video",
      path: "/alibi-video",
    },
    {
      id: 4,
      title: "アリバイLINE",
      description: "安全で信頼性の高いメッセージング",
      icon: "fa-regular fa-comment",
      path: "/alibi-line",
    },
    {
      id: 5,
      title: "アリバイ相談",
      description: "専門家による個別カウンセリング",
      icon: "fa-regular fa-comments",
      path: "/chat",
    },
    {
      id: 6,
      title: "アリバイお土産",
      description: "リアルな証拠品の制作サービス",
      icon: "fa-regular fa-gift",
      path: "/alibi-souvenir",
    },
    {
      id: 7,
      title: "ダミー請求書",
      description: "完璧な書類作成サービス",
      icon: "fa-regular fa-file-lines",
      path: "/dummy-invoice",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/clearSession", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("セッションのクリアに失敗しました");
      }

      window.location.href = "/account/signin";
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert(
        "ログアウトに失敗しました。ページを更新してもう一度お試しください。"
      );
    }
  };

  const handleMenuClick = (path) => {
    if (path === "/coming-soon") {
      alert("このサービスは準備中です。もうしばらくお待ちください。");
      return;
    }
    window.location.href = path;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-xl text-gray-400">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md px-4 py-2">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-0">{/* 左側の空のスペース */}</div>
          <div className="text-sm font-medium text-white">MENU</div>
          <div className="absolute right-0 flex items-center space-x-4">
            <a
              href="/account/settings"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fa-regular fa-gear text-lg"></i>
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fa-regular fa-right-from-bracket text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-all hover:border-gray-700 hover:bg-gray-900/80"
            >
              <div className="flex items-center space-x-4 md:flex-col md:items-start md:space-x-0 md:space-y-3">
                <div className="rounded-full bg-gray-800/50 p-2">
                  <i className={`${item.icon} text-xl text-white`}></i>
                </div>
                <div className="flex-1 md:w-full">
                  <h3 className="text-base font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MainComponent;
