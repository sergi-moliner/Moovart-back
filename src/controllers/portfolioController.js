import Portfolio from '../models/portfolioModel.js';

export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (portfolio) {
      res.json(portfolio);
    } else {
      res.status(404).send({ message: 'Portfolio not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPortfoliosByArtistId = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const portfolios = await Portfolio.findAll({ where: { artist_id } });
    res.json(portfolios);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createPortfolio = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    const { artist_id, type } = req.body;
    const url = req.file.path; 

    const newPortfolio = await Portfolio.create({ artist_id, url, type });
    res.status(201).send({ id: newPortfolio.id });
  } catch (err) {
    res.status(500).send({ message: `Could not upload the file: ${err}` });
  }
};

export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    await uploadFileMiddleware(req, res);

    const { artist_id, type } = req.body;
    const url = req.file ? req.file.path : req.body.url; 

    const result = await Portfolio.update({ artist_id, url, type }, { where: { id } });
    if (result[0] === 0) {
      res.status(404).send({ message: 'Portfolio not found' });
    } else {
      res.status(200).send({ message: 'Portfolio updated successfully' });
    }
  } catch (err) {
    res.status(500).send({ message: `Could not upload the file: ${err}` });
  }
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Portfolio.destroy({ where: { id } });
    if (result === 0) {
      res.status(404).send({ message: 'Portfolio not found' });
    } else {
      res.status(200).send({ message: 'Portfolio deleted successfully' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
