"use client";
import React from "react";

function MainComponent() {
  const features = [
    {
      category: "アリバイ写真サービス",
      icon: "fa-regular fa-images",
      items: [
        {
          title: "アリバイ写真ダウンロード",
          description:
            "様々なシチュエーションに対応した高品質なアリバイ写真をダウンロード。すべての写真は厳選されており、リアルさを追求しています。",
          path: "/alibi-photos",
          buttonText: "写真を見る",
        },
        {
          title: "写真加工サービス",
          description:
            "プロフェッショナルによる写真加工サービス。細部まで丁寧に加工し、自然な仕上がりを実現します。",
          path: "/photo-edit",
          buttonText: "加工する",
        },
      ],
    },
    {
      category: "アリバイメディア",
      icon: "fa-regular fa-play",
      items: [
        {
          title: "アリバイ動画作成",
          description:
            "オリジナルのアリバイ動画を作成。高品質な映像と音声で、説得力のある証拠を提供します。",
          path: "/alibi-video",
          buttonText: "動画を作る",
        },
        {
          title: "音声メッセージ",
          description:
            "リアルな音声メッセージを生成。状況に応じた自然な会話を再現します。",
          path: "/voice-message",
          buttonText: "音声を作る",
        },
      ],
    },
    {
      category: "アリバイコミュニケーション",
      icon: "fa-regular fa-comments",
      items: [
        {
          title: "LINEプロキシ",
          description:
            "安全で信頼性の高いLINEメッセージのやり取りを実現。プライバシーを完全に保護します。",
          path: "/line-proxy",
          buttonText: "設定する",
        },
        {
          title: "専門家相談",
          description:
            "経験豊富な専門家によるプライベートな相談サービス。あなたの状況に最適な解決策を提案します。",
          path: "/chat",
          buttonText: "相談する",
        },
      ],
    },
    {
      category: "アリバイ証明書",
      icon: "fa-regular fa-file-lines",
      items: [
        {
          title: "領収書作成",
          description:
            "完璧な領収書を作成。細部まで配慮された、信頼性の高い書類を提供します。",
          path: "/receipts",
          buttonText: "作成する",
        },
        {
          title: "証明書発行",
          description:
            "各種証明書を発行。正式な形式に則った、高品質な証明書を作成します。",
          path: "/certificates",
          buttonText: "発行する",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-black px-4 py-4">
        <div className="flex items-center">
          <a
            href="/"
            className="mr-4 text-gray-400 hover:text-white transition-colors"
          >
            <i className="fa-regular fa-arrow-left text-xl"></i>
          </a>
          <h1 className="text-xl font-medium text-white">Premium Services</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl p-4">
        <div className="space-y-8">
          {features.map((category, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
            >
              <div className="mb-6 flex items-center">
                <div className="rounded-full bg-gray-800/50 p-3 mr-4">
                  <i className={`${category.icon} text-2xl text-white`}></i>
                </div>
                <h2 className="text-xl font-medium text-white">
                  {category.category}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-lg border border-gray-800 bg-black/50 p-6"
                  >
                    <h3 className="mb-3 text-lg font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mb-6 text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                    <a
                      href={item.path}
                      className="inline-flex items-center rounded-lg bg-white px-6 py-2.5 text-sm text-black transition-colors hover:bg-gray-200"
                    >
                      <span>{item.buttonText}</span>
                      <i className="fa-regular fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MainComponent;