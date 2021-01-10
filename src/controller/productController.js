const express = require("express");
const { User, Product } = require("../../models");
const { cloudinary } = require("../utils/cloudinary");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password", "address"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
      order: [["id", "DESC"]],
    });

    res.send({
      message: "Sukses load data",
      data: {
        products: products,
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

exports.getDetailProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "role", "password", "address"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    res.send({
      message: "Sukses load data",
      data: {
        products: products,
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

exports.addProduct = async (req, res) => {
  try {
    const { kode, name, price, stock, description } = req.body;

    console.log(req.body);

    const checkCode = await Product.findOne({
      where: {
        kode: req.body.kode,
      },
    });

    if (checkCode) {
      return res.status(400).send({
        error: "Kode produk sudah dipakai",
      });
    }

    const imageUpload = {
      image: `uploads/${req.file.originalname}`,
    };

    const resUploadImage = await cloudinary.uploader.upload(imageUpload.image);

    console.log(resUploadImage);

    const saveData = await Product.create({
      kode,
      name,
      price,
      stock,
      description,
      image: resUploadImage.secure_url,
      userId: req.user.id,
    });

    if (saveData) {
      const resDataProduct = await Product.findOne({
        where: {
          id: saveData.id,
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "role",
                "password",
                "address",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId", "UserId"],
        },
      });

      res.send({
        message: "Data berhasil disimpan",
        data: {
          product: resDataProduct,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, descrition } = req.body;

    const selectDataProduct = await Product.findOne({
      where: {
        id,
      },
    });

    if (selectDataProduct) {
      const updateProduct = await Product.update(
        {
          name,
          price,
          stock,
          descrition,
        },
        {
          where: {
            id,
          },
        }
      );

      if (updateProduct) {
        const resUpdateProduct = await Product.findOne({
          where: {
            id,
          },
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "createdAt",
                  "updatedAt",
                  "role",
                  "password",
                  "address",
                ],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "UserId"],
          },
        });

        res.send({
          message: "Data berhasil diupdate",
          data: {
            product: resUpdateProduct,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const productToDelete = await Product.findOne({
      where: {
        id,
      },
    });

    if (productToDelete) {
      await Product.destroy({
        where: {
          id,
        },
      });

      res.send({
        message: "Data berhasil dihapus",
        data: {
          deleteProduct: productToDelete,
        },
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server error",
      },
    });
  }
};
