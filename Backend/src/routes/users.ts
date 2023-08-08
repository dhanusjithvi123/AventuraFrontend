import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { Request, Response } from 'express';


const router = express.Router();
 
router.get ('/',()=>{
  console.log("hii");
  
})
 
export default router;

module.exports = router;