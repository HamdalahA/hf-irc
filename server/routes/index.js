import user from '../controllers/user';
import company from '../controllers/company';
import product from '../controllers/product';
import certificate from '../controllers/certificate';

import validation from '../middleware/validation';
import auth from '../middleware/auth';

const baseUrl = '/api/v1';

const routes = (app) => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).json({
      message: 'Welcome to IRS- HalalFood Authority'
    });
  });

  app.post(
    `${baseUrl}/user/register`,
    validation.registerUser, user.register
  );
  app.post(
    `${baseUrl}/user/signin`,
    validation.singinUser, user.signin
  );

  app.post(
    `${baseUrl}/company/register`,
    auth.Verify, validation.registerCompany, company.registerCompany
  );
  app.get(
    `${baseUrl}/companies`,
    auth.Verify, company.getAllCompanies
  );
  app.get(
    `${baseUrl}/company/:companyId`,
    auth.Verify, company.getSingleCompany
  );
  app.delete(
    `${baseUrl}/company/:companyId`,
    auth.Verify, company.deleteCompany
  );
  app.put(
    `${baseUrl}/company/:companyId`,
    auth.Verify, company.updateCompany
  );

  app.post(
    `${baseUrl}/:companyId/product`,
    auth.Verify, validation.createProduct, product.createProduct
  );
  app.get(`${baseUrl}/product`, auth.Verify, product.getAllProducts);
  app.get(
    `${baseUrl}/:companyId/product`,
    auth.Verify, product.getProductByCompanyId
  );
  app.put(
    `${baseUrl}/:id/:companyId/product`,
    auth.Verify, product.editProduct
  );
  app.delete(
    `${baseUrl}/:id/:companyId/product`,
    auth.Verify, product.deleteProduct
  );

  app.post(
    `${baseUrl}/:companyId/certificate`,
    auth.Verify, validation.createCertificate, certificate.createCertificate
  );
  app.get(`${baseUrl}/certificates`, auth.Verify, certificate.viewCertificate);
  app.put(
    `${baseUrl}/:id/:companyId/certificate`,
    auth.Verify, certificate.editCertificate
  );
  app.delete(
    `${baseUrl}/:id/:companyId/certificate`,
    auth.Verify, certificate.deleteCertificate
  );
};

export default routes;
