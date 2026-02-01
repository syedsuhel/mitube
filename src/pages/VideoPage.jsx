import { useParams } from "react-router-dom";
import Player from "../components/Player";

const VideoPage = ({ title, channelName, description, publishedAt }) => {
  const { videoId } = useParams();
  return (
    <>
      <Player videoId={videoId} />
      <div className="fs-1">{title}</div>
      <div className="d-flex justify-space-between">
        <div className="fs-3">Channel:{channelName}</div>
        <div className="fs-3">Published At:{publishedAt}</div>
      </div>
      <div className="fw-bold">Description:</div>
      <div>{description}</div>
    </>
  );
};

export default VideoPage;
