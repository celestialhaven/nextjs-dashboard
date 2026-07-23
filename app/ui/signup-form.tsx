'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { createAccount, type SignupState } from '@/app/lib/actions';
import { lusitana } from '@/app/ui/font';
import { Button } from '@/app/ui/button';

const initialState: SignupState = {};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    createAccount,
    initialState,
  );

  const fields = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      icon: UserIcon,
      errors: state.errors?.name,
      autoComplete: 'name',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email address',
      icon: AtSymbolIcon,
      errors: state.errors?.email,
      autoComplete: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'At least 6 characters',
      icon: KeyIcon,
      errors: state.errors?.password,
      autoComplete: 'new-password',
    },
    {
      id: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      placeholder: 'Enter the password again',
      icon: KeyIcon,
      errors: state.errors?.confirmPassword,
      autoComplete: 'new-password',
    },
  ];

  return (
    <form action={formAction} className="space-y-3">
      <div className="rounded-lg bg-gray-50 px-6 pb-6 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create your account
        </h1>
        {fields.map((field) => {
          const Icon = field.icon;
          const errorId = `${field.id}-error`;
          return (
            <div className="mt-4" key={field.id}>
              <label
                className="mb-2 block text-xs font-medium text-gray-900"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <div className="relative">
                <input
                  aria-describedby={field.errors ? errorId : undefined}
                  aria-invalid={field.errors ? true : undefined}
                  autoComplete={field.autoComplete}
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id={field.id}
                  minLength={field.type === 'password' ? 6 : undefined}
                  name={field.id}
                  placeholder={field.placeholder}
                  required
                  type={field.type}
                />
                <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
              {field.errors?.map((error) => (
                <p className="mt-1 text-xs text-red-500" id={errorId} key={error}>
                  {error}
                </p>
              ))}
            </div>
          );
        })}
        <Button className="mt-6 w-full" disabled={isPending}>
          {isPending ? 'Creating account…' : 'Create account'}
          <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div className="flex min-h-8 items-end gap-1" aria-live="polite">
          {state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="font-medium text-blue-600 hover:underline" href="/login">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
