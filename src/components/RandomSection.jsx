import { useState, useEffect } from "react";
import { searchApiRandom } from "../api/apiservice";
import { Link } from "react-router-dom";
import Tile from "./Tile";

const RandomSection = ({ category, title }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  // initial fetch of videos
  useEffect(() => {
    setLoading(true);
    searchApiRandom(category, 40)
      .then((response) => {
        console.log(`${category} videos:, response.data.items`);
        setVideos(response.data.items);
        setNextPageToken(response.data.nextPageToken);
        setHasMore(!!response.data.nextPageToken);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  // function to load more videos
  const handleLoadMore = () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    searchApiRandom(category, 40, nextPageToken)
      .then((response) => {
        console.log(`${category}more videos:`, response.data.items);
        setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
        setNextPageToken(response.data.nextPageToken);
        setHasMore(!!response.data.nextPageToken);
        setLoadingMore(false);
      })
      .catch((err) => {
        console.error(`Error fetching more ${category} videos:`, err);
        setError(err.message);
        setLoadingMore(false);
      });
  };
  if (loading) {
    return (
      <>
        <div>{title}</div>
        <div className="spinner-border text-danger" role="status">
          <span>Loading...</span>
        </div>
      </>
    );
  }
  if (error) {
    return (
        <>
          <div className="alert alert-danger" role="alert">
          <div>{title}</div>-Error fetching videos: {error}
          </div>
        </>
  )}
  return (
    <div className="mb-5 pb-4 border-bottom">
      <h4 className="fw-bold mb-3 text-danger">
        <i className="fas fa-fire"></i> {title}
      </h4>
      
      {/* Videos Grid */}
      <div className="row">
        {videos.map((video) => (
          <div key={video.etag} className="col-12">
            <Link
              to={`/video/${video.id.videoId}`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="text-decoration-none"
            >
              <Tile
                src={video.snippet.thumbnails.medium.url}
                title={video.snippet.title}
                channelTitle={video.snippet.channelTitle}
                publishedAt={video.snippet.publishedAt}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-danger btn-lg"
            onClick={handleLoadMore}
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
        </div>
      )}
    </div>
  );
  
};


export default RandomSection;