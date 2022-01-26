const express = require('express');
const router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
 
router.get('/', async function(req, res, next) {
    const take = parseInt( req.params.limit ) ? parseInt( req.params.limit ): 10;
    const skip = parseInt( req.params.offset )? parseInt( req.params.offset ) : 0;
    const movies = await prisma.movies.findMany({take, skip})
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