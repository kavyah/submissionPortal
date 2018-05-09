const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema; 
const bcrypt = require('bcrypt-nodejs'); 




let validEmailChecker = (email) => {

    if (!email) {
        return false; 
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);     }
};


const emailValidators = [
    
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];




let validPassword = (password) => {

    if (!password) {
        return false;
    } else {
       
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password); 
    }
};


const passwordValidators = [

    {
        validator: validPassword,
        message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
];

// User Model Definition
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err); // Ensure no errors
        this.password = hash; // Apply encryption to password
        next(); // Exit middleware
    });
});


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password); };


module.exports = mongoose.model('User', userSchema);