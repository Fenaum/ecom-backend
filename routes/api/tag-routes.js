const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    console.log('Successfully fetched all tags.');
    res.json(tagsData);
  } catch (err) {
    console.error('Failed to fetch tags:', err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    console.log(`Successfully fetched tag with id ${req.params.id}.`);
    res.json(tagData);
  } catch (err) {
    console.error(`Failed to fetch tag with id ${req.params.id}:`, err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    console.log(`Successfully created new tag: ${newTag.tag_name}`);
    res.json(newTag);
  } catch (err) {
    console.error('Failed to create a new tag:', err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    console.log(`Successfully updated tag with id ${req.params.id}.`);
    res.json({ message: `Tag with id ${req.params.id} has been updated.` });
  } catch (err) {
    console.error(`Failed to update tag with id ${req.params.id}:`, err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    console.log(`Successfully deleted tag with id ${req.params.id}.`);
    res.json({ message: `Tag with id ${req.params.id} has been deleted.` });
  } catch (err) {
    console.error(`Failed to delete tag with id ${req.params.id}:`, err);
    res.status(500).json(err);
  }
});

module.exports = router;
