async function handler() {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  try {
    const history = await sql`
      SELECT 
        u.*,
        p.title,
        p.image_url
      FROM alibi_photo_usage u
      JOIN alibi_photos p ON u.photo_id = p.id
      WHERE u.user_id = ${session.user.id}
      ORDER BY u.used_at DESC
    `;

    return { history };
  } catch (error) {
    return { error: "履歴の取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}