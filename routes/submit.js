const User = require('../models/user');
const Submission = require('../models/submissions');
const jwt = require('jsonwebtoken'); 
const config = require('../config/database'); 

module.exports = (router) => {

    router.post('/submission', (req, res) => {

        if (!req.body.link) {
            res.json({ success: false, message: 'You must provide a link to your files' }); // Return error
        } else {
            if (!req.body.createdBy) {
                res.json({ success: false, message: 'Assignment Creator Required' }); // Return error
            }
            else {
                let submission = new Submission({
                    link: req.body.link,
                    references: req.body.references,
                    comments: req.body.comments,
                    createdBy: req.body.createdBy
                });

                submission.save((err) => {
                    // Check if error occured
                    if (err) {
                        // Check if error is an error indicating duplicate account
                        if (err.code === 11000) {
                            res.json({ success: false, message: 'Submission already exists' }); // Return error
                        } else {
                            // Check if error is a validation rror
                            res.json({ success: false, message: 'Could not submit assigment. Error: ', err }); // Return error if not related to validation

                        }
                    }
                    else {
                        res.json({ success: true, message: 'Assignment Submitted . Please Logout.' }); // Return success
                    }
                });
            }
        }
    });

    router.get('/allSubmissions', (req, res) => {
        // Search database for all blog posts
        Submission.find({}, (err, submission) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err }); // Return error message
            } else {
                // Check if blogs were found in database
                if (!submission) {
                    res.json({ success: false, message: 'No submissions found.' }); // Return error of no blogs found
                } else {
                    res.json({ success: true, submissions:submission  }); // Return success and blogs array
                }
            }
        }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
    });

    return router;
};

