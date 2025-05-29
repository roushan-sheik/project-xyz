"use client";
import React from "react";

function MainComponent() {
  const colors = [
    { name: "Primary", hex: "#357AFF", usage: "主要なアクション、重要な要素" },
    {
      name: "Primary Dark",
      hex: "#2E69DE",
      usage: "ホバー状態、アクティブ状態",
    },
    { name: "Black", hex: "#000000", usage: "背景、コントラストの高い要素" },
    { name: "White", hex: "#FFFFFF", usage: "テキスト、明るい要素" },
    { name: "Gray 50", hex: "#F9FAFB", usage: "背景、区切り" },
    { name: "Gray 200", hex: "#E5E7EB", usage: "ボーダー、非アクティブ要素" },
    {
      name: "Gray 400",
      hex: "#9CA3AF",
      usage: "プレースホルダー、補足テキスト",
    },
    { name: "Gray 600", hex: "#4B5563", usage: "セカンダリーテキスト" },
    { name: "Gray 800", hex: "#1F2937", usage: "プライマリーテキスト" },
  ];

  const typography = [
    {
      name: "Display",
      size: "text-4xl",
      weight: "font-bold",
      sample: "見出し大",
    },
    {
      name: "Heading 1",
      size: "text-3xl",
      weight: "font-bold",
      sample: "見出し1",
    },
    {
      name: "Heading 2",
      size: "text-2xl",
      weight: "font-semibold",
      sample: "見出し2",
    },
    {
      name: "Heading 3",
      size: "text-xl",
      weight: "font-medium",
      sample: "見出し3",
    },
    {
      name: "Body",
      size: "text-base",
      weight: "font-normal",
      sample: "本文テキスト",
    },
    {
      name: "Small",
      size: "text-sm",
      weight: "font-normal",
      sample: "小さいテキスト",
    },
  ];

  const spacing = [
    { name: "xs", size: "4px", class: "p-1" },
    { name: "sm", size: "8px", class: "p-2" },
    { name: "md", size: "16px", class: "p-4" },
    { name: "lg", size: "24px", class: "p-6" },
    { name: "xl", size: "32px", class: "p-8" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-medium text-gray-800">スタイルガイド</h1>
      </header>

      <main className="container mx-auto max-w-6xl p-6 space-y-12">
        <section>
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            カラーパレット
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className="rounded-lg border border-gray-200 overflow-hidden"
              >
                <div
                  className="h-24"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{color.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{color.hex}</p>
                  <p className="text-sm text-gray-600 mt-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            タイポグラフィ
          </h2>
          <div className="space-y-6 bg-white rounded-lg border border-gray-200 p-6">
            {typography.map((type) => (
              <div key={type.name} className="flex items-baseline">
                <div className="w-32 text-sm text-gray-600">{type.name}</div>
                <div className={`${type.size} ${type.weight} text-gray-800`}>
                  {type.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-800 mb-6">ボタン</h2>
          <div className="space-y-4 bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-x-4">
              <Button
                text="プライマリー"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
              />
              <Button
                text="セカンダリー"
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              />
              <Button
                text="アイコン付き"
                icon="fa-plus"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            スペーシング
          </h2>
          <div className="space-y-4 bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {spacing.map((space) => (
                <div key={space.name} className="text-center">
                  <div
                    className={`${space.class} bg-[#357AFF] rounded mb-2`}
                  ></div>
                  <p className="text-sm text-gray-600">{space.name}</p>
                  <p className="text-xs text-gray-400">{space.size}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            フォーム要素
          </h2>
          <div className="space-y-6 bg-white rounded-lg border border-gray-200 p-6">
            <div className="max-w-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                テキスト入力
              </label>
              <input
                type="text"
                placeholder="プレースホルダー"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#357AFF] focus:outline-none"
              />
            </div>
            <div className="max-w-sm">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                セレクトボックス
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#357AFF] focus:outline-none">
                <option>オプション1</option>
                <option>オプション2</option>
                <option>オプション3</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MainComponent;