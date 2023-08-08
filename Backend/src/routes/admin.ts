import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Request, Response } from 'express';
import  login  from '../controllers/admincontroller';

const router = express.Router();

router.post('/adminlogin', login);

export default router;

module.exports = router;