"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth, SignIn } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});




const SignInForm = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const getData = async () => {
  const res = await fetch('/api/user')
    
  
}

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
  };

  return (
    <div id="AuthPage" className="w-full min-h-screen bg-white">
    <div className="w-full flex justify-center items-center p-5 border-b-gray-300">
                <Link href="/" className="min-w-[170px]">
                    <img width="120px" src="/images/logo.png"/>
                </Link>
            </div>
            <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
    <div className='space-y-4'>
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input
                placeholder='User Name'
                {...field}
                className='w-full px-3 py-2 border rounded'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type='password'
                placeholder='Enter your password'
                {...field}
                className='w-full px-3 py-2 border rounded'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <Button  className='w-full mt-6 bg-blue-500 text-white p-3 rounded hover:bg-blue-600' type='submit'>
      Sign in
    </Button>
    <div className='mx-auto my-1 flex w-full items-center justify-evenly'>
        <div className='before:mr-4 before:block before:w-1/5 before:h-px before:bg-gray-400 after:ml-4 after:block after:w-1/5 after:h-px after:bg-gray-400'>
          or
        </div>
      </div>

    <div className="max-w-[400px] mx-auto px-2">
                <Auth
                    onlyThirdPartyProviders
                    redirectTo={`${window.location.origin}/auth/callback`}
                    supabaseClient={supabase}
                    providers={['google']}
                    appearance={{theme: ThemeSupa}}
                    theme="dark"
                />
            </div>
  </form>
  

  
  <p className='text-center text-sm text-gray-600 mt-2'>
    If you don&apos;t have an account, please&nbsp;
    <Link className='text-blue-500 hover:underline' href='/signup'>
      Sign up
    </Link>
  </p>

</Form>

    </div>
  );
};

export default SignInForm;
