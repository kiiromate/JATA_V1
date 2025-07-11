const express = require('express');
const serverless = require('serverless-http');
const { PrismaClient } = require('../../generated/prisma');
const { body, validationResult } = require('express-validator');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/applications',
  [body('jobTitle').notEmpty().withMessage('Job title is required'),
   body('company').notEmpty().withMessage('Company is required'),
   body('sourceUrl').optional().isURL().withMessage('Source URL must be a valid URL')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { jobTitle, company, description, sourceUrl, status, industry } = req.body;

    try {
      const newApplication = await prisma.application.create({
        data: {
          jobTitle,
          company,
          description,
          sourceUrl,
          status,
          industry,
        },
      });
      res.status(201).json(newApplication);
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.get('/applications', async (req, res) => {
  try {
    const applications = await prisma.application.findMany();
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const application = await prisma.application.findUnique({
      where: { id },
    });
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/applications/:id',
  [
    body('jobTitle').optional().notEmpty().withMessage('Job title cannot be empty'),
    body('company').optional().notEmpty().withMessage('Company cannot be empty'),
    body('sourceUrl').optional().isURL().withMessage('Source URL must be a valid URL'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { jobTitle, company, description, sourceUrl, status, industry } = req.body;

    try {
      const updatedApplication = await prisma.application.update({
        where: { id },
        data: {
          jobTitle,
          company,
          description,
          sourceUrl,
          status,
          industry,
        },
      });
      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

app.delete('/applications/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.application.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports.handler = serverless(app);
