const express = require('express');
const path = require('path');

const app = express();

// EJS template engine configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));


const nasaRouter = require('./routes/nasa');  
app.use('/nasa', nasaRouter); 


app.get('/', (req, res) => {
  res.redirect('/nasa/images')
});


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
