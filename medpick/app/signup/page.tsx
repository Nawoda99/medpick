'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Auth, SignIn } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';




const FormSchema = z
//signup form validation
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
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const SignUpForm = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      address:'',
      zipcode:'',
      city:'',
      
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        address: values.address,
        zipcode: values.zipcode,
        city: values.city,
        password: values.password ,
        confirmPassword: values.confirmPassword
      })
    })
    if (response.ok) {
      alert("User Registered!")
      router.push('/auth')
    }
    else {
      console.error('Registration failed')
 }
};
  return (
    <Form {...form} >
  <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md mx-auto p-1 bg-transparent bg-slate-250 rounded-lg mt-10 shadow-md'>
    <div className='space-y-4'>
    <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder='Nawod'
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
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder='mail@example.com'
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
        name='address'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                placeholder='123 Main St'
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
        name='zipcode'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zip Code</FormLabel>
            <FormControl>
              <Input
                placeholder='12345'
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
        name='city'
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input
                placeholder='City'
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
      <FormField
        control={form.control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                type='password'
                placeholder='Re-Enter your password'
                {...field}
                className='w-full px-3 py-2 border rounded'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className='flex flex-col space-y-4'>
      <Button className='w-full mt-5 bg-blue-500 text-white p-3 rounded hover:bg-blue-600' type='submit'>
        Sign up
      </Button>
      <div className='mx-auto my-1 flex w-full items-center justify-evenly'>
        <div className='before:mr-4 before:block before:w-1/5 before:h-px before:bg-gray-400 after:ml-4 after:block after:w-1/5 after:h-px after:bg-gray-400'>
          or
        </div>
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
    <Link className='text-blue-500 hover:underline' href='/auth'>
      Sign in
    </Link>
</p>
</Form>


  );
};

export default SignUpForm;
