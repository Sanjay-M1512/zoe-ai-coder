import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, isLoading }) => {
  // Simple code block detection and rendering
  const renderContent = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>
        );
      }

      // Add code block
      const language = match[1] || 'code';
      const code = match[2].trim();
      parts.push(
        <div key={match.index} className="my-3">
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 rounded-t-lg border-b border-glass-border/30">
            <span className="text-xs text-muted-foreground font-mono">{language}</span>
          </div>
          <pre className="code-block rounded-t-none">
            <code className="text-sm text-foreground/90">{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shadow-glow">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'glass-strong ml-auto'
              : 'bg-secondary/30'
          }`}
        >
          {isLoading ? (
            <div className="typing-indicator flex gap-1 py-2 px-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {renderContent(content)}
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
