async function handler({ email }) {
  if (!email) {
    return { error: "メールアドレスは必須です" };
  }

  try {
    const [user] = await sql`
      SELECT role 
      FROM auth_users 
      WHERE email = ${email}
    `;

    if (!user || user.role !== "admin") {
      return { error: "管理者権限がありません" };
    }

    return { success: true };
  } catch (error) {
    return { error: "認証に失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}