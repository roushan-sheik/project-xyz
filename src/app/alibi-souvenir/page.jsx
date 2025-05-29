"use client";
import React, { useState } from "react";

function MainComponent() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    quantity: 1,
    deliveryDate: "",
    address: "",
    additionalNotes: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const products = [
    {
      id: 1,
      name: "ホテルの領収書",
      price: 5000,
      image: "/images/hotel-receipt.jpg",
      description: "高級ホテルの宿泊領収書",
    },
    {
      id: 2,
      name: "レストランの領収書",
      price: 3000,
      image: "/images/restaurant-receipt.jpg",
      description: "有名レストランでの食事領収書",
    },
    {
      id: 3,
      name: "映画のチケット半券",
      price: 2000,
      image: "/images/movie-ticket.jpg",
      description: "映画館のチケット半券",
    },
    {
      id: 4,
      name: "お土産の包装袋",
      price: 4000,
      image: "/images/gift-bag.jpg",
      description: "高級店のショッピング袋とレシート",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      setError("商品を選択してください");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/alibi/souvenirs/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("注文の送信に失敗しました");
      }

      window.location.href = "/alibi-souvenir/orders";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSubmitting(false);
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
              アリバイお土産の注文
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-16">
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/50 p-4 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-medium text-white mb-4">商品を選択</h2>
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`cursor-pointer rounded-lg border ${
                    selectedProduct?.id === product.id
                      ? "border-[#357AFF]"
                      : "border-gray-800"
                  } bg-gray-900/50 p-4 transition-all hover:border-gray-700`}
                >
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    ¥{product.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white mb-4">注文詳細</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 space-y-4">
                {selectedProduct && (
                  <div className="mb-4 p-4 rounded-lg bg-gray-800/50">
                    <h3 className="font-medium text-white">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {selectedProduct.description}
                    </p>
                    <p className="text-lg text-white mt-2">
                      ¥{selectedProduct.price.toLocaleString()}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    数量
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    希望納品日
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryDate: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    お届け先住所
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    追加メモ
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        additionalNotes: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white"
                    rows="3"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedProduct || submitting}
                className="w-full rounded-lg bg-[#357AFF] px-4 py-3 font-medium text-white transition-colors hover:bg-[#2E69DE] disabled:opacity-50"
              >
                {submitting ? "送信中..." : "注文を確定する"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainComponent;
