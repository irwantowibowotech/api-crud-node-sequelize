const express = require("express");
const { User } = require("../../models");

//enkripsi menggunakan bcrypt
const bcrypt = require("bcrypt");

//generate token
const jwt = require("jsonwebtoken");

//key untuk dekripsi
const jwtKey = process.env.JWT_KEY;

//Method Register
exports.register = async (req, res) => {
  try {
    const { name, address, email, password } = req.body;

    //cek apakah email sudah ada di database
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    //jika email sudah ada
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email sudah terdaftar",
        },
      });
    }

    const saltStrength = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltStrength);

    const user = await User.create({
      name,
      address,
      email,
      password: hashedPassword,
      role: "user",
    });

    //buat token setelah berhasil register
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //kirim response dan token yang sudah digenerate
    res.send({
      message: "Register sukses",
      data: {
        user: {
          name: user.name,
          address: user.address,
          email: user.email,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

//Method loin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek email di database
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //jika tidak ada email di database
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Internal server error",
        },
      });
    }

    //Lolos validasi
    // compare password
    const validPassword = await bcrypt.compare(password, user.password);

    // jika tidak valid
    if (!validPassword) {
      res.status(400).send({
        error: {
          message: "Email or password salah",
        },
      });
    }

    //jika valid
    const token = jwt.sign(
      {
        id: user.id,
      },
      jwtKey
    );

    //kirim response
    res.send({
      message: "Login successfully",
      data: {
        user: {
          name: user.name,
          address: user.address,
          email: user.email,
          role: user.role,
          token: token,
        },
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Internal server error",
      },
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "User valid",
      data: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const resUsers = await User.findAll();

    res.send({
      message: "Data berhasil diload",
      data: {
        user: resUsers,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};
