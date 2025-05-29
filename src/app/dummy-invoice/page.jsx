"use client";
import React, { useState } from "react";

function MainComponent() {
  const [formData, setFormData] = useState({
    issueDate: "",
    recipientName: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/invoice/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("請求書の生成に失敗しました");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${formData.issueDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/90 backdrop-blur-md px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fa-regular fa-arrow-left text-lg"></i>
            </a>
            <h1 className="text-lg font-medium text-white">
              ダミー請求書の作成
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-16">
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/50 p-4 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                発行日
              </label>
              <input
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                請求先名
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                品名
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="品名を入力"
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#357AFF] px-4 py-3 font-medium text-white transition-colors hover:bg-[#2E69DE] disabled:opacity-50"
          >
            {loading ? "生成中..." : "PDFをダウンロード"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default MainComponent;
