const router = require('express').Router();
const e = require('express');
//const { TableHints } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product, 
          through: ProductTag},
      ],
    })
  
  res.status(200).json(tagData)

  } catch(err) {
    res.status(400).json(err)
  }
  
});

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product},
      ],
    })
  
  res.status(200).json(tagData)

  } catch(err) {
    res.status(500).json(err)
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this...
    {
      tag_name: "Pop",
    }
  */

  try {
    const tagCreate = await Tag.create(req.body);

    res.status(200).json(tagCreate)

  } catch(err) {
    res.status(400).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(
      {tag_name: req.body.tag_name},
      {
        where: {id: req.params.id},
        returning: true,
        plain: true,
      }
    )

  res.status(200).json(tagUpdate)

  } catch(err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    }
  )

  if (!tagDestroy){
    res.status(404).json("No tag with that ID found")
    } else {
    res.status(200).json(tagDestroy)
  }

  } catch(err) {
    res.status(400).json(err)
  }
});

module.exports = router;
