async function handler({ email, password, role, name }) {
  if (!email || !password || !role || !name) {
    return {
      error: "必須項目が不足しています",
    };
  }

  if (role !== "admin" && role !== "staff") {
    return {
      error: "無効な権限です",
    };
  }

  try {
    const existingUser = await sql`
      SELECT id FROM auth_users 
      WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return {
        error: "このメールアドレスは既に使用されています",
      };
    }

    const [user] = await sql.transaction([
      sql`
        INSERT INTO auth_users (email, name, role)
        VALUES (${email}, ${name}, ${role})
        RETURNING id
      `,
    ]);

    if (!user?.id) {
      throw new Error("ユーザーの作成に失敗しました");
    }

    await sql`
      INSERT INTO auth_accounts (
        "userId",
        type,
        provider,
        "providerAccountId",
        password
      )
      VALUES (
        ${user.id},
        'credentials',
        'credentials',
        ${email},
        ${password}
      )
    `;

    return {
      success: true,
      user: {
        id: user.id,
        email,
        name,
        role,
      },
    };
  } catch (error) {
    console.error("Admin account creation error:", error);
    return {
      error: "アカウントの作成に失敗しました",
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}