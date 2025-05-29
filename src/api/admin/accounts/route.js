async function handler() {
  try {
    const accounts = await sql`
      SELECT id, name, email, role, "emailVerified", image, created_at
      FROM auth_users 
      WHERE role = 'admin'
      ORDER BY created_at DESC
    `;

    return {
      accounts: accounts.map((account) => ({
        id: account.id,
        name: account.name || "",
        email: account.email,
        role: account.role,
        emailVerified: account.emailVerified,
        image: account.image,
        created_at: account.created_at,
      })),
    };
  } catch (error) {
    return {
      error: "アカウントデータの取得に失敗しました",
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}