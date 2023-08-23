import {Router} from 'express';
import {ModelDriver} from '../model';
import {validateQueryID, validatePostEdit} from '../validate';

const router = Router();

/**
 * @swagger
 * /api/{id}/:
 *   post:
 *     summary: Driver Edit
 *     tags: [Api]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Driver ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Driver'
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
router.post(
  '/api/:id/',
  validateQueryID,
  validatePostEdit,
  async (req, res) => {
    const {id: driverId} = req.params;
    const [data] = await ModelDriver.find({driverId});

    if (!data) {
      res.status(404);
      res.send('Driver by ID not found');
      return;
    }

    const {givenName, familyName, url, dateOfBirth, nationality} = req.body;
    data.givenName = givenName;
    data.familyName = familyName;
    data.url = url;
    data.dateOfBirth = dateOfBirth;
    data.nationality = nationality;
    data.save();
    res.json(data);
  },
);

export const RouterItemEdit = router;
