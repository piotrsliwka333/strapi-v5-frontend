'use client';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center relative">
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
      <p className="invisible">{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  loading?: boolean;
}

export function SubmitButton({ text, loadingText, loading }: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className="btn-primary"
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}
