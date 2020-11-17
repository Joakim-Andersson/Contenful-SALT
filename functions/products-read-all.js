const { client, q } = require('./util/client.js')

exports.handler = async (event, context) => {
  if(event.httpMethod === 'GET') {
    return client.query(q.Map(q.Paginate(q.Documents(q.Collection("products"))), q.Lambda(x => q.Get(x))))
    .then((response) => {
      return {
        statusCode: 200,
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(response.data)
      }
    })
    .catch(err => {
      return {
        statusCode: 404,
      }
    })
  }
}
