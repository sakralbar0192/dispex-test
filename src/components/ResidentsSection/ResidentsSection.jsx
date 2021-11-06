import ResidentCard from '../ResidentCard/ResidentCard';
import { Button, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import cl from './residentsSection.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useCatching } from '../../hooks/useCatching';
import ResidentsController from '../../controllers/ResidentsController';
import Loader from '../UI/Loader/Loader';
import AppModal from '../AppModal/AppModal';
import { useDispatch } from 'react-redux';
import { removeResidentAction } from '../../store/redusers/residentsReduser';

export default function ResidentsSection() {
    const dispatch = useDispatch()
    const addressState =  useSelector(state => state.address)
    const address = addressState.address
    const isAddressEnteredFull = addressState.isAddressEnteredFull  
    const addressId = addressState.addressId  
    const residentsState = useSelector(state => state.residents)     
    const [residents, setResidents] = useState([])
    const [isModalShow, setModalShow] = useState(false)
    const [editedResident, setEdetedResident] = useState({})

    const [fetchResidents, residentsLoadingError, isResidentsLoading] = useCatching(async() => {
        dispatch(ResidentsController.getResidents(addressId))
    })

    const [createResident] = useCatching(async(resident)=> {    
        const residentId =  await ResidentsController.createResident(resident)
        await ResidentsController.bindResident(residentId, addressId)
        fetchResidents()
    })

    const [removeResident, removeResidentError] = useCatching(async (BindId)=> {
        ResidentsController.removeResident(BindId)
        dispatch(removeResidentAction(BindId))
    })

    const [editResident, editResidentError] = useCatching(async(resident)=>{
        await removeResident(resident.bindId)
        await createResident(resident)
    })
    
    useEffect(() => {
        setResidents([...residentsState])
    },[residentsState])

    useEffect(() => {
        if (isAddressEnteredFull) {
            fetchResidents()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAddressEnteredFull, addressId])

    useEffect(()=>{
        if (removeResidentError) {
            message.error(`${removeResidentError} Произошла ошибка при удалении клиента`)
        }
        if (editResidentError) {
            message.error(`${editResidentError} Произошла ошибка при редактировании`)
        }        
    },[removeResidentError, editResidentError])

    const showModal = () => {
        setModalShow(true)
    }

    const handleCancel = () => {
        setModalShow(false)
        setEdetedResident({})
      };

    const submitHandler = (resident) => {
        setModalShow(false)
        if (resident.bindId === undefined) {
            createResident(resident)
        } else {
            editResident(resident)
            setEdetedResident({})
        }
        
    }

    const deleteHandler = (BindId) => {
        removeResident(BindId)
    }

    const editHandler = (resident) => {
        setEdetedResident(resident)
        setModalShow(true)
    }
    
    return (
        <section className={cl.residentsSection}>
            <h2>Жильцы</h2>
            <div className={cl.residentsSection__wrapper}>
                {isAddressEnteredFull 
                    ? <div>
                        <div className={cl.residentSection__adressWrapper}>
                            <p>{address}</p>
                            <div className={cl.residentSection__addButton}>
                                <Button 
                                    type="primary" 
                                    shape="circle" 
                                    icon={<UserAddOutlined />} 
                                    onClick={showModal}
                                />
                            </div>
                        </div>
                        {isResidentsLoading
                            ? <Loader />
                            : residentsLoadingError
                                ? <p>Произошла ошибка при загрузке жильцов: {residentsLoadingError}</p>
                                : residents.length>0 
                                    ? <div className={cl.residentsSection__residentsList}>
                                        {residents.map(resident => {
                                            return (
                                                <div key ={resident.id} className={cl.residentSection__residentItem}>
                                                    <ResidentCard 
                                                        resident={resident}
                                                        deleteHandler={deleteHandler}
                                                        editHandler={editHandler}
                                                    />
                                                </div>
                                            ) 
                                        })}
                                    </div>
                                    : <p>Здесь нет зарегистрированных жильцов</p>
                        }
                    </div>                        
                    : <p>Введите адрес полностью, чтобу увидеть жильцов</p>
                }            
            </div>  
            <AppModal 
                isModalShow={isModalShow}
                submitHandler={submitHandler}
                handleCancel={handleCancel} 
                editedResident={editedResident}
                handledResident={editedResident}             
            />
        </section>
    )
}
