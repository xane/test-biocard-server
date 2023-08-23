import {Router} from 'express';
import {ModelDriver} from '../model';
import {validateQueryID} from '../validate';

const router = Router();

/**
 * @swagger
 * /api/{id}/:
 *   get:
 *     summary: Driver
 *     tags: [Api]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Driver ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       404:
 *         description: Wrong request
 *         content:
 *           html/text:
 *             schema:
 *               type: string
 *               example: Driver not found
 *       500:
 *         description: Internal server error
 *         content:
 *           html/text:
 *             schema:
 *               type: string
 *               example: Server Error
 */
router.get('/api/:id/', validateQueryID, async (req, res) => {
  const {id: driverId} = req.params;
  const [data] = await ModelDriver.find({driverId});

  if (!data) {
    res.status(404);
    res.send('Item not found');
    return;
  }

  res.json({data});
});

export const RouterItem = router;
