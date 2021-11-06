import { Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import cl from './residentCard.module.scss'

export default function ResidentCard({resident, deleteHandler, editHandler}) {
    const { Meta } = Card;

    return (
        <Card
            className={cl.residentCard}            
            actions={[
                <DeleteOutlined  key="delete" onClick={() => {deleteHandler(resident.bindId)}}/>,
                <EditOutlined key="edit" onClick={()=> {editHandler(resident)}} />
            ]}
        >            
            <Meta
                avatar={<Avatar size='medium' icon={<UserOutlined style={{color:'blue'}}/>} />}
                title={resident.name}
                description={
                    <div className={cl.residentCard__description}>
                        <div>
                            <PhoneOutlined size="small" /> 
                            <span>{resident.phone}</span>
                        </div>
                        {resident.email&&
                            <div>
                                <MailOutlined size="small" /> 
                                <span>{resident.email}</span>
                            </div>
                        }                        
                    </div>
                }
            />
        </Card>
    )
}

ResidentCard.propTypes = {
    resident: PropTypes.object.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired
}
