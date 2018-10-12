import * as Express from 'express'

const app = Express()

app.get('/', (_: Express.Request, res: Express.Response) => {
  return res.send('Hello world')
})

app.listen(2233, () => {
  console.log('App is listening on port 2233')
})

export default app
