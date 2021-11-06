import { Form, Input, Button,  } from 'antd';
import { useEffect } from 'react';
import { validateNamefield, validateTelfield } from '../../utils';

export default function AddResidentForm({submitHandler, editedResident}) {
    const inputsNames = {
        NAME: 'name',
        PHONE: 'phone',
        MAIL: 'email'
    }

    const [form] = Form.useForm();
    
    let initialState={
        [inputsNames.NAME]:'',
        [inputsNames.PHONE]: '',
        [inputsNames.MAIL]: '',
        ...editedResident
    }

    useEffect(()=> {
        form.setFieldsValue(initialState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[initialState])

    const onFinish = (values) => { 
        const handledResident = {...editedResident, ...values}  
        submitHandler(handledResident)
        form.setFieldsValue(initialState)
      };

    const valuesChange =(change)=> {
        if (change[inputsNames.PHONE] !== undefined){
            form.setFieldsValue({
                [inputsNames.PHONE]: validateTelfield(change[inputsNames.PHONE])
            })
        }else if (change[inputsNames.NAME] !== undefined) {
            form.setFieldsValue({
                [inputsNames.NAME]: validateNamefield(change[inputsNames.NAME])
            })
        } else if (change[inputsNames.MAIL] !== undefined) {
            form.setFieldsValue({
                [inputsNames.MAIL]: (change[inputsNames.MAIL])
            })
        }

              
      }

    return (
        <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            onValuesChange={valuesChange}
            initialValues={initialState}
        >            
            <Form.Item 
                label="Имя" 
                name={inputsNames.NAME}
                rules={[{ message: 'Введите имя' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Телефон"
                name={inputsNames.PHONE}
                rules={[{ required: true, message: 'Введите телефон'}]}
            >
                <Input value='fdsf'/>
            </Form.Item>
            <Form.Item
                label="Email"
                name={inputsNames.MAIL}                
                rules={[{ message: 'Введите почту', pattern: /\S+@\S+\.\S+/}]}
                validateTrigger='onSubmit'
                messageVariables='sad'
            >
                <Input placeholder="Введите электронную почту" />
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary"
                    htmlType="submit"
                >Submit</Button>
            </Form.Item>
        </Form>
    )
}