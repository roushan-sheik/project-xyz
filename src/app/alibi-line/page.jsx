"use client";
import React from "react";

function MainComponent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    messageCount: 1,
    startDate: "",
    endDate: "",
    participants: 2,
    additionalNotes: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/alibi/line/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("リクエストの送信に失敗しました");
      }

      window.location.href = "/alibi-line/requests";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
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
              アリバイLINEの依頼
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-16">
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/50 p-4 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                タイトル
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400"
                placeholder="依頼のタイトル"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                メッセージの内容
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400"
                rows="6"
                placeholder="希望するメッセージのやり取りの内容を具体的に記入してください"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                メッセージ数
              </label>
              <input
                type="number"
                min="1"
                value={formData.messageCount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    messageCount: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  開始日時
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200">
                  終了日時
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                追加メモ
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, additionalNotes: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400"
                rows="3"
                placeholder="その他の要望があればご記入ください"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-[#357AFF] px-4 py-3 font-medium text-white transition-colors hover:bg-[#2E69DE] disabled:opacity-50"
          >
            {submitting ? "送信中..." : "依頼を送信する"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default MainComponent;