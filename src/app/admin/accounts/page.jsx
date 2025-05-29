"use client";
import React from "react";

function MainComponent() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
    name: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("/api/admin/accounts");
      if (!response.ok) {
        throw new Error("アカウントデータの取得に失敗しました");
      }
      const data = await response.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/accounts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("アカウントの作成に失敗しました");
      }

      fetchAccounts();
      setIsCreating(false);
      setFormData({ email: "", password: "", role: "admin", name: "" });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleUpdateRole = async (accountId, newRole) => {
    try {
      const response = await fetch("/api/admin/accounts/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("権限の更新に失敗しました");
      }

      fetchAccounts();
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
          <h1 className="text-2xl font-medium text-gray-800">アカウント管理</h1>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <Button
              text="新規アカウント作成"
              icon="fa-plus"
              className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
              onClick={() => setIsCreating(true)}
            />
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
                      名前
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      メールアドレス
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      権限
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      作成日
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-500">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {account.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {account.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={account.role}
                          onChange={(e) =>
                            handleUpdateRole(account.id, e.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                        >
                          <option value="admin">管理者</option>
                          <option value="staff">スタッフ</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(account.created_at).toLocaleDateString(
                          "ja-JP"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            setSelectedAccount(account);
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
                </tbody>
              </table>
            </div>
          )}
        </main>

        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-800">
                  新規アカウント作成
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="fa-regular fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    名前
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    パスワード
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    権限
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  >
                    <option value="admin">管理者</option>
                    <option value="staff">スタッフ</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    text="キャンセル"
                    onClick={() => setIsCreating(false)}
                    className="bg-gray-100 hover:bg-gray-200"
                  />
                  <Button
                    text="作成"
                    type="submit"
                    className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;