export default function MovieCart({ title, image, date, year }) {
    return (
        <div className="movie_item">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="details">
                <h3>{title}</h3>
                <h5>{date}</h5>
                <span>{year}</span>
            </div>
        </div>
    )
}