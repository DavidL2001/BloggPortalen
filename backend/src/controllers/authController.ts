import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Alla fält måste fyllas i' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Lösenordet måste vara minst 6 tecken' });
      return;
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(409).json({ message: 'E-post eller användarnamn används redan' });
      return;
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Okänt fel';
    res.status(500).json({ message: 'Något gick fel vid registrering', error: message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'E-post och lösenord krävs' });
      return;
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: 'Fel e-post eller lösenord' });
      return;
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Okänt fel';
    res.status(500).json({ message: 'Något gick fel vid inloggning', error: message });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, bio, avatar } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ message: 'Användaren hittades inte' });
      return;
    }

    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    const updated = await user.save();

    res.json({
      _id: updated._id,
      username: updated.username,
      email: updated.email,
      avatar: updated.avatar,
      bio: updated.bio,
      role: updated.role,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Okänt fel';
    res.status(500).json({ message: 'Kunde inte uppdatera profilen', error: message });
  }
};
