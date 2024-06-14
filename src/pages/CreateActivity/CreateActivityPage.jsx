import './CreateActivityPage.css'
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm'

function CreateActivityPage (){
    return (
        <div className='createActivityPage'>
            <img src='' alt='CreateActivityPage background' className='background'/>
            <div className='createActivityForm'>
                <CreateActivityForm/>
            </div>
        </div>
    )
}

export default CreateActivityPage