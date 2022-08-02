const express=require('express');
const app=express();
const port=process.env.PORT||8000;

const db=require('./config/mongoose');

const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(passport.initialize());

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('error in running',err)
        return;
    }
    console.log('app runnin gon port:',port);
})
