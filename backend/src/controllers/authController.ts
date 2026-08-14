import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import fs from 'fs';
import path from 'path';

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

// Uppdatera profilen, inklusive avatar
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, bio } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      if (req.file) {
        const newImagePath = path.join(
          process.cwd(),
          "src",
          "uploads",
          "avatars",
          req.file.filename
        );

        if (fs.existsSync(newImagePath)) {
          fs.unlinkSync(newImagePath);
        }
      }

      res.status(404).json({
        message: "Användaren hittades inte"
      });
      return;
    }

    if (username) {
      user.username = username;
    }

    if (bio !== undefined) {
      user.bio = bio;
    }

    if (req.file) {
      // Ta bort den gamla profilbilden
      if (user.avatar) {
        const oldAvatarPath = path.join(
          process.cwd(),
          "src",
          user.avatar.replace(/^\/+/, "")
        );

        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      user.avatar = `/uploads/avatars/${req.file.filename}`;
    }

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
    if (req.file) {
      const newImagePath = path.join(
        process.cwd(),
        "src",
        "uploads",
        "avatars",
        req.file.filename
      );

      if (fs.existsSync(newImagePath)) {
        fs.unlinkSync(newImagePath);
      }
    }

    const message = error instanceof Error ? error.message : "Okänt fel";

    res.status(500).json({
      message: "Kunde inte uppdatera profilen",
      error: message,
    });
  }
};

// Ta bort profilbild
export const removeProfilePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      res.status(404).json({
        message: "Användaren hittades inte"
      });
      return;
    }

    if (user.avatar) {
      const avatarPath = path.join(
        process.cwd(),
        "src",
        user.avatar.replace(/^\/+/, "")
      );

      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    user.avatar = "";

    const updated = await user.save();

    res.status(200).json({
      _id: updated._id,
      username: updated.username,
      email: updated.email,
      avatar: updated.avatar,
      bio: updated.bio,
      role: updated.role,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Okänt fel";

    res.status(500).json({
      message: "Kunde inte ta bort profilbilden",
      error: message,
    });
  }
};
