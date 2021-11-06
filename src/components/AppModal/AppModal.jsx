import { Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import AddResidentForm from '../AddResidentForm/AddResidentForm';
import PropTypes from 'prop-types';

export default function AppModal({ isModalShow, submitHandler, handleCancel, editedResident}) {    

    return (        
        <Modal 
            title={
                <div style={{display:'flex', alignItems: 'center'}}>
                    <UserAddOutlined style={{color:'blue', fontSize:'50px', margin:'0 20px 0 0'}} />
                    <span>Добавить жильца</span>
                </div>
            }
            footer={null} 
            visible={isModalShow} 
            onCancel={handleCancel}
        >
            <AddResidentForm 
                submitHandler={submitHandler}
                editedResident={editedResident} 
            />
        </Modal>         
    )
}

AppModal.propTypes = {
    isModalShow: PropTypes.bool.isRequired,
    submitHandler: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    editedResident: PropTypes.func.isRequired
}