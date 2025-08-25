import { Router } from 'express';
import { Photo } from '../models/photo.model';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,path.join(__dirname,"../assets/uploads")),
    filename:(req,file,cb)=>cb(null , Date.now() + path.extname(file.originalname))
});

const upload = multer({storage});

router.get('/',async (req, res, next) => {
    try {
        const photos = await Photo.find();
        /** @TODO Render Existing Photos in index.ejs */
        res.render('index', { photos });
    } catch (err) {
        console.error(err);
        next(err)
    }
})

router.post(
    '/',
    upload.single('image') ,
    async (req, res, next) => {
        try {

            const path = `assets/uploads/${req.file?.filename}`;
            const newImage = new Photo({path});
            await newImage.save();
            res.redirect('/');

        } catch (err) {
            console.error(err);
            next(err)
        }
    }
)

export default router;