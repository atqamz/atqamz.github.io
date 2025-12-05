'use client';

import { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Plus, Save, LogOut, Loader2 } from 'lucide-react';

interface Link {
  url: string;
  filename: string;
  type?: 'shell' | 'redirect';
}

interface GitHubFile {
  sha: string;
  content: string;
}

const REPO_OWNER = 'atqamz';
const REPO_NAME = 'atqamz.github.io';
const FILE_PATH = 'data/links.json';
const BRANCH = 'main';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ShortenerPage() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);
  const [fileSha, setFileSha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // New link form state
  const [newFilename, setNewFilename] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'redirect' | 'shell'>('redirect');

  useEffect(() => {
    const storedToken = localStorage.getItem('github_pat');
    if (storedToken) {
      setToken(storedToken);
      fetchLinks(storedToken);
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem('github_pat', token);
      setIsCheckingAuth(true);
      fetchLinks(token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_pat');
    setToken('');
    setIsAuthenticated(false);
    setLinks([]);
  };

  const fetchLinks = async (authToken: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
          throw new Error('Invalid token. Please login again.');
        }
        throw new Error(`Failed to fetch links: ${res.statusText}`);
      }

      const data: GitHubFile = await res.json();
      setFileSha(data.sha);
      
      const content = atob(data.content);
      const parsedLinks = JSON.parse(content);
      setLinks(parsedLinks);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
      if (err.message !== 'Invalid token. Please login again.') {
        setIsAuthenticated(true);
      }
    } finally {
      setLoading(false);
      setIsCheckingAuth(false);
    }
  };

  const saveLinksToGithub = async (updatedLinks: Link[]) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const content = JSON.stringify(updatedLinks, null, 2);
      const contentEncoded = btoa(content);

      const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'chore: update shortlinks via web UI',
          content: contentEncoded,
          sha: fileSha,
          branch: BRANCH,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to save: ${res.statusText}`);
      }

      const data = await res.json();
      setFileSha(data.content.sha);
      setLinks(updatedLinks);
      setSuccess('Links updated successfully! The site will rebuild shortly.');
      
      // Reset form
      setNewFilename('');
      setNewUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFilename || !newUrl) return;

    // Basic validation
    if (links.some(l => l.filename === newFilename)) {
      setError(`Link "${newFilename}" already exists.`);
      return;
    }

    const updatedLinks = [...links, { filename: newFilename, url: newUrl, type: newType }];
    saveLinksToGithub(updatedLinks);
  };

  const handleDeleteLink = (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;
    const updatedLinks = links.filter(l => l.filename !== filename);
    saveLinksToGithub(updatedLinks);
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center p-4 h-full min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center p-4 h-full">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-6">
            <GithubIcon className="w-12 h-12 text-gray-800 dark:text-gray-200" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 dark:text-white">Link Manager</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Enter your GitHub Personal Access Token to manage links.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Personal Access Token</label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ghp_..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Token requires <code>repo</code> scope.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Link Manager</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-6 border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-md mb-6 border border-green-200 dark:border-green-800">
            {success}
          </div>
        )}

        {/* Add New Link Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Plus className="w-5 h-5" /> Add New Link
          </h2>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Name</label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">/</span>
                  <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="my-link"
                    required
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination URL</label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={newType === 'redirect'}
                    onChange={() => setNewType('redirect')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Web Redirect</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    checked={newType === 'shell'}
                    onChange={() => setNewType('shell')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Shell Script (curl | bash)</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Link
              </button>
            </div>
          </form>
        </div>

        {/* Links List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Active Links ({links.length})</h2>
          </div>
          
          {loading && links.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading links...</div>
          ) : links.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">No links found. Create one above!</div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {links.map((link) => (
                <div key={link.filename} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between group">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-blue-600 dark:text-blue-400 text-lg">/{link.filename}</span>
                      {link.type === 'shell' && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-mono">shell</span>
                      )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm truncate flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {link.url}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDeleteLink(link.filename)}
                      disabled={loading}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
