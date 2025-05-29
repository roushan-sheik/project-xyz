"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";

function MainComponent() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.id);
    }
  }, [selectedRoom]);

  const fetchChatRooms = async () => {
    try {
      const response = await fetch("/api/admin/chat-rooms");
      if (!response.ok) {
        throw new Error("チャットルームの取得に失敗しました");
      }
      const data = await response.json();
      setChatRooms(data.rooms || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId) => {
    try {
      const response = await fetch(`/api/admin/chat-messages/${roomId}`);
      if (!response.ok) {
        throw new Error("メッセージの取得に失敗しました");
      }
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = chatRooms.filter(
      (room) =>
        room.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.id.toString().includes(searchTerm)
    );
    setChatRooms(filtered);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <></>
      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-medium text-gray-800">
            チャット履歴管理
          </h1>
        </header>

        <main className="flex h-[calc(100vh-73px)]">
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ユーザー名、ルームIDで検索..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />
                <Button
                  text="検索"
                  icon="fa-search"
                  className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
                  type="submit"
                />
              </form>
            </div>

            <div className="h-full overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="text-gray-600">読み込み中...</div>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {chatRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`w-full rounded-lg p-3 text-left transition-colors ${
                        selectedRoom?.id === room.id
                          ? "bg-[#357AFF] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {room.customer_name}
                        </span>
                        <span className="text-sm opacity-80">
                          {new Date(room.last_message_at).toLocaleDateString(
                            "ja-JP"
                          )}
                        </span>
                      </div>
                      <p className="mt-1 text-sm opacity-80">ID: {room.id}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            {selectedRoom ? (
              <div className="flex h-full flex-col">
                <div className="border-b border-gray-200 p-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    {selectedRoom.customer_name} とのチャット
                  </h2>
                  <p className="text-sm text-gray-600">
                    ルームID: {selectedRoom.id}
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${
                        message.is_admin ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.is_admin
                            ? "bg-[#357AFF] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="mt-1 text-right text-xs opacity-80">
                          {new Date(message.created_at).toLocaleString("ja-JP")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                左側のリストからチャットルームを選択してください
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainComponent;
