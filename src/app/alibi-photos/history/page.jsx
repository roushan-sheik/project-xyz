"use client";
import React from "react";

function MainComponent() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/alibi/photos/history", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("履歴の取得に失敗しました");
        }
        const data = await response.json();
        if (!data.history) {
          throw new Error("履歴データが見つかりません");
        }
        setHistory(data.history);
      } catch (error) {
        console.error(error);
        setError(error.message || "履歴の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center">
          <a href="/" className="mr-4 text-gray-600 hover:text-gray-800">
            <i className="fa-regular fa-arrow-left text-xl"></i>
          </a>
          <h1 className="text-xl font-medium text-gray-800">利用履歴</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-6">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-500">
            <i className="fa-regular fa-circle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-600">
              <i className="fa-regular fa-spinner-third fa-spin mr-2"></i>
              読み込み中...
            </div>
          </div>
        ) : !history || history.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-600">
              <i className="fa-regular fa-inbox mr-2"></i>
              利用履歴がありません
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="hover:border-[#357AFF] transition-colors border border-gray-200 rounded-lg p-4"
              >
                <a
                  href={`/alibi-photos/${item.photo_id}`}
                  className="flex items-start space-x-4"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">
                      {formatDate(item.used_at)}
                    </div>
                    <div className="mt-1 text-lg font-medium text-gray-800">
                      {item.title}
                    </div>
                    {item.note && (
                      <div className="mt-2 text-sm text-gray-600">
                        {item.note}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MainComponent;