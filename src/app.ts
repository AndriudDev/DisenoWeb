import express from 'express'
import session from 'express-session'
import path from 'path'
import { engine } from 'express-handlebars'
import pacienteRouter from './routes/paciente.routes'
import { requireAuth } from './middleware/requireAuth'
import authRouter from './routes/auth.routes'

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

app.use(session({
  secret: process.env.SESSION_SECRET ?? 'dev-secret',
  resave: false,
  saveUninitialized: false,
}))

app.use((req, _res, next) => {
  _res.locals.session = req.session
  next( )
})

app.get('/', (_req, res) => res.render('home'))
app.use('/login', authRouter)
app.use('/affiliates', requireAuth, pacienteRouter)

app.use((req, res) => {
  res.status(404).render('404', { message: `La página ${req.originalUrl} no existe.` })
})

//app.get('/', (_req, res) => res.render('home'))
//app.use('/pacientes', pacienteRouter)

export default app
