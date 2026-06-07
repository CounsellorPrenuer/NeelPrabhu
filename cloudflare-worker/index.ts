export interface Env {
  DB: D1Database;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  RAZORPAY_WEBHOOK_SECRET: string;
  ALLOWED_ORIGINS: string;
  VALID_PROJECT_IDS: string;
}

const PLAN_AMOUNT_PAISE: Record<string, number> = {
  "pkg-1": 550000,
  "pkg-2": 1500000,
  "pkg-3": 599900,
  "pkg-4": 1059900,
  "pkg-5": 649900,
  "pkg-6": 1059900,
  "mp-3": 649900,
  "mp-2": 1059900,
  "career-report": 150000,
  "career-report-counselling": 300000,
  "knowledge-gateway": 10000,
  "one-to-one-session": 350000,
  "college-admission-planning": 300000,
  "exam-stress-management": 100000,
  "cap-100": 19900,
  "deepa-lal-pkg-1": 550000,
  "deepa-lal-pkg-2": 1500000,
  "deepa-lal-pkg-3": 599900,
  "deepa-lal-pkg-4": 1059900,
  "deepa-lal-pkg-5": 649900,
  "deepa-lal-pkg-6": 1059900,
  "deepa-lal-mp-3": 649900,
  "deepa-lal-mp-2": 1059900,
  "deepa-lal-custom-career-report": 150000,
  "deepa-lal-custom-career-report-counselling": 300000,
  "deepa-lal-custom-knowledge-gateway": 10000,
  "deepa-lal-custom-one-to-one": 350000,
  "deepa-lal-custom-college-admission": 300000,
  "deepa-lal-custom-exam-stress": 100000,
  "deepa-lal-custom-cap-100": 19900,
  "santosh-jaiswal-pkg-1": 550000,
  "santosh-jaiswal-pkg-2": 1500000,
  "santosh-jaiswal-pkg-3": 599900,
  "santosh-jaiswal-pkg-4": 1059900,
  "santosh-jaiswal-pkg-5": 649900,
  "santosh-jaiswal-pkg-6": 1059900,
  "santosh-jaiswal-mp-3": 649900,
  "santosh-jaiswal-mp-2": 1059900,
  "santosh-jaiswal-custom-career-report": 150000,
  "santosh-jaiswal-custom-career-report-counselling": 300000,
  "santosh-jaiswal-custom-knowledge-gateway": 10000,
  "santosh-jaiswal-custom-one-to-one-session": 350000,
  "santosh-jaiswal-custom-college-admission-planning": 300000,
  "santosh-jaiswal-custom-exam-stress-management": 100000,
  "santosh-jaiswal-custom-cap-100": 19900,
  "rita-pkg-1": 550000,
  "rita-pkg-2": 1500000,
  "rita-pkg-3": 599900,
  "rita-pkg-4": 1059900,
  "rita-pkg-5": 649900,
  "rita-pkg-6": 1059900,
  "rita-mp-3": 649900,
  "rita-mp-2": 1059900,
  "rita-custom-career-report": 150000,
  "rita-custom-career-report-counselling": 300000,
  "rita-custom-knowledge-gateway": 10000,
  "rita-custom-one-to-one-session": 350000,
  "rita-custom-college-admission-planning": 300000,
  "rita-custom-exam-stress-management": 100000,
  "rita-custom-cap-100": 19900,
  "proxima-pkg-1": 550000,
  "proxima-pkg-2": 1500000,
  "proxima-pkg-3": 599900,
  "proxima-pkg-4": 1059900,
  "proxima-pkg-5": 649900,
  "proxima-pkg-6": 1059900,
  "proxima-mp-3": 649900,
  "proxima-mp-2": 1059900,
  "proxima-custom-career-report": 150000,
  "proxima-custom-career-report-counselling": 300000,
  "proxima-custom-knowledge-gateway": 10000,
  "proxima-custom-one-to-one-session": 350000,
  "proxima-custom-college-admission-planning": 300000,
  "proxima-custom-exam-stress-management": 100000,
  "proxima-custom-cap-100": 19900,
  "NeelPrabhu-pkg-1": 550000,
  "NeelPrabhu-pkg-2": 1500000,
  "NeelPrabhu-pkg-3": 599900,
  "NeelPrabhu-pkg-4": 1059900,
  "NeelPrabhu-pkg-5": 649900,
  "NeelPrabhu-pkg-6": 1059900,
  "NeelPrabhu-mp-3": 649900,
  "NeelPrabhu-mp-2": 1059900,
  "NeelPrabhu-custom-career-report": 150000,
  "NeelPrabhu-custom-career-report-counselling": 300000,
  "NeelPrabhu-custom-knowledge-gateway": 10000,
  "NeelPrabhu-custom-one-to-one-session": 350000,
  "NeelPrabhu-custom-college-admission-planning": 300000,
  "NeelPrabhu-custom-exam-stress-management": 100000,
  "NeelPrabhu-custom-cap-100": 19900,
};

const applyDiscount = (
  basePaise: number,
  row: { discount_type: string; discount_value: number },
) => {
  const value = Number(row.discount_value || 0);
  if (row.discount_type === "percentage") {
    return Math.max(100, Math.round(basePaise - (basePaise * value) / 100));
  }
  return Math.max(100, basePaise - value * 100);
};

const resolvePlanAmount = (plan_id: string): number | undefined => {
  const id = String(plan_id || "").trim();
  if (PLAN_AMOUNT_PAISE[id]) return PLAN_AMOUNT_PAISE[id];
  const stripped = id.replace(
    /^(rita|deepa-lal|santosh-jaiswal|proxima|NeelPrabhu)-/,
    "",
  );
  const canonical = stripped.replace(/^custom-/, "");
  return PLAN_AMOUNT_PAISE[canonical] ?? PLAN_AMOUNT_PAISE[stripped];
};

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const hmacSha256Hex = async (secret: string, data: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data),
  );
  return toHex(signature);
};

const withCors = (origin?: string) => ({
  "content-type": "application/json",
  ...(origin
    ? {
        "access-control-allow-origin": origin,
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type",
      }
    : {}),
});

const ok = (data: unknown, origin?: string) =>
  new Response(JSON.stringify(data), { status: 200, headers: withCors(origin) });
const err = (message: string, status: number, origin?: string) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: withCors(origin),
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("origin") || "";
    const allowOrigins = env.ALLOWED_ORIGINS.split(",").map((x) => x.trim());

    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: withCors(allowOrigins.includes(origin) ? origin : undefined),
      });
    if (origin && !allowOrigins.includes(origin))
      return err("Origin not allowed", 403);

    if (url.pathname === "/health")
      return ok({ ok: true, worker: "multi-tenant-platform" }, origin);

    const payload =
      request.method === "POST" ? await request.json().catch(() => ({})) : {};
    const project_id = payload.project_id;
    const projectIds = env.VALID_PROJECT_IDS.split(",").map((x) => x.trim());
    if (!project_id || !projectIds.includes(project_id))
      return err("Invalid project_id", 400, origin);

    if (url.pathname === "/api/forms/submit") {
      const { name, email, phone, message, plan_id } = payload as Record<
        string,
        string
      >;
      await env.DB.prepare(
        "INSERT INTO leads (id, form_type, name, email, phone, message, metadata, source, submitted_at, project_id, plan_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
        .bind(
          crypto.randomUUID(),
          "pricing",
          name || "",
          email || "",
          phone || "",
          message || null,
          null,
          "website",
          new Date().toISOString(),
          project_id,
          plan_id || null,
        )
        .run();
      return ok({ success: true }, origin);
    }

    if (url.pathname === "/api/coupons/preview") {
      const { plan_id, coupon_code, code } = payload as Record<string, string>;
      const couponCode = String(coupon_code || code || "").toUpperCase();
      if (!couponCode) return err("Coupon code required", 400, origin);
      const row = await env.DB.prepare(
        "SELECT code, discount_type, COALESCE(discount_value, value) as discount_value, active FROM coupons WHERE project_id = ? AND code = ? AND active = 1",
      )
        .bind(project_id, couponCode)
        .first<{ discount_type: string; discount_value: number; code: string }>();
      if (!row) return err("Coupon not found", 404, origin);
      const base = resolvePlanAmount(String(plan_id || ""));
      if (!base) return err("Invalid plan_id", 400, origin);
      const final_amount = applyDiscount(base, row);
      const discount_amount = base - final_amount;
      return ok(
        {
          valid: true,
          code: row.code,
          discount_type: row.discount_type,
          discount_value: row.discount_value,
          base_amount: base,
          discount_amount,
          final_amount,
          amount_in_rupees: Math.round(final_amount / 100),
          message: `${row.code} applied`,
        },
        origin,
      );
    }

    if (url.pathname === "/api/payments/create-order") {
      const { plan_id, name, email, phone, coupon_code, code } =
        payload as Record<string, string>;
      const now = new Date().toISOString();
      const baseAmount = resolvePlanAmount(String(plan_id || ""));
      if (!baseAmount) return err("Invalid plan_id", 400, origin);

      let amount = baseAmount;
      let discountAmount = 0;
      const couponCode = String(coupon_code || code || "").toUpperCase();
      if (couponCode) {
        const row = await env.DB.prepare(
          "SELECT code, discount_type, COALESCE(discount_value, value) as discount_value, active FROM coupons WHERE project_id = ? AND code = ? AND active = 1",
        )
          .bind(project_id, couponCode)
          .first<{ discount_type: string; discount_value: number }>();
        if (!row) return err("Coupon not found", 404, origin);
        amount = applyDiscount(baseAmount, row);
        discountAmount = baseAmount - amount;
      }
      const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
      const rzRes = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          amount: String(amount),
          currency: "INR",
          receipt: `${project_id}-${Date.now()}`,
        }),
      });
      if (!rzRes.ok) {
        const rzBody = await rzRes.text();
        return err(`Razorpay order error: ${rzBody.slice(0, 200)}`, 502, origin);
      }
      const rzOrder = (await rzRes.json()) as {
        id: string;
        amount: number;
        currency: string;
      };
      const order_id = rzOrder.id;

      await env.DB.prepare(
        "INSERT INTO payments (id, order_id, plan_id, customer_name, customer_email, customer_phone, coupon_code, base_amount, discount_amount, final_amount, status, created_at, updated_at, project_id, razorpay_order_id, amount, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
        .bind(
          crypto.randomUUID(),
          order_id,
          plan_id || "",
          name || "",
          email || "",
          phone || "",
          couponCode || null,
          baseAmount,
          discountAmount,
          rzOrder.amount,
          "created",
          now,
          now,
          project_id,
          order_id,
          rzOrder.amount,
          rzOrder.currency,
        )
        .run();
      return ok(
        {
          key_id: env.RAZORPAY_KEY_ID,
          order_id,
          razorpay_order_id: order_id,
          amount: rzOrder.amount,
          base_amount: baseAmount,
          discount_amount: discountAmount,
          final_amount: rzOrder.amount,
          amount_in_rupees: Math.round(rzOrder.amount / 100),
          currency: rzOrder.currency,
        },
        origin,
      );
    }

    if (url.pathname === "/api/payments/verify") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        payload as Record<string, string>;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return err("Missing Razorpay verification fields", 400, origin);
      }
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expected = await hmacSha256Hex(env.RAZORPAY_KEY_SECRET, body);
      if (expected !== razorpay_signature) {
        await env.DB.prepare(
          "UPDATE payments SET status = ?, updated_at = ? WHERE project_id = ? AND (order_id = ? OR razorpay_order_id = ?)",
        )
          .bind(
            "failed",
            new Date().toISOString(),
            project_id,
            razorpay_order_id,
            razorpay_order_id,
          )
          .run();
        return err("Invalid payment signature", 400, origin);
      }
      await env.DB.prepare(
        "UPDATE payments SET razorpay_payment_id = ?, status = ?, updated_at = ? WHERE project_id = ? AND (order_id = ? OR razorpay_order_id = ?)",
      )
        .bind(
          razorpay_payment_id || "",
          "captured",
          new Date().toISOString(),
          project_id,
          razorpay_order_id || "",
          razorpay_order_id || "",
        )
        .run();
      return ok({ success: true }, origin);
    }

    return err("Not found", 404, origin);
  },
};
