import { Router } from 'express';
import { registerUser, loginUser, getMe, updateProfile, removeProfilePicture } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import { uploadAvatar } from '../middleware/avatarUploadMiddleware';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, uploadAvatar.single('avatar'), updateProfile);
router.delete("/profile/avatar", protect, removeProfilePicture);

export default router;
