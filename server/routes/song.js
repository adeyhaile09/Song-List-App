module.exports = (app) => {
  const express = require('express');
  const Model = require('../models/song');
  const router = express.Router();

  router.post('/post', async (req, res) => {
    const data = new Model({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
    });

    try {
      data.track = 'test';
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Update by ID Method
  router.put('/update/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Model.findByIdAndUpdate(id, updatedData, options);

      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Get by ID Method
  router.get('/getOne/:id', async (req, res) => {
    try {
      const data = await Model.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/getAll', async (req, res) => {
    try {
      const data = await Model.find({});
      const count = await Model.count({});
      const dataWithCount = { data, count };
      res.json(dataWithCount);
      // res.status(count).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //Delete by ID Method
  router.delete('/delete/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id);
      res.send(`Document with ${data.name} has been deleted..`);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/get-song-by-genre', async (req, res) => {
    try {
      const result = await Model.find({ genere: req.params.genere });
      res.status(200).json({
        status: 'Success',
        message: 'Fetch Completed',
        data: result,
        count: result.length,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  });

  router.get('/get-song-by-album', async (req, res) => {
    try {
      const result = await Model.find({ album: req.params.album });
      res.status(200).json({
        status: 'Success',
        message: 'Fetch Completed',
        data: result,
        count: result.length,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  });
  router.get('/get-song-by-artist', async (req, res) => {
    try {
      const result = await Model.find({ artist: req.params.artist });
      res.status(200).json({
        status: 'Success',
        message: 'Fetch Completed',
        data: result,
        count: result.length,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  });

  app.use('/api/songs', router);
};
