// utils/authUtils.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import  nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

import jwt from 'jsonwebtoken';



export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  try {
  
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false; 
    }

    return user.password === password;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error; 
  }
};


export const getUser = async (email: string) => {
  try {

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false; 
    }

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error; 
  }
};


export const getUserById = async (userid: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        userid: userid,
      },
      include: {
        categories: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error getting user by id:', error);
    throw error;
  }
};

export const validateToken = async (token:string) => {
  try {
    // Decode the token (without verifying the signature)
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken) {
   
      return false;
    }

    const verifiedToken = jwt.verify(token, 'secret'); 

    const exp=2132323
    console.log('the decoded token',decodedToken.payload) 
    // const { exp } = decodedToken.payload; // Extract the expiration time from the decoded token
    const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds

    if (exp && currentTime >= exp) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};
export const generateJwtToken = (user: any): string => {
  const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
  return token;
};





export const createUserAccount = async (userData) => {
  try {
   
    const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
    userData.otp = otp;
    userData.count = 50;
  
    userData.activated=false
  
    userData.userid = Math.floor(100000 + Math.random() * 900000).toString();
userData.categories = [
  { name: 'f28m7vi0', active: false },
  { name: '9wmaiao1', active: false },
  { name: '1pjds0vp', active: false },
  { name: 'vhmoryb6', active: false },
  { name: 'fcr6q6bc', active: false },
  { name: 'wemwrs53', active: false },
  { name: 'cyqo7swl', active: false },
  { name: '8azur2ge', active: false },
  { name: 'jy0n4p99', active: false },
  { name: 'uwrlg472', active: false },
  { name: 'ckm9tfq0', active: false },
  { name: 'locmh9zg', active: false },
  { name: 'w9ja2utz', active: false },
  { name: 't56icsdt', active: false },
  { name: 'fvrfmqq6', active: false },
  { name: 'kv1a1l0y', active: false },
  { name: '7iuigvuf', active: false },
  { name: '7dss1k19', active: false },
  { name: 'ig78kzxi', active: false },
  { name: '6qm9rf18', active: false },
  { name: '3r6n58o3', active: false },
  { name: 'z06klsix', active: false },
  { name: 'e7eq8w4k', active: false },
  { name: '9wqn88i2', active: false },
  { name: 'l9ykyti1', active: false },
  { name: 'kjtbnrtl', active: false },
  { name: 'q8dvs9n2', active: false },
  { name: 'fxmsd66a', active: false },
  { name: 'mxt7sl7c', active: false },
  { name: '7ymurkee', active: false },
  { name: 'uytetd3p', active: false },
  { name: '9ug0mnke', active: false },
  { name: 'ee5yewzu', active: false },
  { name: 'ao9fdccv', active: false },
  { name: '31kn0da1', active: false },
  { name: '9j0jf1gk', active: false },
  { name: '3e5derka', active: false },
  { name: 'qdc4ujcn', active: false },
  { name: 'zqoafwx0', active: false },
  { name: 'kr7ol96l', active: false },
  { name: 'u7v3b2lb', active: false },
  { name: 'ulfuj1mv', active: false },
  { name: 'bmuepkr2', active: false },
  { name: '1c59a0zq', active: false },
  { name: 'ch9b3hd6', active: false },
  { name: '9gzw24ve', active: false },
  { name: '0xptb39e', active: false },
  { name: 'sgagqw5c', active: false },
  { name: 'yi7907vk', active: false },
  { name: 'y2boba5w', active: false }
]

    const user = await prisma.users.create({
      data: {
        name: userData.name,
        userid: userData.userid,
        password: userData.password,
        activated: userData.activated,
        otp: userData.otp,
        count: userData.count,
        email:userData.email,
        categories: {
          create: userData.categories.map((category) => ({
            name: category.name,
            active: category.active,
          })),
        },
      },
      include: {
        categories: true,
      },
    });
  
    return user

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


export const verifyOTPFromDatabase = async (userid: string, otp: string): Promise<boolean> => {
  try {
    const user = await prisma.users.findFirst({
      where: { userid: { equals: userid } }, 
      select: { otp: true },
    });

    if (!user || !user.otp) {
      return false; 
    }

    return otp === user.otp;
  } catch (error) {
    console.error('Error verifying OTP from database:', error);
    throw error; 
  }
};
export const activateUser = async (userid: string) => {
  try {
    const useractivation = await prisma.users.update({
      where: { userid},
      data: { activated: true },
    });
    return useractivation
  } catch (error) {
    console.error('Error activating user:', error);
    throw error; 
  }
};


export const getUserFromDatabase = async (email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    throw error;
  }
};

export const fetchUserData=(userid: string)=>{
  const users = getUsersFromDatabase();
  const user = users.find(user => user.userid === userid);
  return user ; 
}
interface UserDataItem {
  name: string;
  active: boolean;
}

export const updateUserData = (userData: UserDataItem[], name: string, newValue: boolean): UserDataItem[] => {
  
  return userData.map(item => {
    if (item.name === name) {
      return { ...item, active: newValue };
    } else {
      return item;
    }
  });
};

const getUsersFromDatabase = (): any[] => {
  const filePath = path.resolve(__dirname, 'users.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } else {
    return [];
  }
};

