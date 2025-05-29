async function handler({ orderId, status }) {
  try {
    if (!orderId || !status) {
      return { error: "注文IDとステータスは必須です" };
    }

    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return { error: "無効なステータスです" };
    }

    const result = await sql`
      UPDATE photo_edit_requests 
      SET status = ${status}, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ${orderId} 
      RETURNING id, status
    `;

    if (result.length === 0) {
      return { error: "注文が見つかりません" };
    }

    return {
      success: true,
      order: result[0],
    };
  } catch (error) {
    return { error: "ステータスの更新に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}