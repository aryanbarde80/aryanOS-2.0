"use client";
import { useState, useEffect } from 'react';
import OSWindow from "./OSWindow";
import { Github, GitFork, Star, Users, BookOpen, ExternalLink } from "lucide-react";

export default function GitHubStatsNode() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/aryanbarde80")
      .then(r => r.json())
      .then(data => setProfile(data))
      .catch(() => {});

    fetch("https://api.github.com/users/aryanbarde80/repos?sort=pushed&per_page=6")
      .then(r => r.json())
      .then(data => setRepos(Array.isArray(data) ? data.filter(r => !r.fork && r.name !== 'demo-portfolio' && r.name !== 'aryanbarde80') : []))
      .catch(() => {});
  }, []);

  if (!profile) return null;

  return (
    <OSWindow title="NETWORK/GITHUB.SYS" icon={<Github size={16} className="text-[#00f0ff] animate-pulse" />} width="max-w-5xl">
      <div className="space-y-6">
        {/* Profile Stats */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-[#00f0ff]/20 bg-[#030712]/60 rounded-lg">
          <img 
            src={profile.avatar_url} 
            alt="GitHub Avatar" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">{profile.name || profile.login}</h3>
            <p className="text-xs text-gray-400 mono mt-1 italic">&quot;{profile.bio}&quot;</p>
            <p className="text-[10px] text-[#ff003c] mono mt-1">{profile.company}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 border border-[#00f0ff]/20 rounded hover:border-[#00f0ff]/50 transition-colors">
              <p className="text-lg font-bold text-[#00f0ff]">{profile.public_repos}</p>
              <p className="text-[9px] mono text-gray-500">REPOS</p>
            </div>
            <div className="p-2 border border-[#00f0ff]/20 rounded hover:border-[#00f0ff]/50 transition-colors">
              <p className="text-lg font-bold text-[#00f0ff]">{profile.followers}</p>
              <p className="text-[9px] mono text-gray-500">FOLLOWERS</p>
            </div>
            <div className="p-2 border border-[#00f0ff]/20 rounded hover:border-[#00f0ff]/50 transition-colors">
              <p className="text-lg font-bold text-[#00f0ff]">{profile.following}</p>
              <p className="text-[9px] mono text-gray-500">FOLLOWING</p>
            </div>
          </div>
        </div>

        {/* Recent Repos */}
        <div>
          <h4 className="text-[#ff003c] mono text-xs font-bold mb-3 flex items-center gap-2">
            <BookOpen size={14} /> RECENT_REPOSITORIES.LOG
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {repos.slice(0, 6).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-800 hover:border-[#00f0ff]/50 rounded bg-[#030712]/40 group transition-all hover:bg-[#00f0ff]/5"
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="text-sm font-bold text-gray-200 group-hover:text-[#00f0ff] transition-colors truncate pr-2">{repo.name}</h5>
                  <ExternalLink size={12} className="text-gray-600 group-hover:text-[#00f0ff] shrink-0" />
                </div>
                {repo.description && (
                  <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{repo.description}</p>
                )}
                <div className="flex items-center gap-3 text-[10px] mono text-gray-500">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00f0ff]"></span>
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <a 
          href="https://github.com/aryanbarde80" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-center p-2 border border-gray-700 hover:border-[#00f0ff] text-gray-400 hover:text-[#00f0ff] transition-all mono text-xs uppercase tracking-widest"
        >
          → VIEW_FULL_PROFILE()
        </a>
      </div>
    </OSWindow>
  );
}
