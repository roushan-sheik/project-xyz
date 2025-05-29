async function handler() {
  try {
    const templates = await sql`
      SELECT * FROM photo_edit_templates 
      WHERE is_active = true 
      ORDER BY created_at DESC
    `;

    return { templates };
  } catch (error) {
    return { error: "テンプレートの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}