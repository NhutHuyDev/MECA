import express, { Request, Response, NextFunction } from 'express'
import userRoutes from './user.routes'
import authRoutes from './auth.routes'
import friendshipRoutes from './friendship.routes'
import chatOneToOneRoutes from './chatOneToOne.routes'
import chatGroupRoutes from './chatGroup.routes'
import { NotFoundError } from '@/core/error.responses'
import log from '@/utils/logger'
import deserializeUser from '@/middlewares/deserializeUser'
import validateHeader from '@/middlewares/validateHeader'

const router = express.Router()

router.get('/v1/api/health-check', (_, res) => res.sendStatus(200))

/**
 * @description validateHeader
 */
router.use(validateHeader)

/**
 * @description deserializeUser
 */
router.use(deserializeUser)

/**
 * @description feature routes
 */
router.use('/v1/api/users', userRoutes)
router.use('/v1/api/auth', authRoutes)
router.use('/v1/api/friends', friendshipRoutes)
router.use('/v1/api/chat/individual', chatOneToOneRoutes)
router.use('/v1/api/chat/group', chatGroupRoutes)

/**
 * @description 404 handling
 */
router.use((req, res, next) => {
  const error = new NotFoundError()
  next(error)
})

/**
 * @description error handling
 */
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  log.error(error.stack)
  const status = error.code >= 400 && error.code < 500 ? 'error' : 'fail'
  return res.status(error.code || 500).json({
    code: error.code || 500,
    status: status,
    message: error.message || 'Internal server error'
  })
})

export default router
