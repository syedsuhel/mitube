const Player = ({videoId})=>{
    return(
        <>
        <iframe width={1280} height={420} src={`https://www.youtube.com/embed/${videoId}`} allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameBorder={0} allowFullScreen></iframe>
        </>
    )
}

export default Player