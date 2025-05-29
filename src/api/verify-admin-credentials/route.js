async function handler({ email }) {
  if (!email) {
    return { error: "メールアドレスが必要です" };
  }

  const [user] = await sql`
    SELECT role 
    FROM auth_users 
    WHERE email = ${email}
  `;

  if (!user || user.role !== "admin") {
    return { error: "管理者権限がありません" };
  }

  return { success: true };
}
export async function POST(request) {
  return handler(await request.json());
}