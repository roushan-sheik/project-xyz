"use client";
import React from "react";

function MainComponent() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDeliveries();
  }, [currentPage, selectedStatus]);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/admin/deliveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: currentPage,
          search: searchTerm,
          status: selectedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("納品データの取得に失敗しました");
      }

      const data = await response.json();
      setDeliveries(data.deliveries || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDeliveries();
  };

  const handleStatusChange = async (deliveryId, newStatus) => {
    try {
      const response = await fetch("/api/admin/deliveries/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("ステータスの更新に失敗しました");
      }

      fetchDeliveries();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <></>
      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-medium text-gray-800">納品データ管理</h1>
        </header>

        <main className="p-6">
          <div className="mb-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="検索..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="all">全てのステータス</option>
                <option value="pending">納品待ち</option>
                <option value="in_progress">納品中</option>
                <option value="completed">納品完了</option>
                <option value="cancelled">キャンセル</option>
              </select>
              <Button
                text="検索"
                icon="fa-search"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                type="submit"
              />
            </form>
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
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      ID
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      注文ID
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      納品予定日
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      ステータス
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      作成日時
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((delivery) => (
                    <tr key={delivery.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {delivery.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {delivery.order_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(delivery.delivery_date)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={delivery.status}
                          onChange={(e) =>
                            handleStatusChange(delivery.id, e.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                        >
                          <option value="pending">納品待ち</option>
                          <option value="in_progress">納品中</option>
                          <option value="completed">納品完了</option>
                          <option value="cancelled">キャンセル</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(delivery.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href={`/admin/deliveries/${delivery.id}`}
                          className="text-[#357AFF] hover:text-[#2E69DE]"
                        >
                          <i className="fa-regular fa-eye mr-1"></i>
                          詳細
                        </a>
                      </td>
                    </tr>
                  ))}
                  {deliveries.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        納品データが見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-4 py-2 ${
                      currentPage === page
                        ? "bg-[#357AFF] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainComponent;