"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: searchTerm }),
      });

      if (!response.ok) {
        throw new Error("顧客データの取得に失敗しました");
      }

      const data = await response.json();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error(err);
      setError("顧客データの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <></>

      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h1 className="text-xl font-medium text-gray-800">顧客情報マスタ</h1>
        </header>

        <main className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-500">
              {error}
            </div>
          )}

          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
            <form onSubmit={handleSearch} className="flex gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="顧客名、メールアドレスで検索"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-[#357AFF] focus:outline-none"
              />
              <Button
                text="検索"
                icon="fa-search"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                type="submit"
              />
            </form>
          </div>

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
                      名前
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      メールアドレス
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      登録日
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      最終ログイン
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(customer.created_at).toLocaleDateString(
                          "ja-JP"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.last_login_at
                          ? new Date(customer.last_login_at).toLocaleDateString(
                              "ja-JP"
                            )
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-[#357AFF] hover:text-[#2E69DE]"
                        >
                          <i className="fa-regular fa-pen-to-square mr-1"></i>
                          編集
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        顧客データが見つかりません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {isEditing && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">
                顧客情報の編集
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fa-regular fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  名前
                </label>
                <input
                  type="text"
                  value={selectedCustomer.name}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  メールアドレス
                </label>
                <input
                  type="email"
                  value={selectedCustomer.email}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  登録日
                </label>
                <input
                  type="text"
                  value={new Date(
                    selectedCustomer.created_at
                  ).toLocaleDateString("ja-JP")}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                text="閉じる"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 hover:bg-gray-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;
