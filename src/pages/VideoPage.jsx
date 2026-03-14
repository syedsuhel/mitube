import { useParams } from "react-router-dom";
import Player from "../components/Player";
import { useEffect, useState } from "react";
import { fetchVideoById } from "../api/apiservice";
import Navbar from "../components/Navbar";
import { format } from "timeago.js";

const VideoPage = () => {
  const { videoId } = useParams();
  const [snippet, setSnippet] = useState({});

  useEffect(() => {
    fetchVideoById(videoId)
      .then((response) => {
        console.log("fetchVideoById response status :", response.status);
        console.log("fetchVideoById response data :", response.data);
        setSnippet(response.data.items[0].snippet);
      })
      .catch((e) => console.log(e));
  });
  return (
    <>
      <Navbar />
      <Player videoId={videoId} />
      <div className="container">
        <div className="row">
          
          <div className="col-lg-7 mt-4">
            <div className="fs-3">{snippet.title}</div>
            <div className="d-flex justify-space-between">
              <div className="fs-5">
                
                {/* Published At:{new Date(snippet.publishedAt).toLocaleDateString()}-
                  {new Date(snippet.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                 })} */
                }
                {/* Published At : {format(`${snippet.publishedAt} ${snippet.publishTime}`)} */}
                <span className="fw-bold"> Published At : </span>
                <i className="fas fa-calendar-alt me-2"></i>
                {format(snippet.publishedAt)}
              </div>
            </div>
            <div className="fw-bold fs-5 ">Description:</div>
            <div>{snippet.description}</div>
          </div>
          <div className="col-lg-5"></div>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
