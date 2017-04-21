const Joi = require('joi')
const _forEach = require('lodash.forEach')

const pickInternal = function (describe, source, propertyName) {
  let result

  switch (describe.type) {
    case 'object':
      const childrens = Object.keys(describe.children)
      result = {}
      _forEach(childrens, (key) => {
        try {
          result[key] = pickInternal(describe.children[key], source[key], key)
        } catch (e) {
          // The error can come from an optionnal field and we don't perform validation here.
        }
      })
      break
    case 'array':
      result = []
      const arrayType = describe.items[0].type
      if (arrayType === 'array' || arrayType === 'object') {
        _forEach(source, (value) => {
          result.push(pickInternal(describe.items[0], value))
        })
      } else {
        _forEach(source, (value) => {
          result.push(value)
        })
      }
      break
    default:
      result = source
  }
  return result
}

const pick = function (source, schema) {
  const describe = Joi.compile(schema).describe()
  return pickInternal(describe, source)
}

module.exports.pick = pick
