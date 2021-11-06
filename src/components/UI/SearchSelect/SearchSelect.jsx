import { Select } from 'antd'
import 'antd/dist/antd.css';
import PropTypes, { object } from 'prop-types';

export default function SearchSelect({options, placeholder, disabled, selectName, changeHandler}) {  
    const { Option } = Select;

    function onChange(id, option) {
        changeHandler(selectName, id, option.name)
    }

    return (        
        <Select
            showSearch
            style={{ width: "100%" }}
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange} 
            disabled={disabled}
        >
            {options !== undefined &&
                options.map(option => {
                    return (
                        <Option 
                            key={option.id} 
                            id={option.id} 
                            name={option.name}
                        >
                            {option.name}
                        </Option>
                    )
                })                
            }
        </Select>
    )
}

SearchSelect.propTypes = {
    options: PropTypes.arrayOf(object),
    placeholder: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selectName: PropTypes.string,
    changeHandler: PropTypes.func
}