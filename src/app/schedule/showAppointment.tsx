import { Button } from 'antd';
import { appiontmentProp } from '../appointment/types';
import {ShowAppointmentProps} from './types'

const ShowAppointment: React.FC<ShowAppointmentProps> = ({ currentApp, onSubmit }) => {
        return(
            <div>
                <Button onClick={onSubmit} type='primary'>Make a Appointment</Button>
                {currentApp ? (
                <div className='mt-6'>
                    <p>Patient: {currentApp.patient}</p>
                    <p>Doctor: {currentApp.doctor}</p>
                    <p>Treatment: {currentApp.treatment}</p>
                    <p>Date: {currentApp.date}</p>
                    <p>Time: {currentApp.time}</p>
                </div>
                ) : (
                    <p className='mt-6'>No appointment details available. Please select an appointment to view its details.</p>
                )}
            </div>
        );
}
export default ShowAppointment;