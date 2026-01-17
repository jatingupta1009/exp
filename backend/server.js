const express= require('express');
const cors= require('cors');
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const authRoutes= require('./routes/authRoutes');
const incomeRoutes= require('./routes/incomeRoutes');
const expenseRoutes= require('./routes/expenseRoutes');
const dashboardRoutes= require('./routes/dashboardRoutes')
const app= express();

app.use(cors({
    origin:"*"
}));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();

app.use('/api/v1/auth', authRoutes);    
app.use('/api/v1/income', incomeRoutes);    
app.use('/api/v1/expense', expenseRoutes); 
app.use('/api/v1/dashboard', dashboardRoutes); 

const PORT= process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`running on ${PORT}`);
})