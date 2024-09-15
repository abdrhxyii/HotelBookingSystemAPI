const bcrypt = require('bcrypt');
const Guest = require('../modals/Guest');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  try {
    const existingGuest = await Guest.findOne({ where: { email } });
    if (existingGuest) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newGuest = await Guest.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role: role || 'guest',
    });

    return res.status(201).json(newGuest);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.loginUest = async (req, res) => {
  const { email, password } = req.body;
  try {
    const guest = await Guest.findOne({ where: { email } });
    if (!guest) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, guest.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign(
      { id: guest.id, email: guest.email, role: guest.role },
      "abdurrahmansecretcode", 
      { expiresIn: '1h' }
    );
    return res.status(200).json({ message: 'Login successful', id: guest.id, email: guest.email, role: guest.role, token: token});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};