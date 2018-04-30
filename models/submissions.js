const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose





// User Model Definition
const submissionSchema = new Schema({
    link: { type: String, required: true, unique: true, lowercase: true },
    references: { type: String },
    comments:{ type: String },
    createdAt:{ type: Date, default: Date.now() },
    createdBy:{ type: String}
});

// Export Module/Schema
module.exports = mongoose.model('Submission', submissionSchema);