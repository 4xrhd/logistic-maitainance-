import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all requisitions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const requisitions = await prisma.requisition.findMany({
      include: { requestedBy: { select: { name: true, email: true } } }
    });
    res.json(requisitions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requisitions', error });
  }
});

// Create requisition
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id, item, category, quantity, unit, estimatedCost } = req.body;
    const requisition = await prisma.requisition.create({
      data: {
        id,
        item,
        category,
        quantity: parseInt(quantity),
        unit,
        estimatedCost,
        requestedById: req.user!.id,
        status: 'Pending'
      }
    });
    res.status(201).json(requisition);
  } catch (error) {
    res.status(500).json({ message: 'Error creating requisition', error });
  }
});

// Update status
router.put('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const requisition = await prisma.requisition.update({
      where: { id },
      data: { status }
    });
    res.json(requisition);
  } catch (error) {
    res.status(500).json({ message: 'Error updating requisition', error });
  }
});

export default router;
