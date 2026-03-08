import { useState } from "react";
import Navbar from "../components/Navbar";
import { searchApi } from "../api/apiservice";
import Tile from "../components/Tile";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (searchQuery) => {
    console.log("handlesearch search for:", searchQuery);

    searchApi(searchQuery)
      .then((response) => {
        console.log("searchapi response status :", response.status);
        console.log("response data :", response.data);
        setSearchResult(response.data.items);
        console.log("response data items :", response.data.items);
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-l-12 d-flex flex-wrap justify-content-center gap-4">
            {searchResult.map((resultItem) => {
              return (
                <>
                  <Link to={`/video/${resultItem.id.videoId}`} className="text-decoration-none"
                  >
                    <Tile
                      key={resultItem.etag}
                      src={resultItem.snippet.thumbnails.high.url}
                      title={resultItem.snippet.title}
                      channelTitle={resultItem.snippet.channelTitle}
                      publishedAt={resultItem.snippet.publishedAt}
                      publishTime={resultItem.snippet.publishTime}
                    />
                  </Link>
                </>
              ); 
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
