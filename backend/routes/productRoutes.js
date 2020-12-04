import express from 'express';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';

router.route('/').get(getProducts)
router.route('/').get(getProductById)

export default router;