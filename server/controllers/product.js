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
      })).catch((error) => {
        console.log('Product error >>', error);
        return res.status(500).json({
          error: 'Opps, something terible happend!'
        });
      });
    });
  },
  getAllProducts(req, res) {
    let message;
    if (req.query.search) {
      const searchQuery = req.query.search.split(' ');

      const name = searchQuery.map(value => ({
        name: { [Op.iLike]: `%${value}%` }
      }));

      const category = searchQuery.map(value => ({
        category: { [Op.iLike]: `%${value}%` }
      }));

      Product
        .findAll({
          where: {
            [Op.or]: name.concat(category)
          },
          order: [
            ['id', 'DESC']
          ]
        }).then((searchResult) => {
          if (searchResult.length < 1) {
            return res.status(200).json({
              message: 'Sorry no product matched your search!'
            });
          }
          res.status(200).json({
            searchResult
          });
        }).catch(() => {
          res.status(500).json({
            message: 'something terrible happend :('
          });
        });
    } else {
      Product.findAll({
        order: [
          ['id', 'DESC']
        ]
      }).then((allProducts) => {
        if (allProducts.length < 1) {
          message = 'No Product have been created!';
          return res.status(200).json({
            message
          });
        }
        res.status(200).json({
          allProducts
        });
      }).catch(() => {
        res.status(500).json({
          message: 'something terrible happend :('
        });
      });
    }
  },
  getProductByCompanyId(req, res) {
    const { companyId } = req.params;
    Product.findAll({
      where: {
        companyId
      },
      order: [
        ['id', 'DESC']
      ]
    }).then((foundProduct) => {
      if (foundProduct.length < 1) {
        res.status(404).json({
          message: `Product not found for company with id ${companyId}`
        });
      }
      res.status(200).json(foundProduct);
    });
  },
  editProduct(req, res) {
    const { companyId, id } = req.params;
    const { name, category } = req.body;
    const updateFields = {};
    Product
      .find({
        where: {
          [Op.and]: [
            { id },
            { companyId }
          ]
        }
      }).then((foundProduct) => {
        if (!foundProduct) {
          return res.status(404).json({
            message: 'Product not found!'
          });
        }

        if (name) {
          updateFields.name = name;
        }

        if (category) {
          updateFields.category = category;
        }

        foundProduct.update(
          updateFields,
          {
            where: {
              [Op.and]: [
                { id },
                { companyId }
              ]
            }
          }
        ).then((updatedProduct) => {
          res.status(200).json({
            message: 'Product updated sucessfully',
            updatedProduct
          });
        });
      }).catch(() => {
        res.status(500).json({
          message: 'Some thing terrible happend :('
        });
      });
  },
  deleteProduct(req, res) {
    const { id, companyId } = req.params;

    if (isNaN(companyId) || isNaN(id)) {
      return res.status(400).json({
        message: 'Parmeters must be nubmers'
      });
    }

    Product.findOne({
      where: {
        [Op.and]: [
          { id },
          { companyId }
        ]
      }
    }).then((foundProduct) => {
      if (!foundProduct) {
        return res.status(404).json({
          message: 'Product not found'
        });
      }
      Product.destroy({
        where: {
          [Op.and]: [
            { id },
            { companyId }
          ]
        }
      }).then(() => res.status(200).json({
        message: 'Product has been deleted sucessfully!'
      }));
    }).catch(() => {
      res.status(500).json({
        message: 'something terrible happend :('
      });
    });
  }
};
