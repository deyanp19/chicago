import style from './Card.css';


export default function Card({title,text}) {
    return (
        <div className="card shadow" >
            <div className="card-body m-3">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <a href="#" className="btn btn-primary">Enter</a>
            </div>
        </div>
    );
}