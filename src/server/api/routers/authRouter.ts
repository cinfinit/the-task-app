//@ts-nocheck
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from 'zod';
import { activateUser, authenticateUser, createUserAccount, generateJwtToken, getUser, getUserFromDatabase, verifyOTPFromDatabase } from "../authUtils";


export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, password } = input;
        const userAuthenticated = await authenticateUser(email, password);

        if (!userAuthenticated) {
          throw new Error('Invalid email or password');
        }

        const token = generateJwtToken(userAuthenticated);
        const user = await getUser(email)
        const userid  = user.userid 
        
        if(!user.activated)throw new Error('Your account is not activated yet ! ' );

        return { token , email , userid};
        // return { message: 'Signup successful' };

      } catch (error) {
        throw new Error('Failed to login: ' );
      }
    }),
  signup: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { name, email, password } = input;
        const newUser = await createUserAccount({ name, email, password });
        const userOtp = newUser.otp
        const userid = newUser.userid
          return { message: 'Signup successful',email,userOtp,userid };
       
      
      } catch (error) {
        
        throw new Error('Failed to signup: ');
        
      }
    }),

  verifyOTP: publicProcedure
    .input(z.object({

      userid: z.string(),
      otp: z.string().length(8),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { userid, otp } = input;
        const isCorrectOTP = await verifyOTPFromDatabase(userid, otp);

        if (!isCorrectOTP) {
          throw new Error('Incorrect OTP');
        }
        if(isCorrectOTP){
          const userActivation = await activateUser(userid)
          
          if(userActivation){
            return { message: 'OTP verification successful',userActivation: userActivation.activated };
          }
        }
      } catch (error) {
        throw new Error('Failed to verify OTP: ');
      }
    }),
});
