import express from 'express'
const router = express.Router()
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/productsController.js';
import uploadMiddleware from '../middlewares/multer.js';
const upload = uploadMiddleware();

router.get('/getProducts', getAllProducts)
router.get('/getProduct/:id', getProductById)
router.post('/createProduct', createProduct)
router.patch('/updateProduct/:id', updateProductById)
router.delete('/deleteProduct/:id', deleteProductById)

// router.post("/upload", upload.single("file"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }
//     const fileUrl = req.file.path;
//     res.status(200).json({ success: true, fileUrl: fileUrl });
// });

export default router;