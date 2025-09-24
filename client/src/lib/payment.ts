import { apiRequest } from "./queryClient";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export async function initiatePayment(paymentData: PaymentData) {
  try {
    // Validate required fields
    if (!paymentData.customerName || !paymentData.customerEmail) {
      throw new Error("Customer name and email are required");
    }

    // Create order
    const orderResponse = await apiRequest("POST", "/api/create-order", paymentData);
    const orderData = await orderResponse.json();

    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    const options: RazorpayOptions = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "CareerMentoria",
      description: "Career Guidance Service",
      order_id: orderData.orderId,
      handler: async function (response: any) {
        try {
          // Verify payment
          const verifyResponse = await apiRequest("POST", "/api/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          const verifyResult = await verifyResponse.json();
          
          if (verifyResult.success) {
            // Payment successful
            alert("Payment successful! Thank you for your purchase.");
            window.location.reload();
          } else {
            throw new Error("Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        contact: paymentData.customerPhone || "",
      },
      theme: {
        color: "#2DACA8", // Primary color from design
      },
      modal: {
        ondismiss: function() {
          console.log("Payment modal closed");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Failed to initiate payment. Please try again.");
    throw error;
  }
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Helper function to validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone number
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}
