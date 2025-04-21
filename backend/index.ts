import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import contactRoutes from './src/routes/contact'
import newsletterRoutes from './src/routes/newsletter'
import blogRoutes from './src/routes/blog'
import eventRoutes from './src/routes/events'
import authRoutes from './src/routes/auth'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});
