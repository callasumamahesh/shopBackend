const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const Users = require('./models/model1')
const NewProduct = require('./models/AddProduct.js')
const AddToCart = require('./models/AddtoCart.js')
const app = express()
const mongoose = require('mongoose')
app.use(cors())
dotenv.config()
app.use(express.urlencoded({limit : '50mb','extended' : 'true'}))
app.use(bodyParser.json({limit : '50mb'}))

mongoose.connect(process.env.Mongo_uri)
.then(() => console.log('Database Connected'))
.catch((err) => console.log(err))


app.post('/signup',async (req,res) => {
    console.log(req.body,'Reqbody')
    const {email, password, Name} = req.body;
    const user = await Users.findOne({email})
    if(user){
        res.send('User Alredy Exist')
    }
    else{
        const data = new Users({email,password,Name})
        await data.save()
        res.send('User Created')
    }
})

app.get('/login', async (req, res) => {
    console.log(req.body)
    const {email, password} = req.query;
    try {
        const existUser = await Users.findOne({email})
        if(email === existUser.email){
            if(password === existUser.password){
                res.send('User Exict')
            }
            else{
                res.send('Password Mismatch')
            }
        }
    } catch (error) {
        res.send('User not exist')
    }
})

app.post('/addproduct',async (req, res) => {
    const {ProductTitle,ProductDescription,ProductPrice,ProductDiscount,ProductCategory,ProductImage} = req.body;
    try {
        let AddingNewProduct = new NewProduct({ProductTitle,ProductDescription,ProductPrice,ProductDiscount,ProductCategory,ProductImage})
        await AddingNewProduct.save()
        res.status(200).json({message : 'Product Added'});
    } catch (error) {
        console.log(error);
    }
})

app.post('/addtocart',async (req, res) => {
    const {imagefordatabase,title,price,description,Uniqueid} = req.body;
    try{
        AddaProductToCart = new AddToCart({imagefordatabase,title,price,description,Uniqueid})
        await AddaProductToCart.save()
        res.status(200).json({message : 'Added To Cart'})
    }
    catch(err){
        console.log(err);
    }

})

app.get('/cartproducts', async (req, res) => {
    try {
        const products = await AddToCart.find({});
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getproductsfromdb',async (req,res) => {
    try {
        const data = await NewProduct.find({});
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
})

app.delete('/deletefromcart/:id',async(req,res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const data = await AddToCart.findByIdAndDelete(id);
        if(!data){
            return res.status(404).json({message : "Item not Found"})
        }
        res.status(200).json({message : 'Item Deleted'})
        
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000,() => console.log('Server is Listening'))