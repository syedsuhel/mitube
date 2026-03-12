import axios from "axios";


const baseApi = "https://www.googleapis.com/youtube/v3";

const apiKey = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

// console.log("API KEY IS:", apiKey);



export const searchApi=(searchStr)=>{
    console.log("searchApi called with searchStr :",searchStr);
    
    return axios.get(`${baseApi}/search?part=snippet&q=${searchStr}&key=${apiKey}&type=video&maxResults=40`);
    
};
// export const searchApi=(searchStr)=>{
//     return axios.get(`${baseApi}/search?part=snippet&q=${searchStr}&key=${import.meta.env.VITE_YOUTUBE_DATA_API_KEY}`);
    
// };

