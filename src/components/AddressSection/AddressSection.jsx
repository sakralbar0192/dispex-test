import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressController from '../../controllers/AddressController';
import { useCatching } from '../../hooks/useCatching';
import Loader from '../UI/Loader/Loader';
import SearchSelect from '../UI/SearchSelect/SearchSelect';
import cl from './addressSection.module.scss';
import { message } from 'antd';


export default function AddressSection() {
    const selectsNames = {
        STREETS: 'STREETS',
        HOUSES: 'HOUSES',
        FLATS: 'FLATS'
    }

    const dispatch = useDispatch();

    const addressState = useSelector(state=>state.address)
    const streets = addressState.streets
    const houses = addressState.houses
    const flats = addressState.flats

    const [fetchStreets, loadingError, isStreetsLoading] = useCatching(async()=> {
       await dispatch(AddressController.getStreets())
    })

    const [fetchHouses, housesloadingError] = useCatching(async(id) => {
        await dispatch(AddressController.getHouses(id))     
    })
    const [fetchFlats, flatsloadingError] = useCatching(async(id) => {
       await dispatch(AddressController.getFlats(id))
    })

    useEffect(()=> {    
        fetchStreets()    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if (loadingError) {
            message.error(`${housesloadingError} Произошла ошибка при загрузке списка улиц`)
        }
        if (housesloadingError) {
            message.error(`${housesloadingError} Произошла ошибка при загрузке списка домов`)
        }
        if (flatsloadingError) {
            message.error(`${flatsloadingError} Произошла ошибка при загрузке списка квартир`)
        }
    },[housesloadingError, flatsloadingError, loadingError])
  
    const activityStatusHandler = (name) => {
        switch (name) {
            case selectsNames.STREETS:
                return  streets.length > 0
                            ? false
                            : true
            case selectsNames.HOUSES:
                return  houses.length > 0
                            ? false
                            : true
            case selectsNames.FLATS:
                return  flats.length > 0
                            ? false
                            : true
            default: 
            return false
        }
    }

    const selectChangeHandler = (selectName, id, name) => {
        switch (selectName) {
            case selectsNames.STREETS:  
                dispatch(AddressController.writeStreet(name))            
                fetchHouses(id)
                break   
            case selectsNames.HOUSES:
                dispatch(AddressController.writeHouse(name))
                fetchFlats(id)
                break  
            case selectsNames.FLATS: 
                dispatch(AddressController.writeFlat(name)) 
                dispatch(AddressController.addAddressId(id)) 
                break
            default: 
                return null
        }
    }
    
    return (
        <section className={cl.addressSection}>
            <h2>Адрес</h2>
            {isStreetsLoading 
                ? <div className={cl.addressSection__loader}>
                    <Loader />
                </div>
                : <div className={cl.addressSection__wrapper}>
                    <div className={cl.addressSection__bigField}>
                        <SearchSelect
                            placeholder="Улица"
                            options={streets}
                            selectName={selectsNames.STREETS}
                            disabled={activityStatusHandler(selectsNames.STREETS)}
                            changeHandler = {selectChangeHandler}
                        />
                    </div>
                    <div className={cl.addressSection__smallField}>
                        <SearchSelect
                            placeholder="Дом"
                            options={houses}
                            selectName={selectsNames.HOUSES}
                            disabled={activityStatusHandler(selectsNames.HOUSES)}
                            changeHandler = {selectChangeHandler}
                        />
                    </div>
                    <div className={cl.addressSection__smallField}>
                        <SearchSelect
                            placeholder="Кв/офис" 
                            options={flats}
                            selectName={selectsNames.FLATS}
                            disabled={activityStatusHandler(selectsNames.FLATS)}
                            changeHandler = {selectChangeHandler}
                        />
                    </div>
                </div>
            }
        </section>
    )
}
