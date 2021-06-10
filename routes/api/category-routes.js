const router = require('express').Router();
//const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });

    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    res.status(200).json(categoryData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      category_name: "Sports",
    }
  */

  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
      where: {id: req.params.id},
      returning: true,
      plain: true,
      })

    res.status(200).json(categoryUpdate)

    if (!categoryUpdate) {
      res.status(404).json({ message: 'No Categories found with that id!' });
      return;
    }

    res.status(200).json(categoryUpdate) //should return # affected rows

  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryDestroy = await Category.destroy(
      {
        where: {id: req.params.id}
      }
    )

    if (!categoryDestroy) {
      res.status(404).json({ message: 'No Categories found with that id!' });
      return;
    }

    res.status(200).json(categoryDestroy)
  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
