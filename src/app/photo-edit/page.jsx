"use client";
import React from "react";

import { useUpload } from "../utilities/runtime-helpers";

function MainComponent() {
  const [activeTab, setActiveTab] = useState("form");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();
  const [processing, setProcessing] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [formData, setFormData] = useState({
    image1: null,
    image2: null,
    image3: null,
    editDescription: "",
    notes: "",
    desiredDeliveryDate: "",
    templateId: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/photo-edit/templates", {
          method: "POST",
        });
        if (!response.ok) throw new Error("テンプレートの取得に失敗しました");
        const data = await response.json();
        setTemplates(data.templates || []);
      } catch (err) {
        console.error(err);
        setError("テンプレートの読み込みに失敗しました");
      }
    };
    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData((prev) => ({
      ...prev,
      templateId: template.id,
      editDescription: template.description || prev.editDescription,
    }));
  };

  const handleImageChange = async (imageKey, file) => {
    try {
      const { url, error: uploadError } = await upload({ file });
      if (uploadError) throw new Error(uploadError);

      setFormData((prev) => ({
        ...prev,
        [imageKey]: url,
      }));

      setPreviewUrls((prev) => ({
        ...prev,
        [imageKey]: URL.createObjectURL(file),
      }));
    } catch (err) {
      console.error(err);
      setError("画像のアップロードに失敗しました");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!formData.image1) {
      setError("少なくとも1枚の画像が必要です");
      setProcessing(false);
      return;
    }

    try {
      const response = await fetch("/api/photo-edit/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("依頼の送信に失敗しました");
      }

      setFormData({
        image1: null,
        image2: null,
        image3: null,
        editDescription: "",
        notes: "",
        desiredDeliveryDate: "",
      });

      setPreviewUrls({
        image1: null,
        image2: null,
        image3: null,
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
            <h1 className="text-lg font-medium text-white">アリバイ写真加工</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-16">
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-lg border px-4 py-2 transition-all ${
              activeTab === "form"
                ? "border-[#357AFF] bg-[#357AFF]/10 text-[#357AFF]"
                : "border-gray-800 text-gray-400 hover:bg-gray-900"
            }`}
          >
            <i
              className={`${
                activeTab === "form"
                  ? "fa-pen-to-square"
                  : "fa-regular fa-pen-to-square"
              }`}
            ></i>
            <span>新規依頼</span>
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`flex-1 flex items-center justify-center space-x-2 rounded-lg border px-4 py-2 transition-all ${
              activeTab === "list"
                ? "border-[#357AFF] bg-[#357AFF]/10 text-[#357AFF]"
                : "border-gray-800 text-gray-400 hover:bg-gray-900"
            }`}
          >
            <i
              className={`${
                activeTab === "list" ? "fa-list" : "fa-regular fa-list"
              }`}
            ></i>
            <span>依頼一覧</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        {activeTab === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                テンプレート選択
              </label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-[#357AFF] bg-[#357AFF]/10"
                        : "border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={template.image_url}
                        alt={template.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-white">
                        {template.title}
                      </p>
                      {template.category && (
                        <p className="text-xs text-gray-400">
                          {template.category}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    画像{num} {num === 1 && "*"}
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(`image${num}`, e.target.files[0])
                      }
                      disabled={uploading}
                    />
                    <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-gray-900/50 overflow-hidden hover:border-gray-700 hover:bg-gray-900/80">
                      {previewUrls[`image${num}`] ? (
                        <img
                          src={previewUrls[`image${num}`]}
                          alt={`プレビュー ${num}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <i className="fa-regular fa-image mb-2 text-2xl text-gray-400"></i>
                          <p className="text-sm text-gray-400">
                            クリックして画像を選択
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                加工したい内容 *
              </label>
              <textarea
                value={formData.editDescription}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    editDescription: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-white placeholder-gray-400"
                rows="4"
                placeholder="加工内容の詳細を入力してください"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                引継ぎ事項
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-white placeholder-gray-400"
                rows="4"
                placeholder="特記事項があれば入力してください"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                納品希望日 *
              </label>
              <input
                type="date"
                value={formData.desiredDeliveryDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    desiredDeliveryDate: e.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-white"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <button
              type="submit"
              disabled={processing || uploading}
              className="w-full rounded-lg bg-[#357AFF] px-4 py-2 font-medium text-white transition-all hover:bg-[#2E69DE] disabled:opacity-50"
            >
              {processing ? "送信中..." : "依頼を送信"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <p className="text-center text-gray-400">
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