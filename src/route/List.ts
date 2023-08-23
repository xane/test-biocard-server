import {Router} from 'express';
import yup from 'yup';
import {ModelDriver} from '../model';
import {validateQueryPage} from '../validate';

const router = Router();
const limit = 5;

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: All Drivers
 *     tags: [Api]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: false
 *         description: Page
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 list:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Internal server error
 *         content:
 *           html/text:
 *             schema:
 *               type: string
 *               example: Server Error
 */
router.get('/api/', validateQueryPage, async (req, res) => {
  let offset = 0;
  const {page} = req.query;

  if (page && typeof page === 'string') {
    const pageInt = parseInt(page);

    if (pageInt > 1) offset = (pageInt - 1) * limit;
  }

  const count = await ModelDriver.collection.countDocuments();
  const list = await ModelDriver.find().skip(offset).limit(limit);
  res.json({list, count});
});

export const RouterList = router;
