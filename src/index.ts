import server from './server'
import colors from 'colors'

const port = process.env.PORT || 2026

server.listen(port, () => {
  console.log(colors.cyan.bold(`Server is up and running on port ${port}`))
})
