var Joi = require('joi')

module.exports = Joi.object().keys({
  testBoolean: Joi.boolean().required(),
  testString: Joi.string().required(),
  testNumber: Joi.number().required(),
  testObjectSimple: Joi.object().keys({
    subTest1: Joi.string(),
    subTest2: Joi.number(),
    subTest3: Joi.boolean()
  }),
  testObjectComplete: Joi.object().keys({
    subTest4: Joi.string(),
    subTest5: Joi.object().keys({
        subSubTest1: Joi.object().keys({
          subSubSubTest1: Joi.string(),
          subSubSubTest2: Joi.number(),
          subSubSubTest3: Joi.boolean()
        }),
        subSubTest2: Joi.string(),
        subSubTest3: Joi.number(),
        subSubTest4: Joi.boolean()
    }),
    subTest6: Joi.array().items(Joi.any())
  }),
  testArraySimple: Joi.array().items(Joi.number()),
  testArrayObject: Joi.array().items(Joi.object().keys({
    item1: Joi.number(),
    item2: Joi.string()
  })),
  testArrayArray: Joi.array().items(Joi.array().items(Joi.any()))
})
