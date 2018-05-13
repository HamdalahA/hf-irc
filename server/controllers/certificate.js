import Sequelize from 'sequelize';
import db from '../models';

const { Certificate, Company } = db;
const { Op } = Sequelize;

export default {
  createCertificate(req, res) {
    const {
      refNo, imageUrl, companyName, expiryDate
    } = req.body;
    const { companyId } = req.params;

    Certificate.findOne({
      where: {
        [Op.or]: [
          { companyId },
          { refNo }
        ]
      }
    }).then((foundCert) => {
      if (foundCert) {
        return res.status(409).json({
          error: `Company with id: ${companyId} already has a certificate or the refNo: ${refNo} belongs to another company `
        });
      }

      Certificate.create({
        refNo,
        imageUrl,
        companyName,
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
  },
  viewCertificate(req, res) {
    const { search } = req.query;
    const limitValue = req.query.limit || 20;
    const pageValue = (req.query.page - 1) || 0;
    const sort = req.query.sort ? req.query.sort : 'createdAt';

    if (search) {
      const searchQuery = req.query.search.split(' ');

      const companyName = searchQuery.map(value => ({
        companyName: { [Op.iLike]: `%${value}%` }
      }));

      const refNo = searchQuery.map(value => ({
        refNo: { [Op.like]: `%${parseInt(value, 10)}%` }
      }));

      Certificate.findAndCountAll({
        order: [sort],
        limit: limitValue,
        offset: pageValue * limitValue,
        where: {
          [Op.or]: refNo.concat(companyName)
        }
      }).then(searchResult => res.status(200).json({
        page: (pageValue + 1),
        totalCount: searchResult.count,
        pageCount: Math.ceil(searchResult.count / limitValue),
        pageSize: parseInt(searchResult.rows.length, 10),
        certificate: searchResult.rows
      }));
    } else {
      Certificate.findAndCountAll({
        order: [sort],
        limit: limitValue,
        offset: pageValue * limitValue,
      }).then(searchResult => res.status(200).json({
        page: (pageValue + 1),
        totalCount: searchResult.count,
        pageCount: Math.ceil(searchResult.count / limitValue),
        pageSize: parseInt(searchResult.rows.length, 10),
        certificate: searchResult.rows
      }));
    }
  }
};

