const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const userSchema= mongoose.Schema(   
    {
        username:
        {   
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true    
        },
        password:
        {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

//match password
userSchema.methods.matchPassword= async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
}   

//hash password
userSchema.pre('save', async function(next)
    {
        if(!this.isModified('password'))
        {
            next();
        }
        this.password= await bcrypt.hash(this.password, 10);
        next();
    }
);

const User= mongoose.model('User', userSchema);
module.exports= User;