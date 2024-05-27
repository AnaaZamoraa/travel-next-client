import { useContext } from "react";
import { ToastContext } from "../../contexts/toast.context";
import { Toast, ToastContainer } from "react-bootstrap";


function ToastMessage(){

    const {message, toast, closeToast} = useContext(ToastContext)

    return(
        <div>
          <ToastContainer className="p-3 position-fixed" position={'top-end'}>
            <Toast onClose={closeToast} show={toast} delay={3000} autohide>
                <Toast.Body className="text-center">{message}</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
    )
}
export default ToastMessage