const http = require('node:http')
const fs = require('node:fs/promises')

// crear servidor
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')

  let path = './public/'

  switch (req.url) {
    case '/':
      path += 'index.html'
      res.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      res.statusCode = 200
      break
    case '/contact':
      path += 'contact-me.html'
      res.statusCode = 200
      break
    case '/contact-me':
      res.statusCode = 301
      res.setHeader('Location', '/contact')
      break
    default:
      path += '404.html'
      res.statusCode = 404
      break
  }

  fs.readFile(path)
    .then((data) => res.end(data))
    .catch((err) => {
      console.log(err)
      res.end()
    })
})

// puerto
const PORT = process.env.PORT || 3000

// escuchar al servidor
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
