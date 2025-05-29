async function handler({
  page = 1,
  search = "",
  status = "all",
  type = "all",
}) {
  try {
    const offset = (page - 1) * 10;
    const conditions = [];
    const values = [];
    let valueIndex = 1;

    if (search) {
      conditions.push(`(
        CAST(id AS TEXT) LIKE $${valueIndex} OR 
        vendor_name LIKE $${valueIndex} OR 
        internal_notes LIKE $${valueIndex} OR 
        completion_notes LIKE $${valueIndex}
      )`);
      values.push(`%${search}%`);
      valueIndex++;
    }

    if (status !== "all") {
      conditions.push(`order_status = $${valueIndex}`);
      values.push(status);
      valueIndex++;
    }

    if (type === "photo") {
      conditions.push(`template_id IS NOT NULL`);
    } else if (type === "dispatch") {
      conditions.push(`area IS NOT NULL`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM (
        SELECT id FROM photo_edit_requests ${whereClause}
        UNION ALL
        SELECT id FROM uncle_dispatch_requests ${whereClause}
      ) as combined_orders
    `;

    const countResult = await sql`${countQuery}`;
    const total = parseInt(countResult[0].total);
    const totalPages = Math.ceil(total / 10);

    // Get orders with pagination
    const query = `
      SELECT 
        id,
        'photo' as type,
        created_at,
        vendor_id,
        vendor_name,
        order_status,
        expected_delivery_date,
        delivery_status,
        completion_notes,
        internal_notes,
        edit_description as description
      FROM photo_edit_requests
      ${whereClause}
      UNION ALL
      SELECT 
        id,
        'dispatch' as type,
        created_at,
        vendor_id,
        vendor_name,
        order_status,
        expected_delivery_date,
        delivery_status,
        completion_notes,
        internal_notes,
        area as description
      FROM uncle_dispatch_requests
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT 10 OFFSET ${offset}
    `;

    const orders = await sql`${query}`;

    return {
      orders,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("注文データの取得に失敗しました");
  }
}
export async function POST(request) {
  return handler(await request.json());
}