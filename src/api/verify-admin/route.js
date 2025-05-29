async function handler({ sessionToken }) {
  if (!sessionToken) {
    return { error: "認証情報がありません" };
  }

  try {
    // Get user from session
    const [session] = await sql`
      SELECT s.*, u.role 
      FROM auth_sessions s
      JOIN auth_users u ON s."userId" = u.id
      WHERE s."sessionToken" = ${sessionToken}
      AND s.expires > CURRENT_TIMESTAMP
    `;

    if (!session) {
      return { error: "セッションが無効です" };
    }

    if (session.role !== "admin") {
      return { error: "管理者権限がありません" };
    }

    return {
      isAdmin: true,
      userId: session.userId,
      role: session.role,
    };
  } catch (error) {
    console.error("Admin verification error:", error);
    return { error: "認証処理中にエラーが発生しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}