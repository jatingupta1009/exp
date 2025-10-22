const Expense = require('../models/Expense'); 
const xlsx = require('xlsx');

exports.addExpense = async (req, res) => {
    try 
    {
        const { amount, category, date } = req.body;  
        if (!amount || !category) 
        {
            return res.status(400).json({ message: 'Amount and category are required' });
        }

        const userId = req.user.id;

        const newExpense = new Expense({  
            userId,
            amount,
            category,
            date
        });

        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    }   
    catch (error)
    {
        console.error('Error adding Expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllExpense = async (req, res) => {
    try 
    {
        const userId = req.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); 
        res.status(200).json({ expenses });
    }   
    catch (error)
    {
        console.error('Error fetching Expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteExpense = async (req, res) => {
    try 
    {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: 'Expense deleted successfully' });
    }   
    catch (error)           
    {
        console.error('Error deleting Expense:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}   

exports.downloadExpenseExcel = async (req, res) => {
    try 
    {
        const userId = req.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); 

        const data = expenses.map(item => ({
            Amount: item.amount,
            Category: item.category,
            Date: item.date.toISOString().split('T')[0]
        }));

        const wb= xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    }       
    catch (error)
    {
        console.error('Error downloading Expense Excel:', error);
        res.status(500).json({ message: 'Server error' });
    }
}