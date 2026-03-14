import { useState } from "react";
import Navbar from "../components/Navbar";
import { searchApi } from "../api/apiservice";
import Tile from "../components/Tile";
import RandomSection from "../components/RandomSection";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = (searchQueryStr) => {
    console.log("handlesearch search for:", searchQueryStr);
    setHasSearched(true);
    setSearchQuery(searchQueryStr);
    setSearchResult([]);
    setNextPageToken(null);

    searchApi(searchQueryStr)
      .then((response) => {
        console.log("searchapi response status :", response.status);
        console.log("response data :", response.data);
        setSearchResult(response.data.items);
        setNextPageToken(response.data.nextPageToken);
        setHasMore(!!response.data.nextPageToken);
        setTotalResults(response.data.pageInfo?.totalResults || 0);
        console.log("response data items :", response.data.items);
      })
      .catch((e) => console.log(e));
  };

  const handleLoadMoreSearch = () => {
    if (!nextPageToken || loadingMore) return;

    setLoadingMore(true);
    searchApi(searchQuery, nextPageToken)
      .then((response) => {
        console.log("Load more results:", response.data.items);
        setSearchResult((prevResults) => [
          ...prevResults,
          ...response.data.items,
        ]);
        setNextPageToken(response.data.nextPageToken);
        setHasMore(!!response.data.nextPageToken);
        setLoadingMore(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingMore(false);
      });
  };

  // Trending categories to display
  const trendingCategories = [
    { id: "music", title: "🎵 Trending Music" },
    { id: "world news", title: "📰 World News" },
    { id: "latest technology", title: "💻 Latest Technology" },
    { id: "cricket", title: "🏏 Cricket Highlights" },
    { id: "gaming", title: "🎮 Gaming" },
  ];

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            {/* Show trending videos before search results */}
            {!hasSearched ? (
              <div>
                {trendingCategories.map((category) => (
                  <RandomSection
                    key={category.id}
                    category={category.id}
                    title={category.title}
                  />
                ))}
              </div>
            ) : null}

            {/* Show search results when user searches */}
            {hasSearched && searchResult.length > 0 ? (
              <div>
                <h4 className="fw-bold mb-4">
                  Search Results for "
                  <span className="text-danger">{searchQuery}</span>"
                  <span
                    className="text-muted ms-2"
                    style={{ fontSize: "0.8em" }}
                  >
                    ({totalResults.toLocaleString()} total)
                  </span>
                </h4>

                {/* Results Count Info */}
                <div className="alert alert-info mb-4">
                  Showing {searchResult.length} of{" "}
                  {totalResults.toLocaleString()} results
                </div>

                {/* Video Results */}
                {searchResult.map((resultItem) => {
                  return (
                    <Link
                      to={`/video/${resultItem.id.videoId}`}
                      key={resultItem.etag}
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="text-decoration-none"
                    >
                      <div className="mb-3 transition-card">
                        <Tile
                          src={resultItem.snippet.thumbnails.medium.url}
                          title={resultItem.snippet.title}
                          channelTitle={resultItem.snippet.channelTitle}
                          publishedAt={resultItem.snippet.publishedAt}
                        />
                      </div>
                    </Link>
                  );
                })}

                {/* Load More Button for Search Results */}
                {hasMore && (
                  <div className="text-center my-5">
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={handleLoadMoreSearch}
                      disabled={loadingMore}
                    >
                      {loadingMore ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-arrow-down me-2"></i>
                          Load More Results
                        </>
                      )}
                    </button>
                    <p className="text-muted mt-2 small">
                      You've viewed {searchResult.length} of{" "}
                      {totalResults.toLocaleString()} results found for "
                      {searchQuery}"
                    </p>
                  </div>
                )}

                {!hasMore && searchResult.length > 0 && (
                  <div className="alert alert-info text-center mt-4">
                    <i className="fas fa-check-circle"></i> You've reached the
                    end of results for "{searchQuery}"
                  </div>
                )}
              </div>
            ) : hasSearched && searchResult.length === 0 ? (
              <div className="alert alert-warning text-center mt-5">
                <h5>
                  <i className="fas fa-search me-2"></i>No videos found for "
                  <span className="text-danger">{searchQuery}</span>"
                </h5>
                <p>Try searching with different keywords</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
