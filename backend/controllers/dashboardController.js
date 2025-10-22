const mongoose = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
    console.log("req.userId:", req.userId);

  try 
  {
    const userId = new mongoose.Types.ObjectId(String(req.userId));

    // total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // income transactions in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId: userId,
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 60)) }
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    // expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userId,
      date: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) }
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    // recent 5 transactions 
    const recentIncomeTransactions = await Income.find({ userId: userId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpenseTransactions = await Expense.find({ userId: userId })
      .sort({ date: -1 })
      .limit(5);

    const recentTransactions = [...recentIncomeTransactions, ...recentExpenseTransactions]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.status(200).json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

      last30DaysExpenses: {
        transactions: last30DaysExpenseTransactions,
        total: expenseLast30Days,
      },

      last60DaysIncome: {
        transactions: last60DaysIncomeTransactions,
        total: incomeLast60Days,
      },

      recentTransactions,
    });
  } 
  catch (error) 
  {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
