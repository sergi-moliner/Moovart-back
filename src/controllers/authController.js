import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { serialize } from 'cookie';
import User from '../models/userModel.js';
import Artist from '../models/artistModel.js';
import Local from '../models/localModel.js';
import RecoveryToken from '../models/recoveryTokenModel.js';
import sendEmail from "../utils/email/sendEmail.js";
import { esPar, contraseniasCoinciden } from '../utils/utils.js';

const clientURL = process.env.CLIENT_URL;

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, city, user_type } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        code: -2,
        message: 'Ya existe un usuario con el mismo correo electrónico'
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    const newUser = await User.create({ email, password: hashedPassword, name, city, user_type });

    // Crear registro correspondiente en Artists o Locals
    if (user_type === 'artist') {
      await Artist.create({ user_id: newUser.id_user });
    } else if (user_type === 'local') {
      await Local.create({ user_id: newUser.id_user });
    }

    const accessToken = jwt.sign({ id_user: newUser.id_user, name: newUser.name }, process.env.JWT_SECRET);
    const token = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', token);

    res.status(200).json({
      code: 1,
      message: 'Usuario registrado correctamente',
      data: {
        user: {
          id: newUser.id_user,
          name: newUser.name,
          email: newUser.email,
          city: newUser.city,
          user_type: newUser.user_type
        },
        accessToken: accessToken
      }
    });
  } catch (error) {
    console.error('Error en el registro de usuario:', error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al registrar el usuario',
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (user.user_type === 'artist') {
      const artistProfile = await Artist.findOne({ where: { user_id: user.id_user } });
      res.status(200).json({ ...user.toJSON(), artist: artistProfile });
    } else if (user.user_type === 'local') {
      const localProfile = await Local.findOne({ where: { user_id: user.id_user } });
      res.status(200).json({ ...user.toJSON(), local: localProfile });
    } else {
      res.status(400).json({ message: 'Invalid user type' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        code: -25,
        message: 'user No exist'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        code: -5,
        message: 'Credenciales incorrectas'
      });
    }

    const accessToken = jwt.sign({ id_user: user.id, name: user.name }, process.env.JWT_SECRET);
    const token = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', token);

    res.status(200).json({
      code: 1,
      message: 'Login OK',
      data: {
        user: {
          name: user.name,
          email: user.email,
          city: user.city,
          user_type: user.user_type
        },
        token: accessToken // Eliminar después de las pruebas
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al iniciar sesión',
      error: error
    });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        code: -8,
        message: 'Email does not exist'
      });
    }

    let resetToken = crypto.randomBytes(32).toString("hex");

    await new RecoveryToken({
      user_id: user.id,
      token: resetToken,
      created_at: Date.now(),
    }).save();

    const link = `${clietURL}/change-password?token=${resetToken}&id=${user.id_user}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      {
        name: user.name,
        link: link,
      },
      "email/template/requestResetPassword.handlebars"
    ).then(response => {
      console.log("Resultado del envío del correo:", response);
      res.status(200).json({
        code: 100,
        message: 'Send Email OK',
        data: {
          token: resetToken,
          link: link
        }
      });

    },error => {
      console.error (error)
      res.status(200).json({
        code: -80,
        message: 'Send Email KO',
        data: {error}
      });
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el usuario',
      error: error
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    let token_row = await RecoveryToken.findOne({ where: { token } });
    if (!token_row) {
      return res.status(404).json({
        code: -3,
        message: 'Token Incorrecto'
      });
    } 
    
    const user = await User.findOne({ where: { id_user: token_row.user_id } });
    if (!user) {
      return res.status(404).json({
        code: -10,
        message: 'Usuario no encontrado'
      });
    }

    // Actualizar la contraseña del usuario
    user.password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
    await user.save();
    //Elimino el token
    await RecoveryToken.destroy({
      where: {
        user_id: token_row.user_id
      }
    })

    // Generar un token de acceso y lo guardo en un token seguro (httpOnly)
    const accessToken = jwt.sign({ id_user: user.id_user, name: user.name }, process.env.JWT_SECRET);
    const token_jwt = serialize('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    res.setHeader('Set-Cookie', token_jwt);

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User Detail',
      data: {
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email
        } 
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el usuario',
      error: error
    });
  }
};

export const logout = async (req, res) => {

  const { cookies } = req;
  const jwt = cookies.token;

  const token = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', token);
  res.status(200).json({
    code: 0,
    message: 'Logged out - Delete Token',
  });
}