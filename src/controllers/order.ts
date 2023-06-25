import { RequestHandler } from 'express';
import User from '../models/User';
import Order from '../models/Order';
import Address from '../models/Address';
import Book from '../models/Book';

export const getUserOrders: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Order,
          include: [Address, Book]
        }
      ]
    });

    if (user) {
      const orderDetails = user.orders?.map((order) => ({
        ...order.dataValues,
        address: order.address,
        book: order.book
      }));

      return res.status(200).json({ message: 'Success', data: { orders: orderDetails || [] } });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

export const getAll: RequestHandler = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [User, Book, Address] });
    return res.status(200).json({ message: 'Success', data: { orders: orders || [] } });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({ message: 'User does not exist' });
    }
    const { bookId, addressId } = req.body;
    await Order.create({ userId, bookId, addressId });
    return res.status(200).send({
      message: 'Order created successfully'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookPrice, shippingCost, status } = req.body;
    const totalAmount = bookPrice + shippingCost;
    await Order.update({ totalAmount, shippingCost, status }, { where: { id } });
    return res.status(200).send({
      message: 'Order status updated successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const destroyOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (order) {
      await order.destroy();
      return res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};
