import sgMail from "@sendgrid/mail";

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    const msg = {
        to: userEmail,
        from: "goyal.dhruv.2016729@gmail.com",
        subject: "Order Confirmation - Nike Store",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #e2e2e2;">
                <div style="text-align: center; background-color: #f7f7f7; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h2 style="font-size: 24px; color: #333; margin: 0;">Thank You for Your Order!</h2>
                    <p style="font-size: 16px; color: #555; margin: 0;">We’ve received your order and it's being processed.</p>
                </div>
                <div style="background-color: #fff; padding: 20px; border-radius: 0 0 8px 8px;">
                    <p style="font-size: 16px; color: #333;">Your order has been successfully placed. Here’s a summary of your order:</p>
                    <p style="font-size: 16px; font-weight: bold; color: #333;">Order Summary:</p>
                    <ul style="font-size: 16px; color: #555; padding-left: 20px;">
                        ${orderDetails.products.map(
            (item) => `<li>${item.quantity}x ${item.title} - <strong>₹${item.discountedPrice}</strong></li>`
        ).join("")}
                    </ul>
                    <p style="font-size: 16px; font-weight: bold; color: #333;">Total Amount: <strong>₹${orderDetails.totalAmount}</strong></p>
                    <p style="font-size: 16px; color: #333;">Your Order ID: <strong>${orderDetails.orderId}</strong></p>
                    <p style="font-size: 16px; color: #333;">Your Payment ID: <strong>${orderDetails.paymentId}</strong></p>
                    <p style="font-size: 16px; color: #333;">We appreciate your business and look forward to serving you again!</p>
                </div>
                <div style="text-align: center; margin-top: 20px;">
                    <p style="font-size: 14px; color: #888;">&copy; ${new Date().getFullYear()} Nike Store</p>
                </div>
            </div>
        `,
    };

    try {
        await sgMail.send(msg);
        // console.log(" Order confirmation email sent successfully!");
    } catch (error) {
        console.error(" Failed to send email:", error.response ? error.response.body : error.message);
    }
};
