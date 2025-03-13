import sgMail from "@sendgrid/mail";

// Set your SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    const msg = {
        to: userEmail,
        from: "goyal.dhruv.2016729@gmail.com",
        subject: "Order Confirmation - Nike Store",
        html: `
            <h2>Thank you for your order!</h2>
            <p>Your order has been placed successfully.</p>
            <p><strong>Order Summary:</strong></p>
            <ul>
                ${orderDetails.products.map(
            (item) => `<li>${item.quantity}x ${item.title} - ₹${item.totalPrice}</li>`
        ).join("")}
            </ul>
            <p>Total Amount: <strong>₹${orderDetails.totalAmount}</strong></p>
            <p>We appreciate your business!</p>
        `,
    };

    try {
        await sgMail.send(msg);
        // console.log("✅ Order confirmation email sent successfully!");
    } catch (error) {
        console.error("❌ Failed to send email:", error.response ? error.response.body : error.message);
    }
};
