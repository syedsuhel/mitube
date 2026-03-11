import axios from "axios";

const baseApi = "https://www.googleapis.com/youtube/v3";

const apiKey = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

// console.log("API KEY IS:", apiKey);

export const searchApi = (searchStr, pageToken = "") => {
  console.log("searchApi called with searchStr :", searchStr);
  const params = {
    part: "snippet",
    q: searchStr,
    key: apiKey,
    maxResults: 40,
    type: "video",
  };
  if (pageToken) {
    params.pageToken = pageToken;
  }
  return axios.get(`${baseApi}/search`, { params });
  // return axios.get(`${baseApi}/search?part=snippet&q=${searchStr}&key=${apiKey}&maxResults=40&type=video`);
};

// before search random videos api call
export const searchApiRandom =(category, maxResults=40, pageToken="")=>{
    const params ={
        part:"snippet",
        q:category,
        key:apiKey,
        maxResults:maxResults,
        type:"video",
        order:"relevance"
    }
    if(pageToken){
        params.pageToken=pageToken;
    }
    return axios.get(`${baseApi}/search`, {params});
}
// export const searchApi=(searchStr)=>{
//     return axios.get(`${baseApi}/search?part=snippet&q=${searchStr}&key=${import.meta.env.VITE_YOUTUBE_DATA_API_KEY}`);

// };
