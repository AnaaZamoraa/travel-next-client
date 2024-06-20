import './CreateTravelPage.css'
import CreateTravelForm from '../../components/CreateTravelForm/CreateTravelForm'

function CreateTravelPage (){
    return (
        <div className='create-travel-page'>
            {/* <img src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1718131825/travel-next/wkrmm34f8m6kv1u5k6nw.png' alt='CreateTravelPage background' className='background'/> */}
            <div className='create-travel-form'>
                <CreateTravelForm/>
            </div>
        </div>
    )
}

export default CreateTravelPage