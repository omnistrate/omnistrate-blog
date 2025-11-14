"use client";

import { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type CodeBlockProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, ...props }) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;
    const textToCopy = preRef.current.textContent || '';

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <Button
        onClick={handleCopy}
        variant="ghost"
        size="icon-sm"
        className="cursor-pointer absolute top-2 right-2 bg-gray-700 text-white"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
};
