const Yup = require('yup');
const { db } = require('./database');

exports.handler = async (event) => {
  try {
    const schema = Yup.object().shape({
      phrase: Yup.string().required(),
      author: Yup.string().required()
    });

    await schema.validate(event, {
      abortEarly: false,
    });

    const _db = await db(event);

    const response = {
      statusCode: 200,
      body: {
        message: "Frase cadastrada com sucesso!",
        data: _db
      },
    };
    
    return response;

  } catch (error) {
    const validationErrors = {};

    if (error instanceof Yup.ValidationError) {
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
    }

    const error_response = {
      statusCode: 400,
      body: {
        message: "Falha ao cadastrar a frase :(",
        data: Object.keys(validationErrors).length ? validationErrors : error
      }
    };

    return error_response;
  }
}