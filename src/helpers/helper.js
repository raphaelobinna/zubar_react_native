/**
 * Checks if a given object is empty
 * @param {Object} object 
 * @return {Boolean}
 */
const isEmptyObject = (object) => {
    if (isObject(object) && object !== undefined) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Check if a given value is an object
 * @param {*} value 
 * @return {boolean}
 */
const isObject = (value) => {
    if (!Array.isArray(value) && value instanceof Object) {
        return true;
    }
    return false
}

/**
 * Checks if a given array is empty
 * @param {Array} array 
 * @return {Boolean}
 */
const isEmptyArray = (array) => {
    if (isArray(array) && array !== undefined && array.length === 0) {
        return true;
    }
    return false;
}

/**
 * Check if a given value is an array
 * @param {*} value 
 * @return {boolean}
 */
const isArray = (value) => {
    if (Array.isArray(value) || value instanceof Array) {
        return true;
    }
    return false
}

/**
 * Checks if a given string is empty
 * @param {String} string 
 * @return {Boolean}
 */
const isEmptyString = (string) => {
    if (isString(string) && string !== undefined && string.length === 0) {
        return true;
    }
    return false;
}

/**
 * Check if a given value is a string
 * @param {*} value 
 * @return {boolean}
 */
const isString = (value) => {
    if (typeof value === 'string' || value instanceof String) {
        return true;
    }
    return false
}

/**
 * Converts the first letter of a given string to uppercase
 * @param {string} string 
 * @return {string}
 */
const ucfirst = (string) => {
    if (string === undefined) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Converts the first letter of a given string to lowercase
 * @param {string} string 
 * @return {string}
 */
const lcfirst = (string) => {
    if (string === undefined) {
        return '';
    }
    return string.charAt(0).toLowerCase() + string.slice(1)
}

/**
 * Returns a random date and time relative to current date
 * @param {integer|null} max hours ahead
 * @param {integer|null} min hours behind
 * @return {string} date time string
 */
const randomDate = (max = null, min = null) => {
    let currentDate = new Date(Date.now());
    let maxHours = max ? max : 1;
    let minHours = min ? -min : 1;
    let totalHours = Math.floor(Math.random() * (maxHours - minHours + 1) + minHours);
    currentDate.setHours(currentDate.getHours() + totalHours);
    return new Date(currentDate).toLocaleString();
}

/**
 * Evaluates and returns password strength based on a 100% points scale
 * @param {string} string 
 * @return {integer}
 */
const passwordStrengthMeter = (string) => {
    // Additions
    let additions = 0;
    let lengthScore = string.length * 4;
    let stringTypeScore = 0;
    let stringGroupScore = 0;
    let stringGroup = { uppercase: [], lowercase: [], numbers: [], specials: [] };

    string.split('').forEach(function (character) {
        // Reward uppercase
        if (character.match(/^[A-Z]+$/)) {
            stringGroup.uppercase.push(character);
            stringTypeScore = stringTypeScore + 2;
        }
        // Reward lowercase
        if (character.match(/^[a-z]+$/)) {
            stringGroup.lowercase.push(character);
            stringTypeScore = stringTypeScore + 2;
        }
        // Reward numbers
        if (character.match(/^[0-9]+$/)) {
            stringGroup.numbers.push(character);
            stringTypeScore = stringTypeScore + 4;
        }
        // Reward special characters
        if (character.match(/^[^a-zA-Z0-9]+/)) {
            stringGroup.specials.push(character);
            stringTypeScore = stringTypeScore + 6;
        }
        // Reward middle numbers and alphabets
        if (character.match(/^[f-rF-R4-7]+$/)) {
            additions = additions + 2;
        }
    });

    Object.keys(stringGroup).forEach((item, key) => { return stringGroupScore = stringGroup[item].length > 0 ? stringGroupScore + 5 : stringGroupScore; });

    // Deductions
    let deductions = 0;

    string.split('').forEach(function (uno, index) {
        // Get the next character for the loop
        let duo = (string[index + 1] !== undefined) ? string[index + 1] : '';
        let trio = (string[index + 2] !== undefined) ? string[index + 2] : '';

        // Punish uppercase followed by uppercase
        if (isUpperCase(uno + duo)) {
            deductions = deductions + 2;
        }
        // Punish lowercase followed by lowercase
        if (isLowerCase(uno + duo)) {
            deductions = deductions + 2;
        }
        // Punish numbers followed by number
        if (Number.isInteger(uno + duo * 1)) {
            if ((uno * 1) === (duo * 1)) {
                deductions = deductions + 2;
            }
        }
        // Punish sequential characters
        if (hasRepeatedLetters(uno + duo + trio)) {
            deductions = deductions + 3;
        }
        // Punish numerically sequential characters
        if (Number.isInteger(uno + duo + trio * 1)) {
            if ((uno + duo + trio * 1) === (uno + (uno++) + (uno++ + 1) * 1)) {
                deductions = deductions + 3;
            }
        }
    });

    return Math.round(((additions + lengthScore + stringTypeScore + stringGroupScore - deductions) * 100) / 268);
}

/**
 * Checks if a single string character is an alphabet
 * @param {string} character 
 * @return {boolean}
 */
const isLetter = (character) => {
    return character.match(/^[a-zA-Z]+$/);
}

/**
 * Checks if a string is completely uppercase alphabets
 * @param {string} string 
 * @return {boolean}
 */
const isUpperCase = (string) => {
    return !isLetter(string) ? false : string === string.toUpperCase();
}

/**
 * Checks if a string is completely lowercase alphabets
 * @param {string} string 
 * @return {boolean}
 */
const isLowerCase = (string) => {
    return !isLetter(string) ? false : string === string.toLowerCase();
}

/**
 * Checks if a string has repeated characters
 * @param {string} string 
 * @return {boolean}
 */
const hasRepeatedLetters = (string) => {
    return (/^([a-zA-Z0-9])\1{2,3}$/).test(string);
}

/**
 * Checks if a value is defined
 * @param {*} value 
 * @return {boolean}
 */
const isDefined = (value) => {
    if (value === undefined) {
        return false;
    }
    return true;
}

/**
 * Check if a value is an empty string, an empty array, an empty object or is undefined
 * @param {*} value 
 * @return {boolean}
 */
const isEmpty = (value) => {
    if (!isDefined(value)) { return true; }
    if (isString(value) && isEmptyString(value)) { return true; }
    if (isArray(value) && isEmptyArray(value)) { return true; }
    if (isObject(value) && isEmptyObject(value)) { return true; }

    return false;
}

/**
 * Ellipse long words and sentences
 * @param {string} string text to be eclipsed.
 * @param {integer} displayAreaWidth current display area width
 * @param {integer} ellipsesPercentage 0-100, percentage of string not to wrap with respect to display area width
 * @return {string}
 */
const autoEllipses = (string, displayAreaWidth, ellipsesPercentage = 60) => {
    let sliceLength = (parseInt(displayAreaWidth, 10) / 10) * (parseInt(ellipsesPercentage, 10) / 100);
    let suffix = sliceLength < string.length ? '...' : '';

    return string.slice(0, sliceLength) + suffix;
}

/**
 * Checks if a value contains only numerical string
 * @param {*} value 
 * @return {boolean}
 */
const isNumeric = (value) => {
    if (!isArray(value)) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    return false;
}

/**
 * Checks if a give value is exactly a number and not numeric string
 * @param {*} value 
 * @return {boolean}
 */
const isNumber = (value) => {
    return typeof value === 'number';
}

/**
 * Create a FormData object with a given object
 * @param {object} object 
 * @return {object}
 */
const objectToFormData = (object) => {
    const formData = new FormData();
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }

    return formData;
}

/**
 * Compare environmental variables
 * For dotenv variables, Assumes `process.env` is available
 * As this is a hybrid function it stands as both a client and server side method
 * @param {string} applicationEnvironmentKey 
 * @param {string} string 
 * @param {boolean} compareDirectly
 * @return {boolean}
 */
const isEnv = (applicationEnvironmentKey, string, compareDirectly = false) => {

    let env = !compareDirectly ? process.env[applicationEnvironmentKey] : applicationEnvironmentKey;
    if (env === string) {
        return true;
    }

    return false;
}

/**
 * Generate a random string
 * Note this is neither collision free or unpredictable
 * @param {integer} length, max 999999, returned string length
 * @param {string} range, characters to be used for generation
 * @return {string}
 */
const randomString = (length = 8, range = null) => {

    length = length * 1 > 999999 ? 999999 : length * 1;

    if (isString(range)) {
        const chars = [...range];
        return [...Array(length)].map(i => chars[Math.random() * chars.length | 0]).join(``);

    } else {
        return [...Array(length)].map(i => (Math.random() * 36 | 0).toString(36)).join(``);
    }
}

/**
 * Check if a given value is a boolean
 * @param {*} value 
 * @return {boolean}
 */
const isBoolean = (value) => {
    if (typeof variable === "boolean" || typeof (value) === typeof (true)) {
        return true;
    }
    return false
}

/**
 * Convert a form input file to base64
 * @param {file Object} file eg: e.target.files[0]
 * @param {function} callback 
 * @return {string}
 */
const inputFileToBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        callback(reader.result);
    };
};

/**
 * Return the file name form a file path
 * @param {string} path 
 * @return {string}
 */
const fileNameFromPath = (path) => {
    return path.split('\\').pop();
}

/**
 * Keys an array of objects by the given key
 * If multiple items have the same key, only the last one will appear
 * @param {array} arrayOfObjects 
 * @param {string} key 
 * @return {object}
 */
const keyBy = (arrayOfObjects, key) => {
    let bag = {};

    if (!isEmpty(arrayOfObjects)) {
        arrayOfObjects.map((item, index) => {
            bag[item[key]] = { ...item, index: index };
            return true;
        });
        return bag;
    }
    return false;
}

/**
 * Access an uncertain object and return a replacement if accessor fails
 * @param {object} object 
 * @param {string} accessors eg:'fish.type.food' where fish is the object, 'type.food' would be accessor string
 * @param {*} replacement 
 * @return {*}
 */
const tryOrReplace = (object, accessors, replacement = false) => {
    try {

        accessors = accessors.split('.');
        for (const key of accessors) {
            object = object[key];
        }
        return object;

    } catch (err) {
        return replacement;
    }
}

/**
 * List and return all numeric numbers between given numbers
 * @param {integer} startAt 
 * @param {integer} endAt max:999
 * @param {integer} step min:1
 * @return {boolean|array}
 */
const numericRange = (startAt, endAt, step = 1) => {
    if (startAt > endAt || endAt > 999 || step < 1) { return false; }
    return Array(Math.ceil((endAt + 1 - startAt) / step)).fill(startAt).map(
        (x, y) => { return x + y * step; }
    );
}

/**
 * List and return all characters between given characters
 * @param {string} startChar charset:UTF-8
 * @param {string} endChar charset:UTF-8
 * @return {boolean|string}
 */
const characterRange = (startChar, endChar) => {
    startChar = startChar.charCodeAt(0);
    endChar = endChar.charCodeAt(0);
    let numberOfChar = endChar - startChar + 1;

    if (startChar > endChar || numberOfChar < 0 || numberOfChar > 65535) { return false; }
    return String.fromCharCode(...[...Array(numberOfChar).keys()].map(i => i + startChar));
}

/**
 * Paginate an array of objects and return objects for specified page
 * @param {array} arrayOfObjects 
 * @param {integer} pageSize, number of objects per page
 * @param {integer} pageNumber, current page
 * @return {array}
 */
const paginateData = (arrayOfObjects, pageSize, pageNumber) => {
    return arrayOfObjects.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

/**
 * Retrieves all the values for a given key in an array of objects
 * @param {array} arrayOfObjects 
 * @param {string} key 
 * @return {array}
 */
const pluck = (arrayOfObjects, key) => {
    let bag = [];

    if (!isEmpty(arrayOfObjects)) {
        arrayOfObjects.map((item) => {
            bag.push(item[key]);
            return true;
        });
        return bag;
    }
    return false;
}

/**
 * Converts hex color string to an rgba color string
 * @param {string} hex eg: #01e, #3e4b1c
 * @param {decimal} alpha min:0 max:1 eg: 0.2
 * @return {string}
 */
const hex2rgba = (hex, alpha = 1) => {
    hex = hex.replace('#', '');
    hex = hex.length === 3 ? hex + hex : hex;
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * Groups an array of objects by a specified number
 * @param {array} arrayOfObjects
 * @param {integer} numberPerGroup min:1
 * @return {array}
 */
const sliceInToGroups = (arrayOfObjects, numberPerGroup = 1) => {
    let bag = [];
    let length = arrayOfObjects.length;
    let start = 0;
    let stop = numberPerGroup;

    do {
        bag.push(arrayOfObjects.slice(start, stop));
        start = start + numberPerGroup;
        stop = stop + numberPerGroup;
    } while (start < length);

    return bag;
}

/**
 * Restructure individual objects contained in an array
 * to conform with the given structure, also with the  
 * option of merging in the original object.
 * @param {array} arrayOfObjects [{a:'1', b:'2', c:'3'}]
 * @param {object} structure {'a':'apple', 'b':'book'}; object properties with key of `a` to be replaced with key of `apple`
 * @param {boolean} merge 
 * @returns {array} [{ apple: '1', book: '2' }]
 */
const mapAs = (arrayOfObjects, structure, merge = false) => {
    return arrayOfObjects.map((item) => {

        let set = {};
        for (each in structure) {
            if (item[each]) {
                set = { ...set, [structure[each]]: item[each] };
            }
        }

        // Check if current object data should be merged in.
        return merge ? { ...item, ...set } : set;
    });
}

/**
 * Abbreviate numeric values
 * @param {string} value '36000'
 * @returns {string} 36k
 */
const countAbbreviator = (value) => {
    let suffix = { 1: '', 2: 'K', 3: 'M', 4: 'T', 5: 'Qa', 6: 'Qi', 7: 'Hx', 8: 'Sp', 9: 'Oc', 10: 'No' }
    let group = value.toString().match(/.{1,3}(?=(.{3})*$)/g);

    if (suffix[group.length] !== undefined) { return group[0] + suffix[group.length]; }
    return value;
}

/**
 * convert empty strings in an object to null
 * @param {object} object [{a: '1', b: ''}]
 * @returns {object} [{a: '1', b: null}]
 */
const stringToNull = (object) => {
    Object.keys(object).forEach(
        k => object[k] = object[k] === '' ? null : object[k]
    )
    return object
}

/**
 * removes empty or null attributes of an object from it
 * @param {object} object [{a: '1', b: '', c: null}]
 * @returns {object} [{a: '1'}]
 */
const removeEmptyString = (object) => {
    let initial = stringToNull(object)
    Object.keys(initial).forEach((k) => initial[k] == null && delete initial[k]);
    return initial
}

/**
 * checks if a given string is a phone number
 * @param {string} string '+1 0950403' '+23480943443'
 * @returns {boolean} 
 */
const isValidPhoneNumber = (value) => {
    try {
        let ISD_CODES = [93, 355, 213, 1684, 376, 244, 1264, 672, 1268, 54, 374, 297, 61, 43, 994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 975, 591, 387, 267, 55, 246, 1284, 673, 359, 226, 257, 855, 237, 1, 238, 1345, 236, 235, 56, 86, 61, 61, 57, 269, 682, 506, 385, 53, 599, 357, 420, 243, 45, 253, 1767, 1809, 1829, 1849, 670, 593, 20, 503, 240, 291, 372, 251, 500, 298, 679, 358, 33, 689, 241, 220, 995, 49, 233, 350, 30, 299, 1473, 1671, 502, 441481, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964, 353, 441624, 972, 39, 225, 1876, 81, 441534, 962, 7, 254, 686, 383, 965, 996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265, 60, 960, 223, 356, 692, 222, 230, 262, 52, 691, 373, 377, 976, 382, 1664, 212, 258, 95, 264, 674, 977, 31, 599, 687, 64, 505, 227, 234, 683, 850, 1670, 47, 968, 92, 680, 970, 507, 675, 595, 51, 63, 64, 48, 351, 1787, 1939, 974, 242, 262, 40, 7, 250, 590, 290, 1869, 1758, 590, 508, 1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 1721, 421, 386, 677, 252, 27, 82, 211, 34, 94, 249, 597, 47, 268, 46, 41, 963, 886, 992, 255, 66, 228, 690, 676, 1868, 216, 90, 993, 1649, 688, 1340, 256, 380, 971, 44, 1, 598, 998, 678, 379, 58, 84, 681, 212, 967, 260, 263],
          //extract numbers from string
          thenum = value.match(/[0-9]+/g).join(""),
          totalnums = thenum.length,
          last10Digits = parseInt(thenum) % 10000000000,
          ISDcode = thenum.substring(0, totalnums - 10);
    
        //phone numbers are generally of 8 to 16 digits
        if (totalnums >= 8 && totalnums <= 16) {
          if (ISDcode) {
            if (ISD_CODES.includes(parseInt(ISDcode))) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
      } catch (e) {}
    
      return false;
}

export {
    isEmptyObject, isEmptyArray, ucfirst, randomDate, passwordStrengthMeter, isLetter, isLowerCase, isUpperCase, hasRepeatedLetters, isString,
    isEmptyString, isArray, isObject, isDefined, isEmpty, lcfirst, autoEllipses, isNumeric, isNumber, objectToFormData, isEnv, randomString,
    isBoolean, inputFileToBase64, fileNameFromPath, keyBy, tryOrReplace, numericRange, characterRange, paginateData, pluck, hex2rgba, sliceInToGroups,
    mapAs, countAbbreviator, stringToNull, removeEmptyString, isValidPhoneNumber
};