import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
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
export default function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [lstrt, setLstrt] = useState(0);
  const [bgcolor, setBgcolor] = useState("white");
  const [apierror, setApierror] = useState(1);
  const [handle, setHandle] = useState("");
  const HANDLE = "soulado";
  const getData = async (HANDLE) => {
    const ret = await getRatings(HANDLE);
    const tit = findTitle(ret.last_rating);
    setData(ret);
    setTitle(tit.title);
    setBgcolor(tit.color);
    setApierror(ret.error);
    setLstrt(ret.last_rating);
  }
  useEffect(()=>{
    getData(HANDLE);
    if(apierror===1){
      setBgcolor("red");
      setTitle("Refresh!");
      setLstrt("ERROR");
    }
  }, [])
  return (
    <View style={[styles.container, {backgroundColor: `${bgcolor}`}]}>
      <Text style={styles.ratingStyle}>{lstrt}</Text>
      <Text style={styles.titleStyle}>{title}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingStyle: {
    fontSize: 90,
    color: "white",
    fontWeight: "bold",
  },
  titleStyle: {
    color: "white",
    fontSize: 20
  }
});
