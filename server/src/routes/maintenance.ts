import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

// Get all maintenance requests
router.get('/', authenticateToken, async (req, res) => {
  try {
    const requests = await prisma.maintenanceRequest.findMany({
      include: { equipment: true, assignedTo: { select: { name: true, email: true } } }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
});

// Create request
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { id, equipmentId, type, priority, description, dueDate, assignedToId } = req.body;
    const request = await prisma.maintenanceRequest.create({
      data: {
        id,
        equipmentId,
        type,
        priority,
        description,
        dueDate: new Date(dueDate),
        assignedToId: assignedToId ? parseInt(assignedToId) : null,
        status: 'Pending'
      }
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error creating request', error });
  }
});

// Update status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id as string;
    const { status, remarks } = req.body;
    const request = await prisma.maintenanceRequest.update({
      where: { id },
      data: { status }
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request', error });
  }
});

// Delete request
router.delete('/:id', authenticateToken, authorizeRole(['ADMIN']), async (req, res) => {
  try {
    const id = req.params.id as string;
    await prisma.maintenanceRequest.delete({ where: { id } });
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting request', error });
  }
});

export default router;
