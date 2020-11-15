const validators = {
    unequal: {
      message: 'Este campo es requerido',
      test: (val) => {
        return (val && val !== ''.trim())
      }
    },
    sameas: {
      message: 'Estos valores no coinciden',
      test: (val, allValues, data) => {
        return allValues[data] && allValues[data]===val;
      }
    },
    length: {
      message: 'Este valor es invalido',
      test: (val, allValues, data) => {
        return val.toString().length===parseInt(data);
      }
    },
    required: {
      message: 'Este campo es requerido',
      test: (val) => {
        return (val && val !== ''.trim())
      }
    },
    'email': {
      message: 'Este email es invalido',
      test: (val) => {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(val) || val === ''.trim()
      }
    },
    'url': {
      message: 'Esta URL no es valida',
      test: val => {
        const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\\.\\-]+\.[a-zA-Z]{2,5}[\\.]{0,1}/
        return re.test(val)
      }
    },
    'string': {
      message: 'Por favor escriba aqui',
      test: (val) => {
        return (typeof val) === 'string'
      }
    },
    'boolean': {
      message: 'Por favor elija si o no',
      test: (val) => {
        return (val === '1' || val === '0' || val === 1 || val === 0)
        // return (typeof val)==='boolean';
      }
    },
    'integer': {
      message: 'Por favor ingrese un entero',
      test: (val) => {
        return Number.isInteger(1 * val)
      }
    },
    'date': {
      message: 'Esto no es una fecha valida',
      test: (val) => {
        console.log('date validator:' + val)
        return true
      }
    },
    'numeric': {
      message: 'Por favor ingrese un numero',
      test: (val) => {
        return !isNaN(val)
      }
    },
  }

  export default validators