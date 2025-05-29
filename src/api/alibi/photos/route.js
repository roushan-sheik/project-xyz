async function handler() {
  try {
    const photos = await sql`
      SELECT * FROM alibi_photos 
      ORDER BY created_at DESC
    `;

    return { photos };
  } catch (error) {
    return { error: "アリバイ写真の取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}