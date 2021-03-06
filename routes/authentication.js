const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 
const config = require('../config/database');

module.exports = (router) => {

    router.post('/register', (req, res) => {
        // Check if email was provided
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
            }  else {
                // Check if password was provided
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' }); // Return error
                } else {
                    // Create new user object and apply user input
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        password: req.body.password
                    });
                    // Save user to database
                    user.save((err) => {
                        // Check if error occured
                        if (err) {
                            // Check if error is an error indicating duplicate account
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'E-mail already exists' }); // Return error
                            } else {
                                // Check if error is a validation rror
                                if (err.errors) {
                                    // Check if validation error is in the email field
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message }); // Return error
                                    } else {
                                      
                                            // Check if validation error is in the password field
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message }); // Return error
                                            } else {
                                                res.json({ success: false, message: err }); // Return any other error not already covered
                                            }
                                        }
                                    
                                } else {
                                    res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Account registered!' }); // Return success
                        }
                    });
                }
            }
        
    });
    router.get('/checkEmail/:email', (req, res) => {
        // Check if email was provided in paramaters
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' }); // Return error
        } else {
            // Search for user's e-mail in database;
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err }); // Return connection error
                } else {
                    // Check if user's e-mail is taken
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
                    } else {
                        res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
                    }
                }
            });
        }
    });
    router.post('/login', (req, res) => {
        
        if (!req.body.email) {
            res.json({ success: false, message: 'No email was provided' }); // Return error
        } else {
                   if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided.' }); // Return error
            } else {
                        User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
                    // Check if error was found
                    if (err) {
                        res.json({ success: false, message: err }); // Return error
                    } else {
                              if (!user) {
                            res.json({ success: false, message: 'Email not found.' }); // Return error
                        } else {
                            const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                                 if (!validPassword) {
                                res.json({ success: false, message: 'Password invalid' }); // Return error
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                                res.json({ success: true, message: 'Success!', token: token, user: { email: user.email } }); // Return success and token to frontend
                            }
                        }
                    }
                });
            }
        }
    });
    
   router.use((req, res, next) => {
        const token = req.headers['authorization']; // Create token found in headers
        // Check if token was found in headers
        if (!token) {
            res.json({ success: false, message: 'No token provided' }); // Return error
        } else {
            // Verify the token is valid
            jwt.verify(token, config.secret, (err, decoded) => {
                // Check if error is expired or invalid
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    });
    
    router.get('/profile', (req, res) => {
        
        User.findOne({ _id: req.decoded.userId }).select('email').exec((err, user) => {
            
            if (err) {
                res.json({ success: false, message: err }); // Return error
            } else {
                if (!user) {
                    res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
                }
            }
        });
    });


   

    return router; 
}