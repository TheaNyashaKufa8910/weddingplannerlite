import Wedding from "../models/wedding.js";

// Create a new wedding
export const createWedding = async (req, res) => {
  try {
    const { coupleName, date, venue, guests, notes } = req.body;
    const user = req.auth.userId; // Clerk userId

    const wedding = new Wedding({ user, coupleName, date, venue, guests, notes });
    await wedding.save();

    res.status(201).json({ success: true, data: wedding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all weddings for logged-in user
export const getWeddings = async (req, res) => {
  try {
    const user = req.auth.userId;
    const weddings = await Wedding.find({ user }).sort({ date: 1 });
    res.status(200).json({ success: true, data: weddings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a single wedding by ID
export const getWeddingById = async (req, res) => {
  try {
    const user = req.auth.userId;
    const wedding = await Wedding.findOne({ _id: req.params.id, user });

    if (!wedding) {
      return res.status(404).json({ success: false, message: "Wedding not found" });
    }

    res.status(200).json({ success: true, data: wedding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update a wedding by ID
export const updateWedding = async (req, res) => {
  try {
    const user = req.auth.userId;
    const wedding = await Wedding.findOneAndUpdate({ _id: req.params.id, user }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!wedding) {
      return res.status(404).json({ success: false, message: "Wedding not found or unauthorized" });
    }

    res.status(200).json({ success: true, data: wedding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a wedding by ID
export const deleteWedding = async (req, res) => {
  try {
    const user = req.auth.userId;
    const wedding = await Wedding.findOneAndDelete({ _id: req.params.id, user });

    if (!wedding) {
      return res.status(404).json({ success: false, message: "Wedding not found or unauthorized" });
    }

    res.status(200).json({ success: true, message: "Wedding deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
