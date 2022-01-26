const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
 
router.get('/', async function(req, res, next) {
    const take = parseInt( req.query.limit ) ? parseInt( req.query.limit ): 10;
    const skip = parseInt( req.query.offset )? parseInt( req.query.offset ) : 0;
    const movies = await prisma.movies.findMany({take, skip: skip*take})
    const total = await prisma.movies.count();
    res.send({
        data: movies,
        pagination : {
            count : total, // Total des enregistrements
            take: take,   // Nombre d'éléments sélectionnés
            skip: skip   // Décalage à partir duquel on prend les  données
        }
    });  
});
 
module.exports = router;