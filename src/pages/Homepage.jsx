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
      <div className="container">
        <div className="row">
          <div className="offset-1 col-10">
            {searchResult.map((resultItem) => {
              return (
                <>
                  <Link to={`/video/${resultItem.id.videoId}`}>
                    <Tile
                      key={resultItem.etag}
                      src={resultItem.snippet.thumbnails.medium.url}
                      title={resultItem.snippet.title}
                      publishedAt={resultItem.snippet.publishedAt}
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
