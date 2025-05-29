"use client";
import React from "react";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("form");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    dispatchDatetime: "",
    area: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/uncle-dispatch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("依頼の送信に失敗しました");
      }

      setFormData({
        dispatchDatetime: "",
        area: "",
        address: "",
        email: "",
        phone: "",
      });

      setActiveTab("list");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fa-regular fa-arrow-left mr-2"></i>
              戻る
            </button>
          </div>
          <h1 className="text-xl font-medium text-gray-800">おじさん派遣</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl p-4">
        <div className="mb-6 flex space-x-4">
          <Button
            text="新規依頼"
            icon={
              activeTab === "form"
                ? "fa-pen-to-square"
                : "fa-regular fa-pen-to-square"
            }
            className={`flex-1 ${activeTab === "form" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("form")}
          />
          <Button
            text="依頼一覧"
            icon={activeTab === "list" ? "fa-list" : "fa-regular fa-list"}
            className={`flex-1 ${activeTab === "list" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab("list")}
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {activeTab === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                派遣日時 *
              </label>
              <input
                type="datetime-local"
                value={formData.dispatchDatetime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dispatchDatetime: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 p-2"
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                派遣場所（エリア） *
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    area: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="例：東京都渋谷区"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                派遣先住所 *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="詳細な住所を入力してください"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                連絡先メールアドレス *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                電話番号 *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="例：090-1234-5678"
                required
              />
            </div>

            <Button
              text={processing ? "送信中..." : "依頼を送信"}
              className="w-full bg-[#357AFF] text-white hover:bg-[#2E69DE]"
              type="submit"
              disabled={processing}
            />
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-center text-gray-500">
                依頼履歴はまだありません
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainComponent;