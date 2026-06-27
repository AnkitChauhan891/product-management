const validator = require('validator');
// const redisClient = require("../utils/redis");
const dotenv = require("dotenv").config();
const AppError = require("../utils/AppError");
const productModel = require("../model/productModel");
const sanitizeText = require("../utils/sanitize");

const createProducts = async (req, res, next) => {
    let productDetail = req.body;
    productDetail.title = sanitizeText(productDetail.title);
    productDetail.description = sanitizeText(productDetail.description);

    if (productDetail.title == '' || productDetail.description == '' || productDetail.price < 0 || productDetail.stock< 0) {
        return next(new AppError(400, "VALIDATION_ERROR", "All details are required. And stock and price value is 0 or grater."))
    }

    const productExists = await productModel.exists({title: productDetail.title});

    if (productExists) {
        return next(new AppError(409, "PRODUCT_ALREADY_EXISTS", "Product already exists."));
    }

    const syncedProduct = await productModel.create(productDetail);
    
    res.status(200).json({
        status: true,
        data: syncedProduct
    });
}

const getProductById = async (req, res, next) => {
    const productId = req.params.product_id;

    const productDetails = await productModel.findById(productId);

    if (!productDetails) {
        return next(new AppError(404, "PRODUCT_NOT_FOUND", "Product not exists."));
    }
    
    res.status(200).json({
        status: true,
        data: productDetails,
    })
}

const updateProduct = async (req, res, next) => {
    let productDetail = req.body;
    const productId = req.params.product_id;
    productDetail.title = sanitizeText(productDetail.title);
    productDetail.description = sanitizeText(productDetail.description);

    if (productDetail.title == '' && productDetail.description == '' && productDetail.price < 0 && productDetail.stock < 0) {
        return next(new AppError(400, "VALIDATION_ERROR", "All details are required. And stock and price value is 0 or grater."))
    }

    const productExists = await productModel.findById(productId);

    if (!productExists) {
        return next(new AppError(404, "PRODUCT_NOT_FOUND", "Product not exists."));
    }

    const syncedProduct = await productModel.findByIdAndUpdate(productId, productDetail, {new: true});
    
    res.status(200).json({
        status: true,
        data: syncedProduct
    });
}

const deleteProductById = async (req, res, next) => {
    const productId = req.params.product_id;

    const productDetails = await productModel.findById(productId);

    if (!productDetails) {
        return next(new AppError(404, "PRODUCT_NOT_FOUND", "Product not exists."));
    }

    await productModel.findByIdAndDelete(productId);
    
    res.status(200).json({
        status: true,
        data: productDetails,
    })
}

const getProductDetails = async (req, res, next) => {
    let {page = 2, limit = 2} = req.query;

    const cacheKey = `page:${page}&limit:${limit}`;

    const cacheDetails = await redisClient.get(cacheKey);

    if (!cacheDetails) {
        const skipDocument = (page - 1) * limit;

        const productDetails = await productModel.find().sort({createdAt: 1}).skip(skipDocument).limit(limit);
        const totalProduct = await productModel.countDocuments();

        cacheDetails = {data: productDetails, total: totalProduct};

        await redisClient.set(cacheKey, JSON.stringify(cacheDetails), {EX: process.env.REDIS_EXPIRE_IN});
    }
    
    res.status(200).json({
        status: true,
        data: productDetails,
        meta: {
            page: page,
            limit: limit,
            total: totalProduct
        }
    })
}

const createImages = (req, res, next) => {
    console.log(req.files);

    res.json({
      success: true,
      files: req.files,
    });
}

module.exports = {createProducts, getProductById, updateProduct, deleteProductById, getProductDetails, createImages};