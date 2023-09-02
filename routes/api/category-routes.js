const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
      attributes: ["id", "category_name"],
    });
    console.log("successfully fetched");
    res.json(categoriesData);
  } catch (err) {
    console.error('Failed', err);
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    console.log(`Successfully fetched category with id ${req.params.id}.`);
    res.json(categoryData);
  } catch (err) {
    console.error(`Failed to fetch category with id ${req.params.id}:`, err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    console.log(`Successfully created category with id ${categoryData.id}.`);
    res.status(201).json(categoryData);
  } catch (err) {
    console.error('Failed at create category:', err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(500).json({ message: 'No category found with this id.' });
      return;
    }

    console.log(`Successfully updated category with id ${req.params.id}.`);
    res.json(categoryData);
  } catch (err) {
    console.error(`Failed at update category with id ${req.params.id}:`, err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }

    console.log(`Successfully deleted category ${req.params.id}.`);
    res.json(categoryData);
  } catch (err) {
    console.error(`Failed at delete category ${req.params.id}:`, err);
    res.status(400).json(err);  
  }
});

module.exports = router;
