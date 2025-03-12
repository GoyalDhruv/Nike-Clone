import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                title: { type: String, required: true },
                image: { type: String, required: true },
                quantity: { type: Number, required: true },
                size: { type: String },
                color: { type: String },
                totalPrice: { type: Number, required: true },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["unpaid", "paid", "failed"],
            default: "unpaid",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
