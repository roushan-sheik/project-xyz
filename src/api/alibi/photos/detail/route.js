async function handler({ id }) {
  const session = getSession();
  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  if (!id) {
    return { error: "写真IDは必須です" };
  }

  try {
    const [photo] = await sql`
      SELECT * FROM alibi_photos 
      WHERE id = ${id}
    `;

    if (!photo) {
      return { error: "写真が見つかりませんでした" };
    }

    return { photo };
  } catch (error) {
    return { error: "写真の取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}