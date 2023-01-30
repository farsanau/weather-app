const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{

res.sendFile(__dirname + "/index.html");
});

app.post("/", (req,res)=>{
  const query =req.body.cityName;
  const apiKey = "470d24c80028e80db9c2d021a88a2d61";
  const units ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url,(response)=>{
      console.log(response.statusCode);

      response.on("data",(data)=>{
       const weatherData = JSON.parse(data)
       console.log(weatherData);
       const temp = weatherData.main.temp
       const weatherDiscription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

       res.write("<p>The weather is currently "+weatherDiscription+"</p>");
       res.write("<h1>The temperature in " +query+" is "+temp+" degree Celcius</h1>" );
       res.write("<img src="+imageUrl+">")
       res.send();
      })
    })
});





app.listen(port,()=>{
  console.log( `example app listening on ${port};` )
})
