"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/alibi/photos", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("写真の取得に失敗しました");
        }
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error(error);
        setError("写真の取得に失敗しました");
      } finally {
        setLoadingPhotos(false);
      }
    };

    fetchPhotos();
  }, []);

  const handleUsePhoto = async (photoId) => {
    try {
      const response = await fetch("/api/alibi/photos/use", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId }),
      });
      if (!response.ok) {
        throw new Error("写真の使用に失敗しました");
      }
      window.location.href = "/alibi-photos/history";
    } catch (error) {
      console.error(error);
      setError("写真の使用に失敗しました");
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
              アリバイ写真ギャラリー
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        {loadingPhotos ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-xl text-gray-400">写真を読み込み中...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all hover:border-gray-700 hover:bg-gray-900/80"
              >
                <a
                  href={`/alibi-photos/${photo.id}`}
                  className="block aspect-video w-full overflow-hidden"
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </a>
                <div className="p-4">
                  <h3 className="mb-3 text-sm sm:text-base font-medium text-white">
                    {photo.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <a
                      href={`/alibi-photos/${photo.id}`}
                      className="flex flex-1 items-center justify-center rounded-lg border border-gray-800 px-4 py-2 text-gray-400 text-sm transition-colors hover:bg-gray-800 hover:text-white"
                    >
                      <i className="fa-regular fa-eye mr-2"></i>
                      <span>詳細を見る</span>
                    </a>
                    <button
                      onClick={() => handleUsePhoto(photo.id)}
                      className="flex flex-1 items-center justify-center rounded-lg bg-[#357AFF] px-4 py-2 text-white text-sm transition-all hover:bg-[#2E69DE]"
                    >
                      <i className="fa-regular fa-check mr-2"></i>
                      <span>利用する</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainComponent;
