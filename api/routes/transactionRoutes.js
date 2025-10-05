import { Router } from "express";
const transactionRouter = Router();
import auth from "../middleware/authMiddleware.js";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";

transactionRouter.get("/", auth, getTransactions);
transactionRouter.post("/", auth, addTransaction);
transactionRouter.put("/:id", auth, updateTransaction);
transactionRouter.delete("/:id", auth, deleteTransaction);

export default transactionRouter;
