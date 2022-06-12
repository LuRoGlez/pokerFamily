import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirestoreContext } from "../context/UseFirestore";
import {auth} from "../firebase/firebaseConfig"
import { useForm } from "react-hook-form";
import editcomment from "../resources/editcomment.png";
import deletecomment from "../resources/deletecomment.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



const Profile = () => {

    const {playerId} = useParams()

    const {data, allPlayers, addComment, comments, getComments, getAllPlayersGame, allPlayersGame, deleteComment} = useContext(FirestoreContext)
    const {register, handleSubmit, reset} = useForm(); 

    useEffect(() => {
        getAllPlayersGame()
        getComments()

        if(playerId !== undefined) {
            getComments()
            getAllPlayersGame()
        }
    }, [])


   const player = allPlayers.filter(player => player.uid === playerId)
   const gamesPlayed = allPlayersGame.filter(playGame => playGame.uid === playerId).length
   const gamesCreated = data.filter(game => game.uid === playerId).length
   const myComments = comments.filter(comment => comment.userA === playerId)

   let today = Math.floor(new Date().getTime())/1000

    today = new Date(today*1000)


    const toDate = second => {
        let date = new Date(second*1000)
        var day = date.getDate();
        if(day < 10) day = "0"+day
        var month = date.getMonth()+1;
        if(month < 10) month = "0"+month
        var year = date.getFullYear();
        return `${day}/${month}/${year}`
      }

   const onSubmit = (data) => {
       try {
            addComment(currentPlayer.uid, today, data.message)
           reset({message : ""})
           getComments()
       } catch (error) {
        Swal.fire(
            error.message,
            '',
            'error'
          )
       }
   }

   const currentPlayer = player[0]

   const removeComment = async (comment) => {
    await deleteComment(comment)
    Swal.fire(
        "Comentario Eliminado",
        '',
        'warning'
      )
}

    return (
        <>
        <div className="allProfile">
        <div className="profile">
            <div className="contrainerProfile">
                <h1>{currentPlayer.userName}</h1>
                <div className="infoProfile">
                    <div className="gamesCreated">
                        <p><span>Partidas Creadas:</span> {gamesCreated} </p>
                    </div>
                    <div className="gamesPlayed">
                        <p><span>Partidas Jugadas:</span> {gamesPlayed}</p>
                    </div>

                </div>
            </div>
            { playerId === auth.currentUser.uid ? null :
            <div className="createComment">
                <form className="formComments"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <h5>¿Has jugado con {currentPlayer.userName}? </h5>
                    <span>Deja un comentario para que todos lo conozcan</span>
                    <textarea cols="50" rows="5" maxLength="500" placeholder="Ej: Muy simpatico y gran jugador de poker"
                    {...register("message", {required: "Campo obligatorio"})}
                    />
                    <button type="submit"
                    className="btn btn-primary m-2">Enviar Comentario</button>
                </form>
            </div>
            }
        </div>
        { myComments.length > 0 ?
        <div className="comments">
            <h3>Comentarios</h3>
            { myComments.map(item => (
                
            <div className="commentContent my-2"
            key={item.id}>
                <div className="dateNameComment">
                    <span>{item.userB}</span>
                    <span>{toDate(item.date.seconds)}</span>
                </div>
                <div className="comment">
                   "{item.comment}"
                   {item.userB === auth.currentUser.displayName &&
                   <div><Link to = {"/editComment/" + item.id} ><img className="mx-2 icon" src={editcomment} alt="Rebuy" width={17} /></Link>
                        
                        <img className="icon" src={deletecomment} alt="Rebuy" width={17} 
                        onClick={() => removeComment(item.id)}/>
                   </div>
                }
                </div>
            </div>))}
            
        </div> : <h5>No hay comentarios sobre este jugador</h5>
     } 
        </div>
        </>
     );
}
 
export default Profile;