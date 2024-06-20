import './CreateActivityPage.css'
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm'
import activityService from '../../services/activity.service'

function CreateActivityPage (){

    return (
        <div className='create-activity-page'>
            <img src='' alt='' className='background'/>
            <div className='create-activity-form'>
                <CreateActivityForm/>
            </div>
        </div>
    )
}

export default CreateActivityPage