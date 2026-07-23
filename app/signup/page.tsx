import AcmeLogo from '@/app/ui/acme-logo';
import SignupForm from '@/app/ui/signup-form';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[440px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-32">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
