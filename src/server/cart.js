var express = require("express") //导入express框架
var bodyParser = require("body-parser") //http请求参数解析
var app = express();
var mysql = require("mysql") //导入mysql
//配置数据库链接
var connection = mysql.createConnection({
    host     : "localhost", //地址
    user     : "root", //用户名
    password : "123456", //密码
    database : "cart"  //数据库名字
})
connection.connect(); //链接

//配置解析参数（http）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
//配置静态资源
/* app.use(express.static(__dirname+'/public')); */
/* var allowCrossDomain = function (req, res, next) {
    debugger
    res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
};
 
 app.use(allowCrossDomain);//运用跨域的中间件 */
//设置sql语句
var sql = "select * from cart";
var data; //初始化拿到的值
//查询
connection.query(sql,function(err,res){
    if(err){
        console.log("[SELECT ERROR] - ",err.message)
        return;
    }
    data = res;
})
connection.end();

app.get("/getdata",function(req,res){
    console.log(req.query);
    res.send(data)
})
/* app.get('/del',(req,resp) => {
    let {goodsId} = req.query;
    op('delete from cart where goodsId = ?',[goodsId],exports.conn,(rs,count) => {
        resp.end(`{"ret":${count}}`);
    })
}); */
app.listen(8080,function(){
    console.log("服务器已启动，监听端口8080")
})
