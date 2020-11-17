const { client, q } = require('./util/client.js')
const { getId } = require('./util/getId.js')

exports.handler = async (event, context) => {
  if(event.httpMethod === 'GET') {
    const id = getId(event.path);

    if(!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({error: "Invalid ID"})
      }
    }

    else {
      return client.query(q.Get(q.Ref(q.Collection("products"), id)))
      .then((response) => {
        console.log("success", response)
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
        console.log(err)
        return {
          statusCode: 404,
        }
      })
    }
  }
}

