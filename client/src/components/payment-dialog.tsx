import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { CONTACT_EMAIL, PROJECT_ID, apiUrl } from "@/lib/config";

const paymentFormSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  couponCode: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageId: string;
  packageName: string;
  packagePrice: string;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PaymentDialog({
  open,
  onOpenChange,
  packageId,
  packageName,
  packagePrice,
}: PaymentDialogProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountPreview, setDiscountPreview] = useState("");

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      couponCode: "",
    },
  });

  const parseJsonSafe = async (res: Response) => {
    const raw = await res.text();
    try {
      return JSON.parse(raw);
    } catch {
      throw new Error(raw.slice(0, 160) || `HTTP ${res.status}`);
    }
  };

  const previewCoupon = useMutation({
    mutationFn: async () => {
      const couponCode = form.getValues("couponCode")?.trim();
      if (!couponCode) return null;
      const res = await fetch(apiUrl("/api/coupons/preview"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          code: couponCode,
          plan_id: packageId,
        }),
      });
      if (!res.ok) {
        const payload = await parseJsonSafe(res).catch(() => ({}));
        throw new Error(payload.error || "Coupon not valid");
      }
      return parseJsonSafe(res);
    },
    onSuccess: (data: { message?: string; amount_in_rupees?: number } | null) => {
      if (!data) return;
      const msg =
        data.message ||
        (data.amount_in_rupees
          ? `Discount applied — pay ${data.amount_in_rupees}`
          : "Coupon applied");
      setDiscountPreview(msg);
      toast({ title: "Coupon applied", description: msg });
    },
    onError: (error: Error) => {
      setDiscountPreview("");
      toast({
        title: "Coupon invalid",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: PaymentFormData) => {
      const res = await fetch(apiUrl("/api/payments/create-order"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          plan_id: packageId,
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
          coupon_code: data.couponCode?.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const payload = await parseJsonSafe(res).catch(() => ({}));
        throw new Error(payload.error || "Failed to create order");
      }
      return parseJsonSafe(res);
    },
    onSuccess: (orderData) => openRazorpayCheckout(orderData),
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create order",
        variant: "destructive",
      });
      setIsProcessing(false);
    },
  });

  const verifyPaymentMutation = useMutation({
    mutationFn: async (paymentData: Record<string, string>) => {
      const res = await fetch(apiUrl("/api/payments/verify"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_id: PROJECT_ID, ...paymentData }),
      });
      if (!res.ok) {
        const payload = await parseJsonSafe(res).catch(() => ({}));
        throw new Error(payload.error || "Verification failed");
      }
      return parseJsonSafe(res);
    },
    onSuccess: (_data, vars) => {
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
      const values = form.getValues();
      const subject = encodeURIComponent(`Payment Confirmation - ${packageName}`);
      const body = encodeURIComponent(
        `Name: ${values.customerName}\nEmail: ${values.customerEmail}\nPhone: ${values.customerPhone}\nPlan: ${packageName}\nPlan ID: ${packageId}\nPayment ID: ${vars.razorpay_payment_id}`,
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setIsProcessing(false);
      onOpenChange(false);
      form.reset();
      setDiscountPreview("");
    },
    onError: (error: Error) => {
      toast({
        title: "Payment Verification Failed",
        description: error.message || "Payment verification failed",
        variant: "destructive",
      });
      setIsProcessing(false);
    },
  });

  const openRazorpayCheckout = (orderData: {
    key_id?: string;
    amount?: number;
    currency?: string;
    order_id?: string;
  }) => {
    if (!window.Razorpay || !orderData.key_id) {
      toast({
        title: "Payment configuration missing",
        description: "Please contact support. Payment key is not configured.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency || "INR",
      name: "Neel Prabhu Career Mentoria",
      description: packageName,
      order_id: orderData.order_id,
      handler: (response: Record<string, string>) =>
        verifyPaymentMutation.mutate(response),
      prefill: {
        name: form.getValues("customerName"),
        email: form.getValues("customerEmail"),
        contact: form.getValues("customerPhone"),
      },
      theme: { color: "#2563eb" },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment.",
          });
        },
      },
      redirect: false,
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const onSubmit = (data: PaymentFormData) => {
    setIsProcessing(true);
    createOrderMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You are purchasing {packageName} for {packagePrice}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              {...form.register("customerName")}
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="customerEmail">Email *</Label>
            <Input
              id="customerEmail"
              type="email"
              {...form.register("customerEmail")}
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="customerPhone">Phone Number *</Label>
            <Input
              id="customerPhone"
              {...form.register("customerPhone")}
              disabled={isProcessing}
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="couponCode">Coupon (optional)</Label>
              <Input
                id="couponCode"
                {...form.register("couponCode")}
                disabled={isProcessing}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => previewCoupon.mutate()}
              disabled={isProcessing || previewCoupon.isPending}
            >
              Apply
            </Button>
          </div>
          {discountPreview && (
            <p className="text-xs text-green-700">{discountPreview}</p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
