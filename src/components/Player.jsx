const Player = ({ videoId }) => {
  return (
    <>
      <div className="container-fluid d-flex">
        <div className="row">
          <div className="col-l-8 offset-1 d-flex">
            <iframe
            //   width={1280}
            //   height={720}
              style={{width:"50rem",height:"28.125rem"}}
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder={0}
              allowFullScreen className="rounded"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
