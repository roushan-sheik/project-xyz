async function handler({ message }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  if (!message) {
    return { error: "メッセージは必須です" };
  }

  try {
    const [newMessage] = await sql`
      INSERT INTO chat_messages (user_id, message) 
      VALUES (${session.user.id}, ${message}) 
      RETURNING *
    `;

    return { message: newMessage };
  } catch (error) {
    return { error: "メッセージの作成に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}