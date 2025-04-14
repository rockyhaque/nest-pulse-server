import express from 'express'
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/', adminController.getAllUserFromDB)
router.get('/:id', adminController.getUserByIdFromDB)
router.patch('/:id', adminController.updateUserIntoDB)
router.delete('/:id', adminController.deleteUserFromDB)
router.delete('/soft/:id', adminController.softDeleteUserFromDB)

export const adminRoutes = router;