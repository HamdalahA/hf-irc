import user from '../controllers/user';
import company from '../controllers/company';
import product from '../controllers/product';
import certificate from '../controllers/certificate';

import validation from '../middleware/validation';

const baseUrl = '/api/v1';

const routes = (app) => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).json({
      message: 'Welcome to IRS- HalalFood Authority'
    });
  });

  app.post(`${baseUrl}/user/register`, user.register);
  app.post(`${baseUrl}/user/signin`, user.signin);

  app.post(`${baseUrl}/company/register`, company.registerCompany);
  app.get(`${baseUrl}/companies`, company.getAllCompanies);
  app.get(`${baseUrl}/company/:companyId`, company.getSingleCompany);
  app.delete(`${baseUrl}/company/:companyId`, company.deleteCompany);
  app.put(`${baseUrl}/company/:companyId`, company.updateCompany);

  app.post(
    `${baseUrl}/:companyId/product`,
    validation.createProduct, product.createProduct
  );
  app.get(`${baseUrl}/product`, product.getAllProducts);
  app.get(`${baseUrl}/:companyId/product`, product.getProductByCompanyId);
  app.put(`${baseUrl}/:id/:companyId/product`, product.editProduct);
  app.delete(`${baseUrl}/:id/:companyId/product`, product.deleteProduct);

  app.post(
    `${baseUrl}/:companyId/certificate`,
    validation.createCertificate, certificate.createCertificate
  );
  app.get(`${baseUrl}/certificates`, certificate.viewCertificate);
  app.put(`${baseUrl}/:id/:companyId/certificate`, certificate.editCertificate);
};

export default routes;
