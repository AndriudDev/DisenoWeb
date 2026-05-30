import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import pacienteRouter from './routes/paciente.routes'

const app = express()

const viewsPath = path.join(__dirname, '..', 'views')

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(viewsPath, 'layouts'),
  helpers: {
    eq: (a: unknown, b: unknown) => a === b
  }
}))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => res.render('home'))
app.use('/pacientes', pacienteRouter)

export default app
