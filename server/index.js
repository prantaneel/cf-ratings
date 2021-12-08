const express = require('express');
const axios = require('axios');
const app = express();
async function getRatings(handle)
{
    let api_add = `https://codeforces.com/api/user.rating?handle=${handle}`;
    let ret = {result_arr: [] ,error: 0, last_rating: 0};
    await axios.get(api_add)
        .then(response =>{
            ret.result_arr = response.data.result;
            let leng = ret.result_arr.length;
            ret.last_rating = ret.result_arr[leng-1].newRating;
        })
        .catch(err =>{
            ret.error = 1;
            //console.log(err)
        })
        return ret;
}
function findTitle(rt){
    if(rt<=1199) return {title: "Newbie", color: "gray"};
    else if(rt<=1399) return {title: "Pupil", color: "green"};
    else if(rt<=1599) return {title: "Specialist", color: "cyan"};
    else if(rt<=1899) return {title: "Expert", color: "blue"}
    else if(rt<=2199) return {title: "Candidate Master", color: "violet"}
    else if(rt<=2299) return {title: "Master", color: "orange"};
    else if(rt<=2399) return {title: "International Master", color: "orange"};
    else if(rt<=1599) return {title: "Grandmaster", color: "red"}
    else if(rt<=2899) return {title: "International Grandmaster", color: "red"}
    else return {title: "Legendary Grandmaster!", color: "red"}
}
app.get('/',async (req, res) => {
    const handle = "soulado";
    let data_file = await getRatings(handle);
    let title = findTitle(data_file.last_rating);
    if(data_file.error){
        res.send('Error! Try again in a bit.');
    }
    else{
        res.send(`${data_file.last_rating} ${title.title}`);
    }
})
app.listen(3000, ()=>{
    console.log('Started')
})