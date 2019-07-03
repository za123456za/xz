//引入express模块
const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.注册路由
router.post('/reg',function(req,res){
	//1.1获取post请求数据
	var obj=req.body;
	console.log(obj);
	//1.2验证每一项是否为空  如果为空停止后面代码，弹出提示错误信息
	if(obj.uname===''){
		res.send({code:401,msg:'uname required'});
		//结束函数执行
		return;
	}
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if(!obj.phone){
		res.send({code:403,msg:'phone required'});
		return;
	}
	if(!obj.email){
		res.send({code:404,msg:'email required'});
		return;
	}
	//1.3执行SQL语句
	pool.query('insert into xz_user set ?',[obj],function(err,result){
		if(err) throw err;
		//console.log(result);
		//如果插入成功
		if(result.affectedRows>0){
			res.send({code:200,msg:'reg suc'});
		}
	});
});
//--------------------------------------------------------------------------------------------------------------

//2.登录路由
router.post('/login',function(req,res){
	//2.1获取数据
	var obj=req.body;
	console.log(obj);
	//2.2验证数据是否为空
	if(!obj.uname){
		res.send({code:401,msg:'uname required'});
		return;
	};
	if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		return;
	};
	//2.3执行SQL语句
	//查询是否有用户名和密码同时使用的数据
	pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],function(err,result){
		if(err) throw err;
		console.log(result);
		//判断登录成功还是失败
		if(result.length>0){//有元素 成功
			res.send({code:200,msg:'login suc'});
		}else{//没有元素，失败
			res.send({code:201,msg:'uname or upwd error'});
		}
	});
});

//--------------------------------------------------------------------------------------------------------------
//3.检索用户路由
router.get('/detail',function(req,res){
	//3.1获取数据
	var obj=req.query;
	console.log(obj);
	//3.2验证数据是否为空
	if(obj.uid===''){
		res.send({code:401,msg:'did required'});
		return;
	}
	//3.3执行SQL语句
		pool.query('select * from xz_user where uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});

//-------------------------------------------------------------------------------------------------------------
//4.修改用户路由
router.post('/update',function(req,res){
	//4.1获取数据
	var obj=req.body;
	//console.log(obj);
	//4.2验证是否为空
	//遍历对象，依次访问每个属性
	var i=400;
	for(var key in obj){
		i++;
		//console.log(key,obj[key]);
		//如果属性值为空，提示属性名必须
		if(!obj[key]){
			res.send({code:i,msg:key+' required'});
			return;
		}
	}
	//4.3执行SQL语句
	//取出用户编号
	var uid=obj.uid;
	//删除对象中的编号属性
	delete obj.uid;
	console.log(obj);
		pool.query('update xz_user set ? where uid=?',[obj,uid],function(err,result){
		if(err) throw err;
		//判断是否修改成功
		if(result.affectedRows>0){
			res.send({code:200,msg:'update suc'});
		}else{
			res.send({code:201,msg:'update error'});
		}
	});
});

//-------------------------------------------------------------------------------------------------------------
//5.用户列表路由
router.get('/list',function(req,res){
	//5.1获取数据
	var obj=req.query;
	console.log(obj);
	//5.2验证是否为空，设置默认值
	var count=obj.count;
	var pno=obj.pno;
	if(count===''){
		count=2;
	}
	if(pno===''){
		pno=1;
	}
	//5.3转整型
	count=parseInt(count);
	pno=parseInt(pno);
	//5.4计算开始
	var start=(pno-1)*count;
	//5.5执行SQL语句
	pool.query('select * from xz_user limit ?,?',[start,count],function(err,result){
		if(err) throw err;
		res.send(result);
	});
});

 //6.用户删除路由
//
router.get('/delete',function(req,res){
	//6.1获取数据
	var obj=req.query;
	console.log(obj);
	//6.2判断是否为空
	if(obj.uid===''){
		res.send({code:401,msg:'uid required'});
		return;
	}
	//6.3执行SQL语句
	pool.query('delete from xz_user where uid=?',[obj.uid],function(err,result){
		 if(err) throw err;
		 //console.log(result)
		 if(result.affectedRows>0){
			res.send({code:200,msg:'del suc'});
		 }else{
			res.send({code:201,msg:'del err'});
		 }
	});
});



































//导出路由器对象
module.exports=router;