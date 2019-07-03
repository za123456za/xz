//引入express模块
const express=require('express');
//引入pool模块（连接池）
const pool=require('../pool.js');
//创建路由器对象
const router=express.Router();
//添加商品列表路由
router.get('/list',function(req,res){
	//获取请求
	var obj=req.query;
	console.log(obj);
	//判断是否为空
	var count=obj.count;
	var pno=obj.pno;
	if(count===''){
		count=2;
	}
	if(pno===''){
		pno=1;
	}
	//转整型
	count=parseInt(count);
	pno=parseInt(pno);
	var start=(pno-1)*count;
	//SQl执行语句
	pool.query('select * from xz_laptop limit ?,?',[start,count],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});
//---------------------------------------------------------------------------------
//添加锁检商品路由
router.get('/details',function(req,res){
	//获取数据
	var obj=req.query;
	console.log(obj);
	//判断是否为空
	if(obj.lid===''){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//执行SQL语句
  pool.query('select * from xz_laptop where lid=?',[obj.lid],function(err,result){
	if(err) throw err;
	res.send(result);
	});
});

//-------------------------------------------------------------------------------------
//添加，添加商品路由
router.post('/add',function(req,res){
	//获取数据
	var obj=req.body;
	console.log(obj);
	//判断是否为空
	if(obj.lid===''){
		res.send({code:401,msg:'lid required'});
		return;
	}
	if(obj.lname===''){
		res.send({code:402,msg:'lname required'});
		return;
	}
	if(obj.price===''){
		res.send({code:403,msg:'price required'});
		return;
	}
	if(obj.title===''){
		res.send({code:404,msg:'title required'});
		return;
	}
	//执行SQL语句
	pool.query('insert into xz_laptop set ?',[obj],function(err,result){
		if(err) throw err;
		//console.log(result);
		//判断如果affectedRows》0就代表成功，则弹出SUc成功字样
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
		}
	});
});

//-------------------------------------------------------------------------------------------------------
//添加修改商品路由  xxx
router.post('/update',function(req,res){
	//获取数据
	var obj=req.body;
	console.log(obj);
	//判断是否为空
	var i=400;
	for(var key in obj){
		i++;
		if(!obj[key]){
			res.send({code:i,msg:key+'required'});
			return;
		}
	}
	var iid=obj.iid;
	delete obj.iid;
	console.log(obj);
	//执行SQL语句
	pool.query('update xz_laptop set ? where lid=?',[obj,iid],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:201,msg:'upadae err'});
		}
	});
});

//---------------------------------------------------------------------------------
//添加删除商品路由
router.get('/delete',function(req,res){
	//获取数据
	var obj=req.query;
	console.log(obj);
	//判断是否为空
	if(obj.lid===''){
		res.send({code:401,msg:'lid required'});
		return;
	}
	//执行SQL语句
	pool.query('delete from xz_laptop where lid=?',[obj.lid],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'});
		}else{
			res.send({code:201,msg:'delete err'});
		}
	});
});

//导出路由器
module.exports=router;