async function handler({ search, page = 1, limit = 10, status = "all" }) {
  try {
    const offset = (page - 1) * limit;
    let queryParams = [];
    let conditions = ["1=1"];
    let paramCounter = 1;

    if (search) {
      conditions.push(`(
        CAST(id AS TEXT) LIKE $${paramCounter} 
        OR LOWER(email) LIKE LOWER($${paramCounter})
      )`);
      queryParams.push(`%${search}%`);
      paramCounter++;
    }

    if (status !== "all") {
      conditions.push(`status = $${paramCounter}`);
      queryParams.push(status);
      paramCounter++;
    }

    const whereClause = conditions.join(" AND ");

    const [orders, countResult] = await sql.transaction([
      sql(
        `
        SELECT 
          o.*,
          u.email,
          u.name
        FROM photo_edit_requests o
        LEFT JOIN auth_users u ON o.user_id = u.id
        WHERE ${whereClause}
        ORDER BY o.created_at DESC
        LIMIT $${paramCounter} OFFSET $${paramCounter + 1}
      `,
        [...queryParams, limit, offset]
      ),

      sql(
        `
        SELECT COUNT(*) as total
        FROM photo_edit_requests o
        LEFT JOIN auth_users u ON o.user_id = u.id
        WHERE ${whereClause}
      `,
        queryParams
      ),
    ]);

    const total = parseInt(countResult[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      orders,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      error: "Failed to fetch orders",
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}