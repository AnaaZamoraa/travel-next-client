import { createContext, useState } from "react";

const ToastContext = createContext()

function ToastProviderWrapper(props) {

    const [toast, setToast] = useState(false)
    const [message, setMessage] = useState('')

    const showToast = (text) => {
        setToast(true)
        setMessage(text)
        console.log(toast, message)
    }

    const closeToast = () => setToast(false) 

    return (
        <ToastContext.Provider value={{ showToast, toast, message, closeToast }}>
            {props.children}
        </ToastContext.Provider>
    )
}

export {ToastContext, ToastProviderWrapper}