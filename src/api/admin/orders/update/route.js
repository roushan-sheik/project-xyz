async function handler({ orderId, field, value }) {
  try {
    // Validate field name to prevent SQL injection
    const allowedFields = [
      "order_status",
      "delivery_status",
      "expected_delivery_date",
      "vendor_name",
      "vendor_id",
      "completion_notes",
      "internal_notes",
    ];

    if (!allowedFields.includes(field)) {
      throw new Error("Invalid field name");
    }

    // Try to update photo_edit_requests first
    const photoResult = await sql`
      UPDATE photo_edit_requests 
      SET ${sql(field)} = ${value},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
      RETURNING id
    `;

    // If no photo request was updated, try uncle_dispatch_requests
    if (photoResult.length === 0) {
      const dispatchResult = await sql`
        UPDATE uncle_dispatch_requests 
        SET ${sql(field)} = ${value},
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ${orderId}
        RETURNING id
      `;

      if (dispatchResult.length === 0) {
        throw new Error("Order not found");
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("注文の更新に失敗しました");
  }
}
export async function POST(request) {
  return handler(await request.json());
}