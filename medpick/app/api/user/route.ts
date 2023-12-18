import prisma from "../../libs/Prisma";
import { NextResponse } from "next/server";
import * as z from 'zod';

const userSchema = z
  .object({
    name: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    address: z.string().min(1, 'Address is required'),
    zipcode: z.string().min(1, 'Zipcode is required'),
    city: z.string().min(1, 'City is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
    
  })
  

export async function POST (req:Request){

        
    try{
        const body = await req.json();
    
        const {name,email, password,address,zipcode,city} = userSchema.parse(body);

        // check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: email}
           });

        if(existingUserByEmail){
           
            return NextResponse.json({user: existingUserByEmail, message: "User already exists with This Email"});
        }

        // check if name already exists
        const existingUserByName = await prisma.user.findUnique({
            where: {
                name: name}
           });
           if(existingUserByName)
           {
            return NextResponse.json({user: existingUserByName, message: "User already exists with This Name"});
           }

        // create user
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                address,
                zipcode,
                city
            }
        });
        const {password: pwd, ...rest} = newUser;
        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});
    }
    catch(e){
        return NextResponse.json({user:null, message: "Somthing went Wrong"}, {status: 500});
       
    }
}


