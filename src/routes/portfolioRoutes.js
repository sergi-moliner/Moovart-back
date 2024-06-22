import express from 'express';
import portfolioController from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/portfolios', portfolioController.getAllPortfolios);
router.get('/portfolios/:id', portfolioController.getPortfolioById);
router.get('/portfolios/artist/:artist_id', portfolioController.getPortfoliosByArtistId);
router.post('/portfolios', portfolioController.createPortfolio); 
router.put('/portfolios/:id', portfolioController.updatePortfolio); 
router.delete('/portfolios/:id', portfolioController.deletePortfolio);

export default router;
