const Song = require('../models/Song');

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    console.log('Fetched songs:', songs);  // add this line
    res.json(songs);
  } catch (err) {
    console.error('Error fetching songs:', err);
    res.status(500).json({ message: 'Error fetching songs' });
  }
};

module.exports = { getSongs };
