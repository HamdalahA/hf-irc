import Sequelize from 'sequelize';
import db from '../models';

const { Product } = db;
const { Op } = Sequelize;

export default {
  createProduct(req, res) {
    const { name, category } = req.body;
    const { companyId } = req.params;
    Product.findOne({
      where: {
        [Op.and]: [
          { name },
          { companyId }
        ]
      }
    }).then((foundProduct) => {
      if (foundProduct) {
        return res.status(409).json({
          error: `Product ${name} already exists for this comapny`
        });
      }

      Product.create({
        name,
        category,
        companyId
      }).then(product => res.status(201).json({
        message: 'Product has be added succesfully',
        product
      }));
    }).catch((error) => {
      console.log('Product error >>', error);
      return res.status(500).json({
        error: 'Opps, something terible happend!'
      });
    });
  }
};
