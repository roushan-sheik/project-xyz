"use client";
import React from "react";
import { useEffect, useState } from "react";

function MainComponent() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, [statusFilter]);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: searchTerm,
          status: statusFilter,
        }),
      });

      if (!response.ok) {
        throw new Error("決済データの取得に失敗しました");
      }

      const data = await response.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayments();
  };

  const handleRefund = async (paymentId) => {
    if (!confirm("返金処理を実行しますか？")) return;

    setProcessing(true);
    try {
      const response = await fetch("/api/admin/payments/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });

      if (!response.ok) {
        throw new Error("返金処理に失敗しました");
      }

      fetchPayments();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <></>
      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-medium text-gray-800">決済情報管理</h1>
        </header>

        <main className="p-6">
          <div className="mb-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="注文ID、顧客名で検索..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="all">全てのステータス</option>
                <option value="completed">決済完了</option>
                <option value="pending">処理中</option>
                <option value="failed">失敗</option>
                <option value="refunded">返金済み</option>
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
                      決済ID
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      注文ID
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      顧客名
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      金額
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      決済方法
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      ステータス
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      決済日時
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.order_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {payment.customer_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ¥{payment.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {payment.payment_method}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {payment.status === "completed"
                            ? "完了"
                            : payment.status === "pending"
                            ? "処理中"
                            : payment.status === "failed"
                            ? "失敗"
                            : "返金済み"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(payment.created_at).toLocaleString("ja-JP")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {payment.status === "completed" && (
                          <button
                            onClick={() => handleRefund(payment.id)}
                            disabled={processing}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            <i className="fa-regular fa-rotate-left mr-1"></i>
                            返金
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        決済データが見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MainComponent;
