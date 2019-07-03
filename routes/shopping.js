//引入模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//var 创建路由器对象
var router=express.Router();

//添加购物车 添加物品路由器
router.post('/add',function(req,res){
	//获取数据
	var obj=req.body;
	console.log(obj);
	//判断是否为空
	if(obj.iid===''){
		res.send({code:401,msg:'iid required'});
		return;
	}
	if(obj.product_id===''){
		res.send({code:402,msg:'product_id required'});
		return;
	}
	if(obj.count===''){
		res.send({code:403,msg:'count required'});
		return;
	}
	//执行SQL语句
	pool.query('insert into xz_shoppingcart_item set ?',[obj],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
		}else{
			res.send({code:201,msg:'add err'});
		}
	});
});

//-------------------------------------------------------------------------------------------------------------
//添加购物车索检路由
router.get('/check',function(req,res){
	//获取数据
	var obj=req.query;
	console.log(obj);
	//判断是否为空
	if(obj.iid===''){
		res.send({code:401,msg:'check required'});
		return;
	}
	//执行SQL语句
	pool.query('select * from xz_shoppingcart_item where iid=?',[obj.iid],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});


//导出路由器对象
module.exports=router;