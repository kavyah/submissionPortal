const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
const Schema = mongoose.Schema; 

/*
let validLinkChecker = (link) => {
    if (!link) {
        return false; 
    } else {
        // Regular expression to test for a valid e-mail
        const regExp = new RegExp('/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/');
        return regExp.test(link); // Return regular expression test results (true or false)
    }
};*/


const linkValidators = [

    {

        message: 'Must be a valid link'
    }
];


const submissionSchema = new Schema({
    link: { type: String, required: true, unique: true, lowercase: true},
    references: { type: String },
    comments:{ type: String },
    createdAt:{ type: Date, default: Date.now() },
    createdBy:{ type: String}
});

module.exports = mongoose.model('Submission', submissionSchema);