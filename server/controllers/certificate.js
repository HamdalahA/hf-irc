import Sequelize from 'sequelize';
import db from '../models';

const { Certificate } = db;
const { Op } = Sequelize;

export default {
  createCertificate(req, res) {
    const {
      refNo, imageUrl, companyName, expiryDate
    } = req.body;
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
          error: `Company with id: ${companyId} already has a certificate or the refNo: ${refNo} belongs to another company `
        });
      }

      Certificate.create({
        refNo,
        imageUrl,
        companyName,
        expiryDate,
        companyId
      }).then(certificate => res.status(201).json({
        message: 'Certificate created successfully',
        certificate
      }));
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
      const searchQuery = search.split(' ');

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
      }).then((searchResult) => {
        if (searchResult.length < 1) {
          return res.status(200).json({
            message: 'Sorry no Certificate matched your search'
          });
        }
        return res.status(200).json({
          page: (pageValue + 1),
          totalCount: searchResult.count,
          pageCount: Math.ceil(searchResult.count / limitValue),
          pageSize: parseInt(searchResult.rows.length, 10),
          certificate: searchResult.rows
        });
      });
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
  },

  editCertificate(req, res) {
    const { companyId, id } = req.params;
    const {
      refNo, imageUrl, companyName, expiryDate
    } = req.body;
    const updateFields = {};


    if (isNaN(companyId) || isNaN(id)) {
      return res.status(400).json({
        message: 'Parmeters must be nubmers'
      });
    }

    Certificate.find({
      where: {
        id,
        companyId
      }
    }).then((foundCertificate) => {
      if (!foundCertificate) {
        return res.status(404).json({
          message: 'Certificate Not found'
        });
      }

      if (refNo) {
        updateFields.refNo = refNo;
      }

      if (imageUrl) {
        updateFields.imageUrl = imageUrl;
      }

      if (companyName) {
        updateFields.companyName = companyName;
      }

      if (expiryDate) {
        updateFields.expiryDate = expiryDate;
      }
      
      foundCertificate.update(
        updateFields,
        {
          where: {
            [Op.and]: [
              { id },
              { companyId }
            ]
          }
        }
      ).then(updatedCertificate => res.status(200).json({
        message: 'Certificate updated sucessfully',
        updatedCertificate
      })).catch(() => {
        res.status(500).json({
          message: 'Some thing terrible happend :('
        });
      });
    });
  },

  deleteCertificate(req, res) {
    const { id, companyId } = req.params;
    if (isNaN(companyId) || isNaN(id)) {
      return res.status(400).json({
        message: 'Parmeters must be nubmers'
      });
    }

    Certificate.findOne({
      where: {
        [Op.and]: [
          { id },
          { companyId }
        ]
      }
    }).then((foundCert) => {
      if (!foundCert) {
        return res.status(404).json({
          message: 'Certificate not found'
        });
      }
      Certificate.destroy({
        where: {
          [Op.and]: [
            { id },
            { companyId }
          ]
        }
      }).then(() => res.status(200).json({
        message: 'Certificate has been deleted sucessfully!'
      }));
    }).catch(() => {
      res.status(500).json({
        message: 'something terrible happend :('
      });
    });
  }
};

