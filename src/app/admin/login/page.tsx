'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-sm">
      <h3 className="font-semibold text-lg mb-8">Login</h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          setError(null);

          const supabase = createClient();
          const { error } = await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password,
          });

          if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
          }

          router.refresh();
          router.push('/admin');
        }}
        className="flex flex-col gap-4"
      >
        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Input
              id="password"
              type={isVisible ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
              className="pr-10"
            />
            <button
              type="button"
              aria-label="toggle password visibility"
              onClick={() => setIsVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="mt-2 w-full h-9">
          {isLoading && <Loader2 size={14} className="animate-spin mr-2" />}
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Page;
