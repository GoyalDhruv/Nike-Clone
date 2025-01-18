import express from 'express'
const router = express.Router()
import { createProduct, deleteProductById, getAllProducts, getClassicProduct, getProductById, updateProductById } from '../controllers/products.controller.js';
import uploadMiddleware from '../middlewares/multer.js';
import { deleteImageFromCloudinary } from '../config/deleteImg.js';
import { authAdminMiddleware } from '../middlewares/authenicateAdmin.js';
const upload = uploadMiddleware();

router.get('/getProducts', getAllProducts)
router.get('/getClassicProducts', getClassicProduct)
router.get('/getProduct/:id', getProductById)
router.post('/createProduct', authAdminMiddleware, createProduct)
router.patch('/updateProduct/:id', authAdminMiddleware, updateProductById)
router.delete('/deleteProduct/:id', authAdminMiddleware, deleteProductById)

router.post("/uploadFile", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    return res.status(200).json({
        message: 'Image uploaded successfully',
        public_id: req.file.filename,
        url: req.file.path,
    });
});

router.delete('/deleteFile', async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) {
        return res.status(400).json({ message: 'Public ID is required' });
    }

    try {
        const result = await deleteImageFromCloudinary(public_id);

        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;