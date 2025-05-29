async function handler() {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  try {
    const messages = await sql`
      SELECT * FROM chat_messages 
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC 
      LIMIT 100
    `;

    return { messages };
  } catch (error) {
    return { error: "メッセージの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}