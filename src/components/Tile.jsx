const Tile = ({ title, src, publishedAt, channelTitle, publishTime }) => {
  return (
    <>
      <div className="card">
        <div className="rowcg-0" style={{ width: "20rem",height: "20rem"}}>
          <div className="col-md-12">
            <img src={src} className="img-fluid rounded" style={thumbnailImgSty} />
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <div className="card-title fs-6 fw-bold text-dark">{title.length > 35 ? title.substring(0,35) + "..." : title}</div>
              <p className="card-text text-muted small mb-1 ">
                <i className="fas fa-user me-2"></i>
                {channelTitle.length>18? channelTitle.substring(0,18) + "..." : channelTitle}
              </p>
              <p className="card-text text-muted small mb-1">
                <i className="fas fa-calendar-alt me-2"></i>
                { new Date(publishedAt).toLocaleDateString()}-
                {new Date(publishTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const thumbnailImgSty = {
  
  width: "100%",
  height: "12rem",
  // objectFit: "cover",
};
export default Tile;
