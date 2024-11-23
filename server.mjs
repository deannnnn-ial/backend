import express from 'express';
//for the .env file
//import 'dotenv/config';

const app = express();
const port = 4000;

//get the request 
app.get("/api", (req, res) => {
    //get the query for the api search
    let keyword = req.query.keyword;
    //fetch the data & use the process.env to get the hidden api key
fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + keyword + '&api-key=' + process.env.REACT_APP_NYT_API_KEY)
.then(response => {
    if(!response.ok){
        throw new Error("network response not ok");
    }
    return response.json();
})
.then(data => {
    console.log(data);
    //send back the data
    res.json(data);
    return({data});
})
.catch(error => {
     console.error(error);
})
})

//log that it's running properly
app.listen(port, () => console.log(`Server running on port ${port}`));
