import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		amount: { type: Number, required: true },
		category: { type: String, required: true },
		type: { type: String, enum: ["income", "expense"], required: true },
		date: { type: Date, default: Date.now },
		note: { type: String },
	},
	{ timestamps: true }
);

export default model("Transaction", transactionSchema);
