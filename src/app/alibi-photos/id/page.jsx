"use client";
import React from "react";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [useLoading, setUseLoading] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const id = window.location.pathname.split("/").pop();
        const response = await fetch("/api/alibi/photos/detail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("写真の取得に失敗しました");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPhoto(data.photo);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPhoto();
  }, []);

  const handleUsePhoto = async () => {
    setUseLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/alibi/photos/use", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId: photo.id }),
      });

      if (!response.ok) {
        throw new Error("アリバイ写真の使用に失敗しました");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setSuccessMessage("アリバイ写真を利用しました");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setUseLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-xl text-gray-600">写真が見つかりませんでした</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center">
          <a
            href="/alibi-photos"
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <i className="fa-regular fa-arrow-left text-xl"></i>
          </a>
          <h1 className="text-xl font-medium text-gray-800">
            アリバイ写真の詳細
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <img
            src={photo.image_url}
            alt={photo.title}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{photo.title}</h2>
          <p className="text-gray-600">{photo.description}</p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleUsePhoto}
            disabled={useLoading}
            className="w-full rounded-lg bg-[#357AFF] px-4 py-3 text-base font-medium text-white transition-colors hover:bg-[#2E69DE] focus:outline-none focus:ring-2 focus:ring-[#357AFF] focus:ring-offset-2 disabled:opacity-50 md:w-auto"
          >
            {useLoading ? (
              <span className="flex items-center justify-center">
                <i className="fa-regular fa-spinner-third fa-spin mr-2"></i>
                処理中...
              </span>
            ) : (
              "この写真を利用する"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default MainComponent;