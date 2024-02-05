import { Router } from 'express';
import { provider, grocer, company } from '../controllers/register-controller'
import validator from '../middlewares/register-validator'
import { authorizetoken } from '../middlewares/decoded-token';
import { companyGoogle, get_token, grocerGoogle } from '../controllers/register-google-controller';

const router = Router();

router.post('/grocer', validator.paramsGrocer, validator.validatorParams, grocer);
router.post('/provider', authorizetoken, validator.paramsProvider, validator.validatorParams, provider);
router.post('/company', validator.paramsCompany, validator.validatorParams, company);

router.post('/google/grocer', grocerGoogle);
router.post('/google/company', companyGoogle);
router.post('/google/token', get_token);

export default router;