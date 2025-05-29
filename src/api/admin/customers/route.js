async function handler({ search }) {
  try {
    let queryStr = `
      SELECT 
        au.id,
        au.name,
        au.email,
        au.role,
        au."emailVerified",
        au.image,
        au.created_at
      FROM auth_users au
      WHERE role = 'user'
    `;

    const values = [];
    let paramCount = 1;

    if (search) {
      queryStr += ` AND (
        LOWER(name) LIKE LOWER($${paramCount}) 
        OR LOWER(email) LIKE LOWER($${paramCount})
      )`;
      values.push(`%${search}%`);
    }

    queryStr += ` ORDER BY created_at DESC`;

    const customers = await sql(queryStr, values);

    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name || "",
        email: customer.email || "",
        emailVerified: customer.emailVerified,
        image: customer.image,
        created_at: customer.created_at,
      })),
    };
  } catch (error) {
    return { error: "顧客データの取得に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}