/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       required:
 *         - driverId
 *         - name
 *         - url
 *         - givenName
 *         - familyName
 *         - dateOfBirth
 *         - nationality
 *       properties:
 *         driverId:
 *           type: string
 *           example: test
 *         name:
 *           type: string
 *           example: Test
 *         url:
 *           type: string
 *           example: https://example.com/
 *         givenName:
 *           type: string
 *           example: Test
 *         familyName:
 *           type: string
 *           example: Test
 *         dateOfBirth:
 *           type: string
 *           example: 1981-07-29
 *         nationality:
 *           type: string
 *           example: American
 *       example:
 *         driverId: test
 *         name: Test
 *         url: https://example.com/
 *         givenName: Test
 *         familyName: Test
 *         dateOfBirth: 1981-07-29
 *         nationality: American
 */
export type TypeDriver = {
  driverId: string;
  name: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};
