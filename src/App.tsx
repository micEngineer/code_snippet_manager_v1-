import React, { useState } from 'react';
import { Plus, Search, Code2 } from 'lucide-react';
import { CodeSnippet } from './types';
import { SnippetCard } from './components/SnippetCard';
import { SnippetForm } from './components/SnippetForm';

const sampleSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'React useState Hook Example',
    description: 'A simple counter implementation using React useState hook',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    language: 'TypeScript',
    tags: ['React', 'Hooks', 'Frontend'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  },
  {
    id: '2',
    title: 'Python List Comprehension',
    description: 'Example of list comprehension in Python for filtering even numbers',
    code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [x for x in numbers if x % 2 == 0]
print(even_numbers)  # Output: [2, 4, 6, 8, 10]`,
    language: 'Python',
    tags: ['Python', 'Lists', 'Comprehension'],
    createdAt: new Date('2024-03-11'),
    updatedAt: new Date('2024-03-11')
  },
  {
    id: '3',
    title: 'Async/Await Example',
    description: 'Fetching data using async/await in JavaScript',
    code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(
      \`https://api.example.com/users/\${userId}\`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}`,
    language: 'JavaScript',
    tags: ['JavaScript', 'Async', 'API'],
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-03-12')
  }
];

function App() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(sampleSnippets);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddSnippet = (
    snippetData: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newSnippet: CodeSnippet = {
      ...snippetData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSnippets([newSnippet, ...snippets]);
    setShowForm(false);
  };

  const handleEditSnippet = (
    snippetData: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingSnippet) {
      const updatedSnippets = snippets.map((snippet) =>
        snippet.id === editingSnippet.id
          ? {
              ...snippet,
              ...snippetData,
              updatedAt: new Date(),
            }
          : snippet
      );
      setSnippets(updatedSnippets);
      setEditingSnippet(undefined);
    }
  };

  const handleDeleteSnippet = (id: string) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      setSnippets(snippets.filter((snippet) => snippet.id !== id));
    }
  };

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Code Snippet Manager</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Snippet
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={(snippet) => {
                setEditingSnippet(snippet);
              }}
              onDelete={handleDeleteSnippet}
            />
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center py-12">
            <Code2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No snippets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new code snippet.
            </p>
          </div>
        )}
      </main>

      {(showForm || editingSnippet) && (
        <SnippetForm
          snippet={editingSnippet}
          onSubmit={editingSnippet ? handleEditSnippet : handleAddSnippet}
          onClose={() => {
            setShowForm(false);
            setEditingSnippet(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;