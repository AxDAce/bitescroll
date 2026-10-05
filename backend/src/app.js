const express=require('express');
const cookieParser=require('cookie-parser')
const app=express();
const cors=require('cors');

const authRoute=require('./routes/auth.route')
const foodRoute=require('./routes/food.route')
const foodPartnerRoute=require('./routes/foodPartner.route')

app.use(cors({
    origin: 'http://localhost:5173', // Your exact frontend URL
    credentials: true // Allows the secure cookies to pass through
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/food',foodRoute);
app.use('/api/foodPartner',foodPartnerRoute);

module.exports=app;