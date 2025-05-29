"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/list-chat-rooms", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("チャットルームの取得に失敗しました");
        }
        const data = await response.json();
        setRooms(data.rooms || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = async (roomId) => {
    try {
      const response = await fetch("/api/get-room-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId }),
      });
      if (!response.ok) {
        throw new Error("メッセージの取得に失敗しました");
      }
      const data = await response.json();
      setMessages(data.messages || []);
      setSelectedRoom(roomId);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setSending(true);
    try {
      const response = await fetch("/api/create-chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage, roomId: selectedRoom }),
      });
      if (!response.ok) {
        throw new Error("メッセージの送信に失敗しました");
      }
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.message]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoomTitle.trim()) return;
    try {
      const response = await fetch("/api/create-chat-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newRoomTitle }),
      });
      if (!response.ok) {
        throw new Error("チャットルームの作成に失敗しました");
      }
      const data = await response.json();
      setRooms((prevRooms) => [...prevRooms, data.room]);
      setNewRoomTitle("");
      setIsCreatingRoom(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <h1 className="text-xl font-medium">チャット</h1>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <Button
                text="新しいチャットルーム"
                icon="fa-regular fa-plus"
                onClick={() => setIsCreatingRoom(true)}
                className="w-full"
              />
            </div>
            <div className="space-y-4">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleRoomSelect(room.id)}
                  className={`w-full text-left p-4 border rounded-lg ${
                    selectedRoom === room.id ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <h2 className="text-lg font-semibold">{room.title}</h2>
                  <p className="text-sm text-gray-500">{room.last_message}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            {selectedRoom ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 border-b">
                      <p className="text-sm">{message.message}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="w-full p-2 border rounded-lg"
                  />
                  <Button
                    text="送信"
                    icon="fa-regular fa-paper-plane"
                    onClick={handleSendMessage}
                    className="mt-2 w-full"
                    disabled={sending}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">
                  チャットルームを選択してください
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {isCreatingRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="text-lg font-medium mb-4">
              新しいチャットルームを作成
            </h2>
            <input
              type="text"
              value={newRoomTitle}
              onChange={(e) => setNewRoomTitle(e.target.value)}
              placeholder="チャットルームのタイトル"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-3">
              <Button
                text="キャンセル"
                onClick={() => setIsCreatingRoom(false)}
                className="bg-gray-100 hover:bg-gray-200"
              />
              <Button
                text="作成"
                onClick={handleCreateRoom}
                className="bg-[#357AFF] text-white hover:bg-[#2E69DE]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;
