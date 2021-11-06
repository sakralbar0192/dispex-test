export function validateTelfield (value) {
    let inputNumbersValue = value.replace(/\D/g, '');
    let formatedInputValue = '';

    if (!inputNumbersValue) {
        return value = '';
    }    

    if (['7', '8'].includes(inputNumbersValue[0])) {
        const firstSimbols = inputNumbersValue[0] === '8' ? '8' : '+7';
        formatedInputValue = firstSimbols + ' ';

        if (inputNumbersValue.length > 1) {
        formatedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }

        if (inputNumbersValue.length >= 5) {
        formatedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }

        if (inputNumbersValue.length >= 8) {
        formatedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }

        if (inputNumbersValue.length >= 10) {
        formatedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
    } else {
        formatedInputValue = '+7' + inputNumbersValue;
    }     
    return formatedInputValue
};


export function validateNamefield (value) {
    const formatedValue = value.length === 0
        ?   ''
        :   value[0].toUpperCase() + value.slice(1)
    return formatedValue
}