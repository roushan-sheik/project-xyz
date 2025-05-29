"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [upload, { loading: uploading }] = useUpload();
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requestType: "edit",
    deadline: "",
    additionalNotes: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setVideoFile(file);
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) throw new Error(uploadError);
      setVideoUrl(url);
    } catch (err) {
      console.error(err);
      setError("動画のアップロードに失敗しました");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl) {
      setError("動画ファイルをアップロードしてください");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/alibi/video/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("リクエストの送信に失敗しました");
      }

      window.location.href = "/alibi-video/requests";
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
              アリバイ動画音声の依頼
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
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-white">
                動画のアップロード
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                編集したい動画ファイルをアップロードしてください
              </p>
            </div>

            <label className="group relative flex aspect-video w-full cursor-pointer items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50 hover:bg-gray-800">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {videoUrl ? (
                <video
                  src={videoUrl}
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <div className="text-center">
                  <i className="fa-regular fa-upload mb-2 text-3xl text-gray-400"></i>
                  <p className="text-sm text-gray-400">
                    {uploading ? "アップロード中..." : "クリックして動画を選択"}
                  </p>
                </div>
              )}
            </label>
          </div>

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
                依頼内容
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400"
                rows="4"
                placeholder="具体的な依頼内容を記入してください"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                編集タイプ
              </label>
              <select
                value={formData.requestType}
                onChange={(e) =>
                  setFormData({ ...formData, requestType: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
              >
                <option value="edit">動画編集</option>
                <option value="voice">音声編集</option>
                <option value="both">動画・音声編集</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200">
                希望納期
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                required
              />
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
            disabled={submitting || !videoUrl}
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