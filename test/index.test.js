/* eslint-env mocha */

const Picker = require('../source/picker.js')
const Joi = require('joi')
const expect = require('chai').expect
const _cloneDeep = require('lodash.cloneDeep')

describe('Joi pick method test', () => {
  it('should be a function', () => {
    expect(Picker.pick).to.be.a('Function')
  })

  it('should picked from schema', () => {
    const completeSchema = require('./schema/complete')

    const expected = {
      testBoolean: false,
      testString: 'blabla',
      testNumber: 6,
      testObjectSimple: {
        subTest1: 'bidule',
        subTest2: 7,
        subTest3: true
      },
      testObjectComplete: {
        subTest4: 'blom',
        subTest5: {
          subSubTest1: {
            subSubSubTest1: 'truc',
            subSubSubTest2: 9,
            subSubSubTest3: false
          },
          subSubTest2: 'machin',
          subSubTest3: 1,
          subSubTest4: true
        },
        subTest6: [{truc: 'muche'}, 2]
      },
      testArraySimple: [4, 5, 6],
      testArrayObject: [{item1: 8, item2: 'item2'}],
      testArrayArray: [['bla', 'blo', 'bli'], [{machin: {chose: 'truc'}}]]
    }

    let modified = _cloneDeep(expected)
    modified['test32'] = 'bidule'
    modified.testObjectComplete['machin'] = 'chose'
    modified.testArrayObject[0]['truc'] = 'bidule'

    expect(modified).to.not.deep.equal(expected)

    const pickedData = Picker.pick(modified, completeSchema)

    expect(pickedData).not.to.equal(null)
    expect(pickedData).to.deep.equal(expected)

    const validationError = Joi.validate(pickedData, completeSchema).error
    expect(validationError).to.equal(null)
  })
})
