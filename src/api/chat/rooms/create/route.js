async function handler({ title }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  try {
    const [room] = await sql`
      INSERT INTO chat_rooms (user_id, title)
      VALUES (${session.user.id}, ${title || "新規チャット"})
      RETURNING *
    `;

    return { room };
  } catch (error) {
    return { error: "チャットルームの作成に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}