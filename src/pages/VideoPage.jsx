import { Link, useParams } from "react-router-dom";
import Player from "../components/Player";
import { useEffect, useState } from "react";
import { fetchRelatedVideos, fetchVideoById } from "../api/apiservice";
import Navbar from "../components/Navbar";
import { format } from "timeago.js";

const VideoPage = () => {
  const { videoId } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchVideoById(videoId)
      .then((response) => {
        console.log("fetchVideoById response status :", response.status);
        console.log("fetchVideoById response data :", response.data);
        const data = response.data.items[0].snippet;
        setSnippet(data);
        // for related videos
        return fetchRelatedVideos(data.title);
      })
      .then((response) => {
        console.log("fetchRelatedVideos response status :", response.status);
        console.log("fetchRelatedVideos response data :", response.data);
        setRelatedVideos(response.data.items);
      })
      .catch((e) => console.log(e));
  }, [videoId]);
  return (
    <>
      <Navbar handleSearch={() => {}} />
      
      {snippet && (
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mt-4">
              <Player videoId={videoId} />
              <div className="fs-3">{snippet.title}</div>
              <div className="d-flex justify-space-between">
                <div className="fs-5">
                  {/* Published At:{new Date(snippet.publishedAt).toLocaleDateString()}-
                  {new Date(snippet.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                 })} */}
                  {/* Published At : {format(`${snippet.publishedAt} ${snippet.publishTime}`)} */}
                  <span className="fw-bold"> Published At : </span>
                  <i className="fas fa-calendar-alt me-2"></i>
                  {format(snippet.publishedAt)}
                </div>
              </div>
              <div className="fw-bold fs-5 ">Description:</div>
              <div>{snippet.description}</div>
            </div>
            {/* Related Videos */}
            <div className="col-lg-4 mt-4">
              <div className="fs-4 fw-bold mb-3">Related Videos</div>
              <div className="d-flex flex-column gap-3">
                {relatedVideos.map((videoItem) => {
                  return (
                    <Link
                      to={`/video/${videoItem.id.videoId}`}
                      className="text-decoration-none"
                      key={videoItem.etag}
                    >
                      <div className="d-flex gap-2">
                        <img
                          src={videoItem.snippet.thumbnails.default.url}
                          alt={videoItem.snippet.title}
                          className="img-fluid"
                        />
                        <div>
                          <div className="fw-bold" style={{fontSize:"0.95rem"}}>
                            {videoItem.snippet.title.length > 15 ? videoItem.snippet.title.substring(0,15) + "..." : videoItem.snippet.title}
                          </div>
                          <div className="text-muted" style={{fontSize:"0.9rem"}}>
                            {videoItem.snippet.channelTitle}
                          </div>
                          <div className="text-muted" style={{fontSize:"0.9rem"}}>
                            {format(videoItem.snippet.publishedAt)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
