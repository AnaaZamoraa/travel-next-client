import './CreateTravelPage.css'
import CreateTravelForm from '../../components/CreateTravelForm/CreateTravelForm'

function CreateTravelPage (){
    return (
        <div className='create-travel-page'>
            <div className='create-travel-form'>
                <CreateTravelForm/>
            </div>
        </div>
    )
}

export default CreateTravelPage