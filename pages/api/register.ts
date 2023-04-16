import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { name, email, password } = req.body;        
        const hashedPassword = await bcrypt.hash(password, 12);

        const userExists = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }          

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        return res.status(200).json(user);
        
    } catch (error) {

        console.log(error);
        res.status(400).json({ 
            error: error, 
        });

        return res.status(400).end();
    }
}
