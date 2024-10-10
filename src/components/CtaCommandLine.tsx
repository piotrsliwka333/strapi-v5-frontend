'use client';

import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism } from 'react-syntax-highlighter';

interface CtaCommandLine {
  data: {
    id: string;
    title: string;
    language: string;
    commandLine: string;
  };
}

export default function CtaCommandLine({ data }: CtaCommandLine) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <section className="container mx-auto">
      <div className="w-full relative">
        <CopyToClipboard
          text={data.commandLine}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 3000);
          }}
        >
          <button
            disabled={copied}
            className="absolute right-4 top-4 z-50 text-white btn-primary shadow-xl shadow-textPrimary-500/40"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </CopyToClipboard>
        <Prism showLineNumbers language={data.language} style={materialOceanic}>
          {data.commandLine}
        </Prism>
      </div>
    </section>
  );
}
