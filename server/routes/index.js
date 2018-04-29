import user from '../controllers/user';

const baseUrl = 'api/v1';

const routes = app => {
  app.get(`${baseUrl}`, (req, res) => {
    res.status(200).json({
      message: 'Welcome to IRS- HalalFood Authority'
    });
  });

  app.post(`${baseUrl}/user/register`, user.register)

}

export default routes;
