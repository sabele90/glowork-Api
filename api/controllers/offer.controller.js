const Offer = require("../models/offer.model");
const Company = require("../models/company.model");
const Continent = require("../models/continent.model");

async function getAllOffer(req, res) {
  try {
    const offers = await Offer.findAll({
      include: [
        {
          model: Company,
          include: [
            {
              model: Continent,
            },
          ],
        },
      ],
    });

    return res.status(200).json(offers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneOffer(req, res) {
  try {
    const offer = await Offer.findByPk(req.params.offer_id);
    if (offer) {
      return res.status(200).json(offer);
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    res.status(200).send(error.message);
  }
}

async function createOffer(req, res) {
  try {
    const offer = await Offer.create(req.body);
    return res.status(200).json({
      message: "Offer created",
      offer: offer,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateOffer(req, res) {
  try {
    const [offerExist, offer] = await Offer.update(req.body, {
      returning: true,
      where: {
        id: req.params.offer_id,
      },
    });
    if (offerExist !== 0) {
      return res.status(200).json({
        message: "Offer updated",
        offer: offer,
      });
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteOffer(req, res) {
  try {
    const offer = await Offer.destroy({
      where: {
        id: req.params.offer_id,
      },
    });
    if (offer) {
      return res.status(200).json("Offer deleted");
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllOffer,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
};
