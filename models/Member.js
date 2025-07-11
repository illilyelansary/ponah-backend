const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateCreation: String,
  accordCadre: String,
  adresse: String,
  responsable: String,
  fonction: String,
  telephone: String,
  email: String,
  zoneIntervention: String,
  recent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Member', memberSchema);