const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
let order_id_variable
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_ReCaubQes2wc2P',
    key_secret: 'd9lVeqcI0K6bC93G415r5nyv',
  });



app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("razorpay");

})

app.post('/order',(req, res)=>{
    let options = {
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1"              // this is is the unidue id with every transaction.
        
      };

    razorpay.orders.create(options,(err, order)=>{
        order_id_variable = order.id;
        console.log(order);
        res.json(order);
    })
})

app.post('/verify_payment', (req, res) => {
    
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
        console.log(paymentDocument);
        if(paymentDocument.status === 'captured'){
            // res.send("payment done")
            res.status(200).json({status : 1, message : "transaction successful"});
        }else{
            // res.redirect("/");
            res.status(200).json({status : 0, message : "transaction rejected"});
        }
    })

})

app.listen(port,(req,res)=>{
    console.log('connection done')
})