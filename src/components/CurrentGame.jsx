const CurrentGame = ({current}) => {


    if(!current){
        return null
    }
    console.log(current)
    return ( 
        <>
        <h2>Detalles</h2>
        <div className="registerDetail">
        <div className="containerDetalles">
            <h4>{current[0].name}</h4>
            <ul>
            <li><span>Fecha: </span>25 enero 2022</li>
            <li><span>Hora: </span>19:30 h</li>
            <li><span>Ciudad: </span>{current[0].city}</li>
            <li><span>Buy In: </span>{current[0].buyin} €</li>
            <li><span>Stack Inicial: </span>25.000</li>
            </ul>
        </div>
        <button type="submit"
            className="btn btn-lg btn-primary my-1 center"
            >Registrar</button>
        </div>
        </>
     );
}
 
export default CurrentGame;