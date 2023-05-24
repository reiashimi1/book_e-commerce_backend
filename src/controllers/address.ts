import { RequestHandler } from 'express';
import User from '../models/User';
import Address from '../models/Address';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (user) {
      return res.status(200).json({ message: 'Success', data: { addresses: user.addresses } });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

export const createAddress: RequestHandler = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).send();
  }
};

export const destroyAddress: RequestHandler = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const address = await Address.findOne({ where: { id: addressId, userId: id } });
    if (address) {
      return res.status(200).json({ message: 'Address deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Address not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};
