import Transaction from "../models/Transaction.js";

export async function getTransactions(req, res) {
	try {
		const transactions = await Transaction.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(transactions);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}

export async function addTransaction(req, res) {
	const { amount, category, type, date, note } = req.body;
	try {
		const newTransaction = new Transaction({
			user: req.user.id,
			amount,
			category,
			type,
			date,
			note,
		});

		const transaction = await newTransaction.save();
		res.json(transaction);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}

export async function updateTransaction(req, res) {
	const { amount, category, type, date, note } = req.body;

	try {
		let transaction = await Transaction.findById(req.params.id);
		if (!transaction)
			return res.status(404).json({ message: "Transaction not found" });

		if (transaction.user.toString() !== req.user.id)
			return res.status(401).json({ message: "Not authorized" });

		transaction = await Transaction.findByIdAndUpdate(
			req.params.id,
			{ amount, category, type, date, note },
			{ new: true }
		);

		res.json(transaction);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}

export async function deleteTransaction(req, res) {
	try {
		let transaction = await Transaction.findById(req.params.id);
		if (!transaction)
			return res.status(404).json({ message: "Transaction not found" });

		if (transaction.user.toString() !== req.user.id)
			return res.status(401).json({ message: "Not authorized" });

		await Transaction.findByIdAndRemove(req.params.id);
		res.json({ message: "Transaction removed" });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}
