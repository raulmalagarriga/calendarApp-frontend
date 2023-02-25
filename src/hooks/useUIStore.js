import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

// Todas las funciones del modal las queremos manejar a traves de este hook.
export const useUIStore = () => {

    const dispatch = useDispatch();
    const {isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }
    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {
        // propiedades
        isDateModalOpen,
        // metodos
        openDateModal,
        closeDateModal,
    }

} 