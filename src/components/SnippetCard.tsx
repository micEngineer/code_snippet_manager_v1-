import React from 'react';
import { Clock, Tag, Code2, Pencil, Trash2 } from 'lucide-react';
import { CodeSnippet } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface SnippetCardProps {
  snippet: CodeSnippet;
  onEdit: (snippet: CodeSnippet) => void;
  onDelete: (id: string) => void;
}

export function SnippetCard({ snippet, onEdit, onDelete }: SnippetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{snippet.title}</h3>
            <p className="text-gray-600 mb-4">{snippet.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(snippet)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => onDelete(snippet.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
            <div className="flex items-center space-x-2">
              <Code2 size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">{snippet.language}</span>
            </div>
          </div>
          <SyntaxHighlighter
            language={snippet.language.toLowerCase()}
            style={atomOneDark}
            customStyle={{ margin: 0, padding: '1rem' }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={16} />
              <div className="flex gap-2">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}