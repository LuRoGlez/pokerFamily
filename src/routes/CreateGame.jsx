import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext } from "react";
import { FirestoreContext } from "../context/UseFirestore";
import Swal from "sweetalert2";

const CreateGame = () => {
  const navigate = useNavigate();

  const {register, control, handleSubmit, formState: { errors }, watch} = useForm();

  const watchLate = watch("lateRegister")
  const watchAddon = watch("addon")

 const {addGame} = useContext(FirestoreContext);

 const formatCity = city => {
   let words = city.split(" ").map(word =>{
     return word[0].toUpperCase()+word.slice(1).toLowerCase()
   })

   return words.join(" ");
 }


  const onSubmit = async(data) => {
      try {
          await addGame(data.addon, data.addonChips, data.addonLevel, data.addonPrice, data.address, data.buyin, formatCity(data.city), data.lateLevels, data.lateRegister, data.levels, data.maxPlayers, data.name, data.playersXtable, data.rebuy, data.stackInicial, data.start)
          Swal.fire(
            data.name,
            '¡Partida creada con éxito!',
            'success'
          )
          navigate("/");
      } catch (error) {
        Swal.fire(
          error.message,
          '',
          'error'
        )
      }
  }

  return (
    <div className="centerFragment">
      
      <form onSubmit={handleSubmit(onSubmit)} className="createGame">
      <h2 className="my-3">Crear Partida</h2>
        <div className="createGroup">
          <div className="form-group">
            <label className="form-label mt-2">Nombre Partida:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Torneo Mensual"
              {...register("name", { required: "Campo obligatorio" })}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Precio:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 25"
              {...register("buyin", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.buyin && (
              <p style={{ color: "red" }}>{errors.buyin.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Nº Jugadores:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 18"
              {...register("maxPlayers", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.maxPlayers && (
              <p style={{ color: "red" }}>{errors.maxPlayers.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Jugadores por mesa:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 6"
              {...register("playersXtable", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.playersXtable && (
              <p style={{ color: "red" }}>{errors.playersXtable.message}</p>
            )}
          </div>
        </div>
        <div className="createGroup">
          <div className="form-group">
            <label className="form-label mt-2">Duración de los niveles:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 25"
              {...register("levels", { required: "Campo obligatorio" , min: 1})}
            />
            {errors.levels && (
              <p style={{ color: "red" }}>{errors.levels.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Stack Inicial:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 40.000"
              {...register("stackInicial", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.stackInicial && (
              <p style={{ color: "red" }}>{errors.stackInicial.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Re-buy:</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="rebuy"
                {...register('rebuy')}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Addon:</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="addon"
                {...register('addon')}
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Registro Tardío:</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="lateRegister"
                {...register('lateRegister')}
              ></input>
            </div>
          </div>
        </div>
        
        <div className="createGroup">
        { watchAddon && 
        <>
            <div className="form-group">
            <label className="form-label mt-2">Precio Addon:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 10"
              {...register("addonPrice", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.addonPrice && (
              <p style={{ color: "red" }}>{errors.addonPrice.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Puntos Addon:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 25.000"
              {...register("addonChips", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.addonChips && (
              <p style={{ color: "red" }}>{errors.addonChips.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Nivel Addon:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 6"
              {...register("addonLevel", { required: "Campo obligatorio", min: 1 })}
            />
            {errors.addonLevel && (
              <p style={{ color: "red" }}>{errors.addonLevel.message}</p>
            )}
          </div>
    </>
          
          
        }
        { watchLate && 
            <div className="form-group">
            <label className="form-label mt-2">Niveles Reg Tardío:</label>
            <input
              type="number"
              className="form-control short"
              placeholder="Ej: 6"
              {...register("lateLevels", { required: "Campo obligatorio" , min: 1})}
            />
            {errors.lateLevels && (
              <p style={{ color: "red" }}>{errors.lateLevels.message}</p>
            )}
          </div>
        }
        </div>
        <div className="createGroup">
          <div className="form-group">
            <label className="form-label mt-2">Dirección:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Calle Alonso cano n1"
              {...register("address", { required: "Campo obligatorio" })}
            />
            {errors.address && (
              <p style={{ color: "red" }}>{errors.address.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Ciudad:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Jaen"
              {...register("city", { required: "Campo obligatorio" })}
            />
            {errors.city && (
              <p style={{ color: "red" }}>{errors.city.message}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label mt-2">Fecha y Hora:</label>
           <Controller name="start"
            control={control} 
            defaultValue={null}
            render = {
                    ({field}) => <DatePicker className="form-control m-size" 
                    onChange={field.onChange} 
                    selected={field.value} 
                    placeholderText="Selecciona fecha y hora" 
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={5}
                    timeCaption="Hora"
                    dateFormat="MM-dd-yyyy h:mm"
                    />
                }
            rules={{required:true}}
                />
                {errors.start && (
                  <p style={{ color: "red" }}>Campo obligatorio</p>
                )}
          </div>
        </div>
        <button
        type="submit"
        className="btn btn-lg btn-primary mt-5 createButton"
      >
        Crear Partida
      </button>
      </form>
      
      </div>
  );
};

export default CreateGame;
