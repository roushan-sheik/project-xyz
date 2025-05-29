async function handler() {
  const session = getSession();

  if (!session?.user?.id) {
    return { success: true };
  }

  try {
    await sql`
      DELETE FROM auth_sessions 
      WHERE "userId" = ${session.user.id}
    `;

    return { success: true };
  } catch (error) {
    return { error: "セッションのクリアに失敗しました" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}