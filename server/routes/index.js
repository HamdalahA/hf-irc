import user from '../controllers/user';
import company from '../controllers/company';

const baseUrl = '/api/v1';

const routes = app => {
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

}

export default routes;
