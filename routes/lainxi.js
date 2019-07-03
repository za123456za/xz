//添加express模块
const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
router.post('/add',function(req,res){
	//获取数据
	var obj=req.body;
	console.log(obj);
	//判断是否为空
	if(obj.uname===''){
		res.send({code:401,msg:'add required'});
		return;
	}
	if(obj.uid===''){
		res.send({code:402,msg:'add required'});
		return;
	}
	//执行SQL语句
	pool.use('insert into xz_laptop where ?',[obj],function(err,result){
		if(err) throw err;
		res.send(result);
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'});
		}else{
			res.send({code:201,msg:'add err'});
		}
	});
//--------------------------------------------------------------------------------------------------------------
router.get('/delete',function(req,res){
	 //获得数据
	 var obj=req.query;
	 console.log(obj);
	 //判断是否为空
	 if(obj.lid===''){
		res.cend({code:401,msg:'delete required'});
		return;
	 }
	 if(obj.lname===''){
		res.cend({code:402,msg:'delete required'});
		return;
	 }
	 if(obj.pirce===''){
		res.cend({code:403,msg:'delete required'});
	 }
	 return;
	 //执行SQl语句
	 pool.use('select * from xz_laptop where lid=?',[obj.lid],function(err,retult){
			if(err) throw err;
			res.send(result);
	 });
});

//----------------------------------------------------------------------------
router.post('/detele',function(req,res){
	var obj=req.lid;
	console.log(obj);
	if(obj.lid===''){
		res.send({code:401,msg:'detele required'});
		return;
	}
	if(obj.lname===''){
		res.send({code:402,msg:'detele suc'});
		return;
	}
	pool.query('select * from xz_laptop where lid=?',[obj],function(err,retult){
			if(err) throw err;
			res.send(retult);

	});
});










});