import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists." });
		}

		user = new User({ email, password });
		await user.save();

		const payload = { user: { id: user.id } };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.json({ token, email });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
}


export async function login (req, res) {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: "Invalid credentials" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		const payload = { user: { id: user.id } };
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.json({ token });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};