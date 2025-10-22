const Income = require('../models/Income');
const xlsx = require('xlsx');

exports.addIncome = async (req, res) => {
    try 
    {
        const { amount, source, date } = req.body;  
        if (!amount || !source) 
        {
            return res.status(400).json({ message: 'Amount and source are required' });
        }

        const userId = req.user.id;

        const newIncome = new Income({  
            userId,
            amount,
            source,
            date
        });

        await newIncome.save();
        res.status(201).json({ message: 'Income added successfully', income: newIncome });
    }   
    catch (error)
    {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getAllIncome = async (req, res) => {
    try 
    {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ date: -1 });  
        res.status(200).json({ incomes });
    }
    catch (error)
    {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.deleteIncome = async (req, res) => {
    try 
    {
        const incomeId = req.params.id;
        await Income.findByIdAndDelete(incomeId);
        res.status(200).json({ message: 'Income deleted successfully' });
    }
    catch (error)
    {
        console.error('Error deleting income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.downloadIncomeExcel = async (req, res) => {
    try
    {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        const data= incomes.map(item=> ({
            Amount: item.amount,
            Source: item.source,
            Date: item.date.toISOString().split('T')[0],  
        }));

        const wb= xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Incomes');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
    }
    catch(error)
    {
        console.error('Error downloading income Excel:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


