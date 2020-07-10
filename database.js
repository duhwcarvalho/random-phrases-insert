const { Client } = require('pg')

module.exports.db = async (data) => {
  try {
    const client = new Client()
    await client.connect()

    const {
      phrase,
      author
    } = data;

    const now = new Date();
    const query = {
      text: 'INSERT INTO phrases(phrase, author, created_at) VALUES($1, $2, $3) RETURNING *',
      values: [ phrase, author, now ],
    }

    const res = await client.query(query);

    await client.end()

    return res.rows[0];
  } catch (err) {
    
    throw 'Falha ao persistir dados'
  }
};