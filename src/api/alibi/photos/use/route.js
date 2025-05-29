async function handler({ photoId, note }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  if (!photoId) {
    return { error: "写真IDは必須です" };
  }

  try {
    const [usage] = await sql`
      INSERT INTO alibi_photo_usage 
        (user_id, photo_id, note)
      VALUES 
        (${session.user.id}, ${photoId}, ${note || null})
      RETURNING *
    `;

    return { usage };
  } catch (error) {
    return { error: "アリバイ写真の使用記録に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}