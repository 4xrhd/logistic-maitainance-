import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

// Get all inventory items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
});

// Create item
router.post('/', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const { id, name, category, quantity, unit, minStock, location, supplier } = req.body;
    const item = await prisma.inventoryItem.create({
      data: {
        id,
        name,
        category,
        quantity: parseInt(quantity),
        unit,
        minStock: parseInt(minStock),
        location,
        supplier
      }
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory item', error });
  }
});

// Update item (restock/adjust)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const item = await prisma.inventoryItem.update({
      where: { id },
      data: { quantity: parseInt(quantity), lastRestocked: new Date() }
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating inventory', error });
  }
});

export default router;
