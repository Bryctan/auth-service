import { Router } from "express";
import validator from '../middlewares/reset-password-validator'
import {resetPasswordGrocer, resetPasswordCompany, resetPassword} from '../controllers/password-reset-controller';
const router = Router();

router.post ('/company-reset-password', validator.paramCompanyEmailResetPassword, validator.validatorParam, resetPasswordCompany);
router.post ('/grocer-reset-password', validator.paramGrocerEmailResetPassword, validator.validatorParam, resetPasswordGrocer);
router.post ('/reset-password/:t',validator.paramPassword,validator.validatorParam, resetPassword); 

export default router;
