const http = require('node:http')
const fs = require('node:fs/promises')
const path = require('node:path')

// crear servidor
const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  )

  const extname = path.extname(filePath)
  let contentType = 'text/html'

  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }

  // leer archivo para enviar respuesta
  fs.readFile(filePath)
    .then((data) => {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data, 'utf8')
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        fs.readFile('./public/404.html').then((data) => {
          res.writeHead(200, { 'Content-Type': contentType })
          res.end(data, 'utf8')
        })
      } else {
        res.writeHead(500)
        res.end(err.code)
      }
    })
})

// puerto
const PORT = process.env.PORT || 3000

// escuchar al servidor
server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
