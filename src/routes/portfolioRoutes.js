import express from 'express';
import { getAllPortfolios, getPortfolioById, getPortfoliosByArtistId, createPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/portfolios', getAllPortfolios);
router.get('/portfolios/:id', getPortfolioById);
router.get('/portfolios/artist/:artist_id', getPortfoliosByArtistId);
router.post('/portfolios', createPortfolio); 
router.put('/portfolios/:id', updatePortfolio); 
router.delete('/portfolios/:id', deletePortfolio);

export default router;
