export default function MovieCart({ title, image, date }) {
    return (
        <div>
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="details">
                <h3>{title}</h3>
                <h5>{date}</h5>
            </div>
        </div>
    )
}