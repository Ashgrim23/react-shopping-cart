const express=require('express')
const bodyParser=require('body-parser')
const mongoose = require('mongoose')
const shortid=require('shortid')
const dotenv =require('dotenv')


dotenv.config()

const app = express();
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
},(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log('Conectado a mongodb')
    }
})



const Product=mongoose.model("products",new mongoose.Schema({
    _id: {type:String, default:shortid.generate},
    title:{type:String},
    image:{type:String},
    description:{type:String},
    price:{type:Number},
    availableSizes:[String]
    
}))

app.get("/api/products",async (req,res)=>{
    const products=await Product.find({})
    res.send(products)
})

app.post('/api/products',async(req,res)=>{
    try {
        const newProduct=new Product(req.body)
        const savedProduct=await newProduct.save()
        res.send(savedProduct)    
    } catch (error) {
        console.log(error)
    }
    
})

app.delete('/api/products/:id',async(req,res)=>{
    const deletedProduct=await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})



const Order = mongoose.model("order",new mongoose.Schema({
    _id:{type:String,default:shortid.generate},
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        price:Number,
        count:Number
    }]
},{timestamps:true}))

app.post('/api/orders',async(req,res)=>{
    if(!req.body.name||!req.body.email||!req.body.address||!req.body.cartItems||!req.body.total) {
        return req.send({message:"Data is required."})
    }
    const order=await new Order(req.body).save()
    res.send(order)
})

app.get('/api/orders',async(req,res)=>{
    const orders=await Order.find({})    
    res.send(orders)
})

app.delete('/api/orders/:id',async(req,res)=>{
    const order=await Order.findById(req.params.id)
    req.send(order)
})

const port = process.env.PORT || 5000;
app.listen(port,(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(`puerto ${port}` )
    }
})

