async function handler() {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  try {
    const rooms = await sql`
      WITH last_messages AS (
        SELECT DISTINCT ON (room_id)
          room_id,
          message,
          created_at
        FROM chat_messages
        ORDER BY room_id, created_at DESC
      ),
      unread_counts AS (
        SELECT 
          room_id,
          COUNT(*) as count
        FROM chat_messages
        WHERE is_read = false 
        AND user_id != ${session.user.id}
        GROUP BY room_id
      )
      SELECT 
        r.*,
        lm.message as last_message,
        COALESCE(uc.count, 0) as unread_count
      FROM chat_rooms r
      LEFT JOIN last_messages lm ON r.id = lm.room_id
      LEFT JOIN unread_counts uc ON r.id = uc.room_id
      WHERE r.user_id = ${session.user.id}
      ORDER BY r.updated_at DESC
    `;

    return { rooms };
  } catch (error) {
    return { error: "チャットルームの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}