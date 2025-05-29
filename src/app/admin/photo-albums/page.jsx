"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchAlbums();
  }, [selectedCategory]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch("/api/admin/photo-albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedCategory }),
      });

      if (!response.ok) {
        throw new Error("アルバムデータの取得に失敗しました");
      }

      const data = await response.json();
      setAlbums(data.albums || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (file) => {
    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) throw new Error(uploadError);

      const response = await fetch("/api/admin/photo-albums/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: url,
          category: selectedCategory === "all" ? "other" : selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("写真の登録に失敗しました");
      }

      fetchAlbums();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!confirm("この写真を削除してもよろしいですか？")) return;

    try {
      const response = await fetch("/api/admin/photo-albums/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId }),
      });

      if (!response.ok) {
        throw new Error("写真の削除に失敗しました");
      }

      fetchAlbums();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <></>
      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-medium text-gray-800">
            アリバイ写真アルバム管理
          </h1>
        </header>

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="all">すべてのカテゴリー</option>
              <option value="work">仕事</option>
              <option value="travel">旅行</option>
              <option value="event">イベント</option>
              <option value="other">その他</option>
            </select>

            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handlePhotoUpload(e.target.files[0])
                }
                disabled={uploading}
              />
              <Button
                text="新規写真をアップロード"
                icon="fa-upload"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                disabled={uploading}
              />
            </label>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-gray-600">読み込み中...</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {albums.map((photo) => (
                <div
                  key={photo.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title || "アリバイ写真"}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="mb-1 truncate text-sm text-gray-800">
                      {photo.title || "タイトルなし"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(photo.created_at).toLocaleDateString("ja-JP")}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <i className="fa-regular fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {albums.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  写真が見つかりません
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainComponent;