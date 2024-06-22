import './CreateActivityPage.css'
import CreateActivityForm from '../../components/CreateActivityForm/CreateActivityForm'

function CreateActivityPage() {
    return (
        <div className='create-activity-page'>
            <div className='create-activity-form'>
                <h5>Create an activity</h5>
                <CreateActivityForm showSubmitButton={true}/>
            </div>
        </div>
    )
}

export default CreateActivityPage
