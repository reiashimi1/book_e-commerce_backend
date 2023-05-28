import { RequestHandler } from 'express';
import User from '../models/User';
import Address from '../models/Address';

export const getUserAddresses: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (user) {
      return res
        .status(200)
        .json({ message: 'Success', data: { addresses: user.addresses || [] } });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

export const createAddress: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, description, zipCode, city, country } = req.body;
    await Address.create({ name, description, zipCode, city, country, userId });
    return res.status(200).send({
      message: 'Address created successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const updateAddress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, zipCode, city, country } = req.body;
    await Address.update({ name, description, zipCode, city, country }, { where: { id } });
    return res.status(200).send({
      message: 'Address updated successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const destroyAddress: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOne({ where: { id } });
    if (address) {
      await address.destroy();
      return res.status(200).json({ message: 'Address deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};
