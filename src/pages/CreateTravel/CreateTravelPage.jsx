import './CreateTravelPage.css'
import CreateForm from '../../components/CreateForm/CreateForm'

function CreateTravelPage (){
    return (
        <div className='createTravelPage'>
            <img src='https://res.cloudinary.com/dv7nx2bxb/image/upload/v1718131825/travel-next/wkrmm34f8m6kv1u5k6nw.png' alt='CreateTravelPage background' className='background'/>
            <div className='createForm'>
                <CreateForm/>
            </div>
        </div>
    )
}

export default CreateTravelPage