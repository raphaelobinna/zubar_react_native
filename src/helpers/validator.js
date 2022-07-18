
const validator = {
    required:(value)=>{ return (typeof value === 'string' || typeof value === 'number') && value !== ''; },
    email:(value)=>{ return /^[^\s@]+@[^\s@]+$/.test(value);},
    max:(value, maximum)=>{ return value < maximum },
    min:(value, minimum)=>{ return value > minimum },
    maxSize:(value, maximum)=>{ value = value?value:''; return value.length < maximum ? true :false; },
    minSize:(value, minimum)=>{ value = value?value:''; return value.length > minimum ? true :false; },
    phone:(value)=>{ return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(value);},
}

const onValidationFailMessage = {
    required:(fieldName)=>{ return `${fieldName} field is required` },
    email:(fieldName)=>{ return `${fieldName} field is not valid` },
    max:(fieldName, maximum)=>{ return `${fieldName} field can not be greater than ${maximum}` },
    min:(fieldName, minimum)=>{ return `${fieldName} field can not be less than ${minimum}` },
    maxSize:(fieldName, maximum)=>{ return `${fieldName} field size can not be greater than ${maximum}` },
    minSize:(fieldName, minimum)=>{ return `${fieldName} field size can not be less than ${minimum}` },
    phone:(fieldName)=>{ return `${fieldName} field is not valid` },
}

/**
 * Ensures that give data and rule objects confirms to requirements
 * @param {object} data 
 * @param {object} rules 
 * @returns {void}
 */
const shouldValidationRun = (data, rules) => {
    for (const key in data) {

        // Ensure matching validation rule for current data
        if (rules[key] === undefined){
            throw new Error(`There is no matching rule for ${key}`);
        }

        // If rule is a custom function skip rest of check
        if (Object.prototype.toString.call(rules[key]) === '[object Function]') {
            continue;
        }

        // Looping through all available rules for current key
        let availableRules = rules[key].split('|');
        for (const rule of availableRules) {

            // Checking if current rule has additional arguments
            let actualRule = rule.includes(':')? rule.split(':')[0] : rule;

            // Ensure that specified rule exists
            if (validator[actualRule] === undefined){
                throw new Error(`The rule ${actualRule} does not exist`);
            }
        }
    }
}

/**
 * Performs validation upon values based on supplied rules
 * @param {object} data {emailInput:'blue@gmail.com', ageInput:50}
 * @param {object} rules {emailInput:'required|email', ageInput:'required|max:25'}
 * @param {object} messages {emailInput:{required:'email is required', email:'email is not valid'}}
 * @returns {object}
 */
const validate = (data, rules, messages={}) => {

    // Enure that every give data has a corresponding valid rule set
    shouldValidationRun(data, rules);

    // Defining an error bag
    let errorBag = {};

    // Looping through all available data
    for (const key in data) {

        // Stating user input and ensuring object has proper structure
        let userInputValue = data[key];
        if (Object.hasOwnProperty.call(data, key)) {

            // Check if rule is a custom function, execute it then jump to next iteration
            if (Object.prototype.toString.call(rules[key]) === '[object Function]') {

                // Perform validation
                if ( !rules[key](userInputValue) ){

                    // Extracting default message for failed validation
                    let defaultMessage = `there was an issue with ${key}`;

                    // Sending failure message to error bag
                    errorBag = {
                        ...errorBag, [key]:{
                            ...errorBag[key],['custom']: ((messages)=>{
                                // If they are no custom defined error message then use the default message
                                return messages[key] && messages[key]['custom'] ? messages[key]['custom'] : defaultMessage;
                            })(messages)
                        }
                    }
                }

                continue;
            }

            // Looping through all available rules for current key
            let availableRules = rules[key].split('|');
            for (const rule of availableRules) {

                // Checking if current rule has additional arguments
                if (!rule.includes(':')) {

                    // Perform validation
                    if ( !validator[rule](userInputValue) ){

                        // Extracting default message for failed validation
                        let defaultMessage = onValidationFailMessage[rule](key);

                        // Sending failure message to error bag
                        errorBag = {
                            ...errorBag, [key]:{
                                ...errorBag[key],[rule]: ((messages)=>{
                                    // If they are no custom defined error message then use the default message
                                    return messages[key] && messages[key][rule] ? messages[key][rule] : defaultMessage;
                                })(messages)
                            }
                        }
                    }

                } else {

                    let actualRule = rule.split(':')[0];
                    let ruleArguments = rule.split(':')[1];

                    // Perform validation
                    if ( !validator[actualRule](userInputValue,...ruleArguments.split(',')) ){

                        // Extracting default message for failed validation
                        let defaultMessage = onValidationFailMessage[actualRule](key,...ruleArguments.split(','));

                        // Sending failure message to error bag
                        errorBag = {
                            ...errorBag, [key]:{
                                ...errorBag[key],[actualRule]: ((messages)=>{
                                    // If they are no custom defined error message then use the default message
                                    return messages[key] && messages[key][actualRule] ? messages[key][actualRule] : defaultMessage;
                                })(messages)
                            }
                        }
                    }
                }
            }
        }
    }

    return errorBag;
}

/**
 * Working example of required data format for validate method
 */
// let data = {
//     emailInput:'test@gmail.com', 
//     ageInput:50,
//     tagNumberInput:'t-a-g-n-u-m-b-e-r'
// };
// let rules = {
//     emailInput:'required|email', 
//     ageInput:'required|max:25',
//     tagNumberInput:(value)=>{
//         if (value === 't-a-g-n-u-m-b-e-r') { return true; }
//         return false;
//     }
// }
// let messages = {
//     emailInput:{
//         required:'email is required',
//         email:'email is not valid'
//     },
//     ageInput:{
//         required:'age is required',
//         max:'age is above the required limit'
//     },
//     tagNumberInput:{
//         custom:'tag number is incorrect'
//     }
// }

export {validator, onValidationFailMessage, shouldValidationRun, validate}