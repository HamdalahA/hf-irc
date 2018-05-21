import Validator from 'validatorjs';

export default {
  createProduct(req, res, next) {
    const { name, category } = req.body;
    const { companyId } = req.params;
    const productData = {
      name,
      category,
      companyId
    };

    const productRules = {
      name: 'required|string|min:3',
      category: 'required|string',
      companyId: 'required|integer|min:1'
    };
    const validation = new Validator(productData, productRules);

    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  },

  createCertificate(req, res, next) {
    const { refNo, imageUrl, expiryDate } = req.body;
    const { companyId } = req.params;

    const certificateData = {
      refNo,
      imageUrl,
      expiryDate,
      companyId
    };

    const certificateRules = {
      refNo: 'required|integer|min:6',
      imageUrl: 'required|string',
      expiryDate: 'required|date',
      companyId: 'required|integer'
    };

    const validation = new Validator(certificateData, certificateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  },

  registerUser(req, res, next) {
    const { userName, email, password } = req.body;

    const userData = {
      userName,
      email,
      password
    };

    const userRules = {
      userName: 'required|string:min:3',
      email: 'required|email',
      password: 'required|string|min:6'
    };

    const validation = new Validator(userData, userRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  },

  singinUser(req, res, next) {
    const { identifier, password } = req.body;

    const userData = {
      identifier,
      password
    };

    const userRules = {
      identifier: 'required|string:min:3',
      password: 'required|string|min:6'
    };

    const validation = new Validator(userData, userRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  },

  registerCompany(req, res, next) {
    const {
      name, address, email, regDate, phoneNo, siteAddress
    } = req.body;

    const userData = {
      name,
      address,
      email,
      regDate,
      phoneNo,
      siteAddress
    };

    const userRules = {
      name: 'required|string:min:3',
      address: 'required|string|min:6',
      email: 'required|email',
      regDate: 'required|date',
      // phoneNo: 'required',
      siteAddress: 'required|string',
    };

    const validation = new Validator(userData, userRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }


};
