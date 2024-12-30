import cloudinary from "./cloudinary.js";

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return { success: true, message: 'Image deleted successfully' };
        } else {
            return { success: false, message: 'Failed to delete image' };
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw new Error('Error deleting image from Cloudinary');
    }
};
