import { useCalendarStore } from "../../hooks/useCalendarStore";



export const FabDelete = () => {

    const {startDeleteEvent , hasEventSelected} = useCalendarStore();

    const handleClickDelete = () => {
        startDeleteEvent();
    }
  return (
    <>
        <button 
            className="btn btn-danger fab-delete"
            onClick={ handleClickDelete }
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    </>
)
}
