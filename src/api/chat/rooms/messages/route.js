async function handler({ roomId }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  if (!roomId) {
    return { error: "ルームIDは必須です" };
  }

  try {
    await sql.transaction([
      sql`
        UPDATE chat_messages 
        SET is_read = true 
        WHERE room_id = ${roomId} 
        AND user_id != ${session.user.id}
        AND is_read = false
      `,
      sql`
        UPDATE chat_rooms
        SET last_message_at = CURRENT_TIMESTAMP
        WHERE id = ${roomId}
      `,
    ]);

    const messages = await sql`
      SELECT * FROM chat_messages 
      WHERE room_id = ${roomId}
      ORDER BY created_at ASC
    `;

    return { messages };
  } catch (error) {
    return { error: "メッセージの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}