import { Router } from 'express';
import { applyLoan, getLoanStatus, updateLoan } from '../controllers/loanController';

const router = Router();

router.post('/apply', applyLoan);
router.get('/:loanId', getLoanStatus);
router.put('/:loanId', updateLoan);

export default router;
