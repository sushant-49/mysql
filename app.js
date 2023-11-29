const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');
var cors = require('cors');
const app = express();

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views','views');

/*const corsOptions = {
    origin: 'http://localhost:3000', // replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };*/
  
  app.use(cors());
  
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.post('/user/add-user',async (req,res,next)=>{
    console.log('Request Body:', req.body);
    try{
        if(!req.body.number){
            throw new Error('Phone number is mandatory!');
        };
    const name = req.body.name;
    const email = req.body.email;
    const phonenumber = req.body.number;
    const data = await User.create({name:name,email:email,phonenumber:phonenumber});
    res.status(201).json({newUserDetail:data});
}
catch(err){
    console.log(JSON.stringify(err));
    res.status(500).json({
        error:err.message
        })
    
    }});
    app.get('/user/get-users', async (req, res, next) => {
        try {
          const users = await User.findAll();
          res.status(200).json({ allUsers: users });
        } catch (error) {
          // Log the error to the console
          console.error(error);
      
          // Send a generic error response to the client
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      
app.use(errorController.get404);

sequelize.sync().then(result=>{
    //console.log(result);
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
})
.catch(err=>{console.log(err)});
