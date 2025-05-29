async function handler() {
  const session = getSession();

  if (!session?.user?.id) {
    return { error: "認証が必要です" };
  }

  const [user] = await sql`
    SELECT role 
    FROM auth_users 
    WHERE id = ${session.user.id}
  `;

  if (!user || user.role !== "admin") {
    return { error: "管理者権限が必要です" };
  }

  return { isAdmin: true };
}
export async function POST(request) {
  return handler(await request.json());
}