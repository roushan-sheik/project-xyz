"use client";
import { useUpload } from "@/utilities/runtime-helpers";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [upload, { loading: uploading }] = useUpload();
  const [categories] = useState([
    { id: "all", name: "すべて" },
    { id: "alibi", name: "アリバイ写真" },
    { id: "template", name: "テンプレート" },
    { id: "other", name: "その他" },
  ]);

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: searchTerm,
          category: selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("画像データの取得に失敗しました");
      }

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleImageUpload = async (file) => {
    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) throw new Error(uploadError);

      const response = await fetch("/api/admin/images/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: url,
          category: selectedCategory === "all" ? "other" : selectedCategory,
        }),
      });

      if (!response.ok) {
        throw new Error("画像の登録に失敗しました");
      }

      fetchImages();
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
          <h1 className="text-2xl font-medium text-gray-800">画像データ管理</h1>
        </header>

        <main className="p-6">
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="flex flex-1 gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="画像を検索..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Button
                  text="検索"
                  icon="fa-search"
                  className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                  type="submit"
                />
              </form>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                  disabled={uploading}
                />
                <Button
                  text="画像をアップロード"
                  icon="fa-upload"
                  className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                  disabled={uploading}
                />
              </label>
            </div>
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
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title || "管理画像"}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="mb-1 truncate text-sm text-gray-800">
                      {image.title || "タイトルなし"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(image.created_at).toLocaleDateString("ja-JP")}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button className="text-gray-600 hover:text-red-500">
                        <i className="fa-regular fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {images.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  画像が見つかりません
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
