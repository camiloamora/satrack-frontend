//const SERVER_URL = 'http://localhost:3001'
//const SERVER_URL = 'http://localhost:5274/v1'
const SERVER_URL = 'https://satrackapp.azurewebsites.net/v1'

class Request {
  constructor(resource) {
    this.resource = resource
  }

  request(resource = this.resource, options = {}) {
    const method = options.method ? options.method.toUpperCase() : 'GET'
    const requestOptions = {...options, method: method }

    requestOptions.headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    })

    if(options.body) {
      requestOptions.body = JSON.stringify(options.body)
    }

    return fetch(`${SERVER_URL}/${resource}`, requestOptions)
      .then(data => {
        return data.json()
      }
    )
  }
}

export default Request
