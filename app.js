//引入express模块
const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');
//引入uesr路由器模块
const userRouter=require('./routes/user.js');
//引入goods路由器模块
const goodsRouter=require('./routes/goods.js');
//引入shopping路由器模块
const shoppingRouter=require('./routes/shopping.js');
//创建web服务器
var app=express();
//监听端口
app.listen(8080);
//把静态资源托管到public目录下里
app.use(express.static('public'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
	extended:false
}));
//使用路由器，挂载到/user下
// /user/reg
app.use('/user',userRouter);
//使用路由器，挂载到/goods下
//goods/reg
app.use('/goods',goodsRouter);
//使用路由器，挂载到/shopping下
//shopping/add
app.use('/shopping',shoppingRouter);


const express=require('express');
const bodyParser=require('body-parser');
var app=express();
app.listen(8080);
app.use(express.static('public'));
app.use(bodyParser.urlencoded:({
	extended:false
}));
app.use('/user',userRouter);
app.use('/goods',goodsRouter);
app.use('/shopping',shoppingRouter);