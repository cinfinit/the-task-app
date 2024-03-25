//@ts-nocheck
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from 'zod';
import { getUserById} from "../authUtils";
import {  PrismaClient } from '@prisma/client';


export const dataRouter = createTRPCRouter({
  updateData: publicProcedure
  .input(z.object({
    checkvalue: z.boolean(),
    userid: z.string(),
    name: z.string()
  }))
  .mutation(async ({ ctx, input }) => {

    try {
      const { checkvalue, userid, name } = input;
const prisma = new PrismaClient();
      
      const userData = await prisma.users.findUnique({
        where: {
          userid: userid,
        },
        include: {
          categories: true,
        },
      });

      if (!userData) {
        throw new Error('User not found');
      }

      const updatedCategories = userData.categories.map(category => {
        if (category.name === name) {
          return { ...category, active: checkvalue };
        }
        return category;
      });

      await prisma.users.update({
        where: {
          userid: userid,
        },
        data: {
          categories: {
            updateMany: updatedCategories.map(updatedCategory => ({
              where: { name: updatedCategory.name },
              data: { active: updatedCategory.active },
            })),
          },
        },
      });

      return { updated: true };
    } catch (error) {
      console.error('Failed to update data:', error);
      throw new Error('Failed to update data');
    }
  }),

    getData: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        userid: z.string() || z.number,
   
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { userid , page } = input;

      
        const userData = await getUserById(userid);
      
        let pageId = page?page:1
      
        const categoriesPerPage = 6; 
        const startIndex = (pageId - 1) * categoriesPerPage;
        const endIndex = startIndex + categoriesPerPage;
        const categories = userData.categories.slice(startIndex, endIndex);

        const totalCategories = userData.categories.length;

        return { categories,totalCategories };
      } catch (error) {
        throw new Error('Failed to fetch data: ');
      }
    }),
});
