const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
 
router.get('/', async function(req, res, next) {
    const movies = await prisma.movies.findMany({take: 10})
  res.send(movies);
});
 
module.exports = router;