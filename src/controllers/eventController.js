import Event from '../models/eventModel.js';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new event (optionally linked to authenticated user)
export const addEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;

    if (!name || !date || !location) {
      return res.status(400).json({ message: 'Name, date, and location are required.' });
    }

    // If user authentication is active, attach user ID
    const clientId = req.user ? req.user._id : null;

    const event = new Event({
      name,
      date,
      location,
      description,
      client: clientId
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};





