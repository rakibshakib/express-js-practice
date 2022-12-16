const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express()

// middle ware
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}))
