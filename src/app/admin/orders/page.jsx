"use client";
import React from "react";
import { useEffect, useState } from "react";

function MainComponent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders");
      if (!response.ok) {
        throw new Error("注文データの取得に失敗しました");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/admin/update-order-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("ステータスの更新に失敗しました");
      }

      // 注文リストを更新
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return <></>;
}

export default MainComponent;
