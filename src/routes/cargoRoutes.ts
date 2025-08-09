import { Router } from 'express';
import * as cargoController from '../controllers/cargoController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, cargoController.createCargo);
router.get('/', authenticateToken, cargoController.getCargos);
router.get('/:id', cargoController.getCargo);
router.put('/:id', cargoController.updateCargo);
router.delete('/:id', cargoController.deleteCargo);

export default router;