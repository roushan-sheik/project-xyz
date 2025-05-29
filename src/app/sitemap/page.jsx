"use client";
import React from "react";

function MainComponent() {
  const siteStructure = {
    user: {
      title: "ユーザー画面",
      links: [
        { title: "ログイン", path: "/login" },
        { title: "ホーム", path: "/" },
        { title: "アリバイ写真DL", path: "/alibi-photos" },
        { title: "アリバイ写真加工", path: "/photo-edit" },
        { title: "アリバイ動画音声", path: "/alibi-video" },
        { title: "アリバイLINE", path: "/alibi-line" },
        { title: "アリバイ相談", path: "/chat" },
        { title: "アリバイお土産", path: "/alibi-souvenir" },
        { title: "ダミー請求書", path: "/dummy-invoice" },
      ],
    },
    admin: {
      title: "管理画面",
      links: [
        { title: "管理者ログイン", path: "/admin/signin" },
        { title: "管理ダッシュボード", path: "/admin" },
        { title: "アカウント管理", path: "/admin/accounts" },
        { title: "顧客情報管理", path: "/admin/customers" },
        { title: "決済情報管理", path: "/admin/payments" },
        { title: "納品データ管理", path: "/admin/deliveries" },
        { title: "アリバイ写真アルバム管理", path: "/admin/photo-albums" },
        {
          title: "アリバイ写真加工依頼管理",
          path: "/admin/photo-edit-requests",
        },
        { title: "アリバイ動画音声依頼管理", path: "/admin/video-requests" },
        { title: "アリバイLINE依頼管理", path: "/admin/line-requests" },
        { title: "アリバイ相談チャット管理", path: "/admin/chat-history" },
        { title: "アリバイお土産依頼管理", path: "/admin/souvenir-requests" },
        { title: "ダミー請求書依頼管理", path: "/admin/invoice-requests" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-medium text-gray-900">
          サイトマップ
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {Object.entries(siteStructure).map(([key, section]) => (
            <div
              key={key}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <h2 className="mb-4 text-xl font-medium text-gray-800">
                {section.title}
              </h2>
              <div className="space-y-2">
                {section.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.path}
                    className="flex items-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#357AFF]"
                  >
                    <i className="fa-regular fa-chevron-right mr-2 text-sm"></i>
                    <span>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;