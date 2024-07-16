require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
// Create an Express application
const app = express();


// Define a port to listen on
const port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

require(`./${process.env.VERSION}/config/passport`)(passport);

// console.log(10,process.env.DB)
mongoose.connect(process.env.DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => 
    {
        console.log('MongoDB connected...')
        // Imported all database models
        require(`./${process.env.VERSION}/models/User`);



        app.use(bodyParser.json());
        app.use(`/${process.env.VERSION}`, require(`./${process.env.VERSION}/routes`));
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    }
    
)
.catch(err => console.log(err));





