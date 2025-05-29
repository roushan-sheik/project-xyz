"use client";
import React from "react";
import { useEffect, useState } from "react";

function MainComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search: searchTerm,
          category: categoryFilter,
        }),
      });

      if (!response.ok) {
        throw new Error("商品データの取得に失敗しました");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleStockUpdate = async (productId, newStock) => {
    try {
      const response = await fetch("/api/admin/products/update-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, stock: newStock }),
      });

      if (!response.ok) {
        throw new Error("在庫の更新に失敗しました");
      }

      fetchProducts();
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
          <h1 className="text-2xl font-medium text-gray-800">商品データ管理</h1>
        </header>

        <main className="p-6">
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="flex flex-1 gap-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="商品名、商品コードで検索..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                >
                  <option value="all">すべてのカテゴリー</option>
                  <option value="photo">アリバイ写真</option>
                  <option value="video">アリバイ動画</option>
                  <option value="gift">お土産</option>
                  <option value="other">その他</option>
                </select>
                <Button
                  text="検索"
                  icon="fa-search"
                  className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                  type="submit"
                />
              </form>
              <Button
                text="新規商品"
                icon="fa-plus"
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                onClick={() => setIsEditing(true)}
              />
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
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      商品コード
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      商品名
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      カテゴリー
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      価格
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      在庫数
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      ステータス
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        ¥{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) =>
                            handleStockUpdate(product.id, e.target.value)
                          }
                          className="w-20 rounded border border-gray-300 px-2 py-1"
                          min="0"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {product.status === "active" ? "販売中" : "停止中"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditing(true);
                          }}
                          className="text-[#357AFF] hover:text-[#2E69DE]"
                        >
                          <i className="fa-regular fa-pen-to-square mr-1"></i>
                          編集
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        商品が見つかりません
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
