const Tile = ({ title, src, publishedAt, channelTitle, publishTime }) => {
  return (
    <>
      <div className="card">
        <div className="row" style={{ maxWidth: "20.5rem", maxHeight: "30rem" }}>
          <div className="col-md-12">
            <img src={src} className="img-fluid rounded" style={thumbnailImgSty} />
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <div className="card-title fs-5 fw-bold text-dark">{title.length > 40 ? title.substring(0,40) + "..." : title}</div>
              <p className="card-text text-muted small mb-2 ">
                <i className="fas fa-user me-2"></i>
                {channelTitle}
              </p>
              <p className="card-text text-muted small mb-2">
                <i className="fas fa-calendar-alt me-2"></i>/
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

  objectFit: "cover",
};
export default Tile;
