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
  }

};
