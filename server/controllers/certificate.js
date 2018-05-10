import Sequelize from 'sequelize';
import db from '../models';

const { Certificate } = db;
const { Op } = Sequelize;

export default {
  createCertificate(req, res) {
    const { refNo, imageUrl, expiryDate } = req.body;
    const { companyId } = req.params;

    Certificate.findOne({
      where: {
        [Op.and]: [
          { companyId },
          { refNo }
        ]
      }
    }).then((foundCert) => {
      if (foundCert) {
        return res.status(409).json({
          error: `Company with id: ${companyId} already has a certificate`
        });
      }

      Certificate.create({
        refNo,
        imageUrl,
        expiryDate,
        companyId
      }).then((certificate) => {
        res.status(201).json({
          message: 'Certificate created successfully',
          certificate
        });
      });
    }).catch((error) => {
      console.log('Certificate error >>', error);
      return res.status(500).json({
        error: 'Opps, something terible happend!'
      });
    });
  }
};

