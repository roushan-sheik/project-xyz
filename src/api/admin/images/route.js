async function handler({ search, category }) {
  try {
    let queryStr = `
      SELECT id, title, description, image_url, category, created_at, updated_at
      FROM photo_edit_templates
      WHERE is_active = true
    `;

    const values = [];
    let paramCount = 1;

    if (search) {
      queryStr += ` AND (LOWER(title) LIKE LOWER($${paramCount}) OR LOWER(description) LIKE LOWER($${paramCount}))`;
      values.push(`%${search}%`);
      paramCount++;
    }

    if (category && category !== "all") {
      queryStr += ` AND category = $${paramCount}`;
      values.push(category);
    }

    queryStr += ` ORDER BY created_at DESC`;

    const images = await sql(queryStr, values);

    return {
      images: images.map((img) => ({
        id: img.id,
        title: img.title,
        description: img.description,
        url: img.image_url,
        category: img.category,
        created_at: img.created_at,
        updated_at: img.updated_at,
      })),
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { error: "画像データの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}