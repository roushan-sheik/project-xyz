async function handler({ imageUrl, category }) {
  if (!imageUrl) {
    return { error: "画像URLは必須です" };
  }

  try {
    const [image] = await sql`
      INSERT INTO photo_edit_templates (
        title,
        image_url,
        category,
        is_active,
        created_at,
        updated_at
      ) VALUES (
        ${category || "その他"},
        ${imageUrl},
        ${category || "other"},
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      RETURNING *
    `;

    return { image };
  } catch (error) {
    console.error("Error creating image:", error);
    return { error: "画像の登録に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}