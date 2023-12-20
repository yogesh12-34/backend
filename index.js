const express = require(`express`);
const server= express();
const mongoose= require(`mongoose`);
const crypto = require(`crypto`);
 require(`dotenv`).config()

const session = require('express-session');

const  passport = require('passport');

const LocalStrategy= require(`passport-local`).Strategy;
const  JwtStrategy = require('passport-jwt').Strategy
const   ExtractJwt = require('passport-jwt').ExtractJwt
const cookieParser=require(`cookie-parser`);
const jwt = require('jsonwebtoken');


const productsRouter=require(`./routes/Product`)
const brandsRouter= require(`./routes/Brand`)
const categoriesRouter= require(`./routes/Category`)
const usersRouter =require(`./routes/Users`)
const authRouter= require(`./routes/Auth`)
const cartRouter= require(`./routes/Cart`)
const ordersRouter= require(`./routes/Order`)
const{User}=require(`./model/User`)
const {isAuth,sanitizeUser,cookieExtractor}= require(`./services/common`)
const path =require(`path`)

 //webhook
 const endpointSecret = process.env.ENDPOINT_SECRET;

 server.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
   const sig = request.headers['stripe-signature'];
 
   let event;
 
   try {
     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
   } catch (err) {
     response.status(400).send(`Webhook Error: ${err.message}`);
     return;
   }
 
   // Handle the event
   switch (event.type) {
     case 'payment_intent.succeeded':
       const paymentIntentSucceeded = event.data.object;
       const order=await Order.findById(paymentIntentSucceeded.metadata.orderId)
       order.paymentStatus=`recieved`
       await order.save()
       // Then define and call a function to handle the event payment_intent.succeeded
       break;
     // ... handle other event types
     default:
       console.log(`Unhandled event type ${event.type}`);
   }
 
   // Return a 200 response to acknowledge receipt of the event
   response.send();
 });


// ...
const  opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey =process.env.JWT_SECRET_KEY;

const cors = require(`cors`);
const { Order } = require('./model/Order');
server.use(express.static(path.resolve(__dirname,`build`)))

server.use(cookieParser()); 
server.use(cors({
    exposedHeaders:[`X-Total-Count`]
}))
server.use(session({
    secret: process.env.SESSION_KEY,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored

  }));
  server.use(passport.authenticate('session'));

server.use(express.json())

server.use(`/cart`,isAuth(),cartRouter.router)
server.use(`/products`,isAuth(),productsRouter.router)
server.use(`/brands`,isAuth(),brandsRouter.router)
server.use(`/categories`,isAuth(),categoriesRouter.router)
server.use(`/users`,isAuth(),usersRouter.router)
server.use(`/auth`,authRouter.router)
server.use(`/orders`,isAuth(),ordersRouter.router)
server.get(`*`,(req,res)=>res.sendFile(path.resolve(`build`,`index.html`)))

passport.use(`local`,new LocalStrategy(
  {usernameField:`email`},
    async function(email, password, done) {
     
     
        try{
            const user= await User.findOne({email:email})
            console.log(email,password,done)
            if(!user){
              done(null,false,{message:`invalid credential`})
              
          }
            crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
             if(!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null,false,{message:`invalid credential`})
                
            }  const  token = jwt.sign(sanitizeUser(user) ,process.env.JWT_SECRET_KEY);
             done(null ,{id:user.id,role:user.role,token})
            })
            
          
        }catch(err){
            done(err)
    
        }
    })
)

passport.use(`jwt`,new JwtStrategy(opts, async function(jwt_payload, done) {
  try{
    const user =await User.findById(jwt_payload.id)
    if (user) {
      return done(null, sanitizeUser(user));
  }else {
    return done(null, false);
  }
  }   catch(err){
    return done(err,false)
  }
 
    
  })
);
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null ,{id:user.id,role:user.role});
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  // This is a public sample test API key.
  // Don’t submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);
  
  server.use(express.static("public"));
  server.use(express.json());
  
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  
  server.post("/create-payment-intent", async (req, res) => {
    const { calculateOrderAmount,orderId} = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      metadata:{
        orderId
      }
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
 
  
 

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`database connected`)
}






server.listen(process.env.PORT,()=>{
    console.log(`server started`)
})