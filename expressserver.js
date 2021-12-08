const express = require("express");
const bodyParser = require("body-parser"); 
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	const a = req.params;
	console.log(a);
	res.status(200);
    res.type('application/json');
});

app.post("/",function(req, res, err){
	let value;
	try
	{
		const a = req.body;
		if(a.operation==='add'){

			value = a.arguments[0] + a.arguments[1];
		}
		else if(a.operation==='subtract'){

			value = a.arguments[0] - a.arguments[1];
		}
		else if(a.operation==='multiply'){

			value = a.arguments[0] * a.arguments[1];
		}
		else if(a.operation==='divide'){

			value = a.arguments[0] / a.arguments[1];
			if(a.arguments[1]==="0")
			{
				throw err;
			}
		}
		console.log(value);
	}
	catch(err)
	{
		res.status(500);
		res.send("Denominator cant be zero");
		return;
	}
	res.json({"result": value});
});

app.get("/add/:v1/:v2",function(req, res){
	let val1 = Number(req.params.v1);
	let val2 = Number(req.params.v2);
	let result = val1 + val2;
	res.status(200);
	res.type("text/plain");
	res.json(result);	
});

app.get("/subtract/:v1/:v2",function(req, res){
	let val1 = Number(req.params.v1);
	let val2 = Number(req.params.v2);
	let result = val1 - val2;
	res.json(result);
});

app.get("/multiply/:v1/:v2",function(req, res){
	let val1 = Number(req.params.v1);
	let val2 = Number(req.params.v2);
	let result = val1 * val2;
	res.json(result);
});

app.get("/divide/:v1/:v2",function(req, res){
	let val1 = Number(req.params.v1);
	let val2 = Number(req.params.v2);
	let result = val1 / val2;
	res.json(result);
});

app.get("*",(req, res)=>{
	res.status(404).json('Route not found');
});


app.listen(3000,function(req, res){
	console.log("server started")
});
