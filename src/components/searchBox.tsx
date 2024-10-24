import React, { useState, useEffect } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { ArrowUp } from 'lucide-react'
import { cn } from "../lib/utils";


export const SearchBox = ({
  sendMessage,
  loading
}: {
  sendMessage: (message: string) => void;
  loading: boolean
}) => {

    const [message, setMessage] = useState<string>('');
    const [textareaRows, setTextareaRows] = useState(1);
    const [mode, setMode] = useState<'multi' | 'single'>('single');

    useEffect(() => {
      if (textareaRows >= 2 && message && mode === 'single') {
        setMode('multi');
      } else if (!message && mode === 'multi') {
        setMode('single');
      }
    }, [textareaRows, mode, message]);



    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if(message && message.trim().length > 0) {
        sendMessage(message);
        setMessage('');
      }
    }

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-[70%]">
          <form
            onSubmit={(e) => {
              if (loading) return;
              e.preventDefault();
              handleSubmit(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className={cn(
              'bg-black dark:bg-black p-2 flex items-center overflow-hidden border border-borderColour1 dark:border-borderColour1',
              mode === 'multi' ? 'flex-col rounded-lg' : 'flex-row rounded-full'
            )}
          >
            <TextareaAutosize
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onHeightChange={(height, props) => {
                setTextareaRows(Math.ceil(height / props.rowHeight));
              }}
              className="transition bg-transparent placeholder:text-white placeholder:text-lg text-lg text-white dark:text-white resize-none focus:outline-none w-full px-4 max-h-24 lg:max-h-36 xl:max-h-48 flex-grow flex-shrink"
              placeholder="Ask anything"
            />
            <button
              disabled={message.trim().length === 0 || loading}
              className="bg-[linear-gradient(to_bottom,rgba(84,84,84,0.25)0%,rgba(186,186,186,0.25)100%)] text-white disabled:text-white hover:bg-white/20 transition duration-100 rounded-full p-2"
            >
              <ArrowUp size={20} />
            </button>
          </form>
        </div>
      );
}