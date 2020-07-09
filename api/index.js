const Yup = require('yup');

module.exports = async (req, res) => {
  try {
    const schema = Yup.object().shape({
      phrases: Yup.string().required(),
      author: Yup.string().required()
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    return res.status(200).json({
      message: 'Frase cadastrada com sucesso!',
      data: res.body
    })

  } catch (error) {
    const validationErrors = {};

    if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
            validationErrors[err.path] = err.message;
        });
    }

    return res.status(400).json({
      message: 'Falha ao cadastrar a frase :(',
      data: Object.keys(validationErrors).length ? validationErrors : error
    })
  }
}