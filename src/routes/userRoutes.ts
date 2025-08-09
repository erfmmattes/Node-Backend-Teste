import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', userController.createUser);
router.get('/', authenticateToken, userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', authenticateToken, userController.updateUser);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUserController);
// router.patch('/:id', authenticateToken, userController.deactivateUser);

export default router;