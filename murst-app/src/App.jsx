import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';


// --- DATA STORE ---
// This is the section that an AI agent would modify.
// To add a new project, simply add a new object to the 'projects' array.

const projectsData = [
  {
    id: 'vibe-check',
    title: 'Vibe Check MCP',
    tagline: 'A metacognitive layer that keeps AI coding agents honest.',
    status: 'Ongoing',
    description: "Vibe Check makes AI coding agents more resilient and aligned by enforcing moments of reflection. It pauses the agent at key moments, challenges shaky assumptions, and records what worked (or failed) so the next run is smarter.",
    tags: ['Metacognition', 'AI Alignment', 'Agentic Systems', 'Resilience'],
    githubUrl: 'https://github.com/PV-Bhat/vibe-check-mcp-server',
    details: 'Vibe Check is built on a lightweight server architecture designed for rapid, low-latency interventions. It uses a series of specialized models to analyze agent plans and code, identifying potential "pattern inertia" before it leads to misaligned outcomes. The system maintains a learning log that is summarized and injected into future checks, creating a virtuous cycle of improvement.',
    highlights: ['1M Token Context', 'Pattern Interrupt', 'Continuous Learning'],
    visuals: [
      { type: 'flow', title: 'System Feedback Loop' }
    ]
  },
  {
    id: 'rsrc',
    title: 'Recursive Self-Referential Compression (RSRC)',
    tagline: 'A dual-metric framework for sustainable AI scaling.',
    status: 'Foundational',
    description: 'RSRC provides a survival map for the post-scaling era by quantifying AI efficiency through recursive processing, information compression, and thermodynamic cost. It separates evaluation into training efficiency (RSRC-t) and inference efficiency (RSRC-i) to enable nuanced optimization.',
    tags: ['AI Efficiency', 'Sustainable AI', 'Scaling Laws', 'Thermodynamics'],
    url: '#publications', // Link to the publication section
    urlText: 'View Publication',
    details: 'The RSRC framework is grounded in first-principles thinking, drawing from Landauer\'s principle on the thermodynamic limits of computation and Shannon\'s information theory. By creating a dual metric for training and inference, it allows researchers to make more informed trade-offs, optimizing for either rapid development or cost-effective deployment.',
    highlights: ['Dual-Metric System', 'Thermodynamic Cost', 'Information Theory'],
    visuals: [
        { 
            type: 'horizontalBar', 
            title: 'Comparing RSRC-t Scores For Popular Models',
            data: [
                { name: 'o3-mini', score: 3.9, type: 'Dense' },
                { name: 'Gemini 1.5 Pro', score: 4.3, type: 'MoE' },
                { name: 'Mistral 8x22B', score: 4.6, type: 'MoE' },
                { name: 'o1', score: 7.6, type: 'Dense' },
                { name: 'o3', score: 7.9, type: 'Dense' },
                { name: 'Claude 3.5 Sonnet', score: 8.3, type: 'Dense' },
                { name: 'GPT-4o', score: 9, type: 'Dense' },
                { name: 'Qwen2.5-Max', score: 10, type: 'MoE' },
                { name: 'DeepSeek R1', score: 10.5, type: 'MoE' },
                { name: 'DeepSeek V3', score: 11.1, type: 'MoE' },
            ]
        },
        {
            type: 'scatter',
            title: 'Scatter: RSRC-t vs MMLU',
            data: [
                { mmlu: 88, rsrc: 11.1, params: 671, type: 'MoE' },
                { mmlu: 87, rsrc: 10.5, params: 671, type: 'MoE' },
                { mmlu: 87.5, rsrc: 10, params: 671, type: 'MoE' },
                { mmlu: 88.4, rsrc: 9, params: 1760, type: 'Dense' },
                { mmlu: 88.7, rsrc: 8.3, params: 175, type: 'Dense' },
                { mmlu: 87.2, rsrc: 7.9, params: 700, type: 'Dense' },
                { mmlu: 86.1, rsrc: 7.6, params: 1900, type: 'Dense' },
                { mmlu: 81.2, rsrc: 4.6, params: 141, type: 'MoE' },
                { mmlu: 81.9, rsrc: 4.3, params: 700, type: 'MoE' },
                { mmlu: 75.2, rsrc: 5.6, params: 100, type: 'MoE' },
                { mmlu: 60, rsrc: 1.1, params: 7, type: 'Dense' },
                { mmlu: 86, rsrc: 8, params: 100, type: 'Dense' },
            ]
        }
    ]
  },
   {
    id: 'leads-wizard',
    title: 'LeadsWizard',
    tagline: 'AI-powered lead engagement and retention system.',
    status: 'Completed',
    description: 'LeadsWizard leveraged strategic prompt engineering and user-centric design to improve user sentiment by 45.9% and achieve a 95.12% lead retention rate in its target application.',
    tags: ['Applied AI', 'Prompt Engineering', 'User Engagement'],
    githubUrl: 'https://github.com/PV-Bhat/LeadsWizard',
    details: 'This project was a practical application of user-centric AI design. By focusing on the conversational flow and emotional resonance of the AI, LeadsWizard was able to build trust and rapport with users, leading to significantly higher engagement and retention compared to traditional, more rigid systems.',
    highlights: ['45.9% Sentiment Lift', '95.12% Retention', 'User-Centric AI'],
    visuals: [
        { 
            type: 'bar',
            title: 'Key Metrics vs. Manual & Templated Responses',
            data: [
                { name: 'Sentiment Score', LeadsWizard: 68, Manual: 56, Templated: 58 },
                { name: 'Engagement Score', LeadsWizard: 33, Manual: 28, Templated: 21 },
                { name: 'Customer Effort Score (CES)', LeadsWizard: 58, Manual: 63, Templated: 48 },
            ]
        },
        {
            type: 'area',
            title: 'Lead Qualification Retention Across Stages',
            data: [
                { name: 'Intake', LeadsWizard: 100, Manual: 100, Templated: 100 },
                { name: 'Engaged', LeadsWizard: 95, Manual: 82, Templated: 62 },
                { name: 'Qualified', LeadsWizard: 41, Manual: 38, Templated: 20 },
            ]
        }
    ]
  },
  {
    id: 'gemforge-mcp',
    title: 'GemForge-MCP',
    tagline: 'A framework for modular, multi-agent creative pipelines.',
    status: 'Archived',
    description: 'GemForge-MCP is a system designed to orchestrate multiple AI agents in a collaborative workflow, enabling complex creative tasks that are beyond the scope of a single model. It focuses on dynamic task allocation and efficient inter-agent communication.',
    tags: ['AI Agents', 'Creative AI', 'Multi-Agent Systems'],
    githubUrl: 'https://github.com/PV-Bhat/GemForge-MCP',
    details: 'GemForge explored concepts of agent orchestration and dynamic workflow generation. The Multi-Channel Processing (MCP) server allowed different specialized agents to subscribe to tasks, process them, and publish results to other agents, creating a flexible and powerful pipeline for complex, multi-step problems.',
    highlights: ['Agent Orchestration', 'Dynamic Workflows', 'Creative Pipelines'],
    visuals: [
       { 
           type: 'table', 
           title: 'Key Tools & Capabilities',
           data: [
               { tool: 'gemini_search', description: 'Web-connected information retrieval', capability: 'Real-time data access' },
               { tool: 'gemini_reason', description: 'Complex problem solving with step-by-step logic', capability: 'Transparent reasoning process' },
               { tool: 'gemini_code', description: 'Deep code understanding and generation', capability: 'Full repository analysis' },
               { tool: 'gemini_fileops', description: 'Multi-file processing across 60+ formats', capability: 'Document comparison and transformation' }
           ]
       }
    ]
  }
];

const publicationsData = [
  {
    id: 'rsrc-paper',
    title: "Recursive Self-Referential Compression (RSRC): AI's Survival Map in the Post-Scaling Era",
    authors: ['Pruthvi Bhat'],
    highlightAuthor: 'Pruthvi Bhat',
    journal: 'MURST Research Initiative',
    year: '2025',
    publishDate: '2025-01-15',
    doi: '10.13140/RG.2.2.34954.64967',
    url: 'https://zenodo.org/records/14851363',
    urlText: 'Read Paper on Zenodo'
  }
];

const peopleData = [
  {
    id: 'pv-bhat',
    name: 'Pruthvi Bhat',
    role: 'Founder & Lead Researcher',
    bio: 'An innovative thinker driven to build impactful, human-centered systems. My approach leverages a unique combination of AI, biotechnology, and human behavior to solve complex challenges from a systems-thinking perspective.',
    websiteUrl: 'https://pruthvibhat.com/about',
    links: [
      { name: 'GitHub', url: 'https://github.com/PV-Bhat' },
    ]
  }
];


// --- LOGOS ---

const MurstLogo = ({ className }) => (
    <img src="/MURSTHQ(4096).png" alt="MURST logo" className={className} />
);

const VibeCheckLogo = ({ className }) => (
    <img src="/vibelogov2.png" alt="Vibe Check logo" className={className} />
);

const GemForgeLogo = ({ className }) => (
    <img src="/Gemforgelogo.png" alt="GemForge logo" className={className} />
);

const ProjectLogo = ({ projectId, className }) => {
    switch (projectId) {
        case 'vibe-check':
            return <VibeCheckLogo className={className} />;
        case 'gemforge-mcp':
            return <GemForgeLogo className={className} />;
        default:
            return <MurstLogo className={className} />;
    }
};

const GitHubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-murst-green transition-colors duration-300">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover:text-murst-green transition-colors duration-300">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const MenuIcon = ({ isOpen }) => (
    <button className="relative w-8 h-8 z-50">
        <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out -translate-x-1/2 ${isOpen ? 'rotate-45 -translate-y-1/2' : '-translate-y-2'}`}></span>
        <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-300 transition-all duration-300 ease-in-out -translate-x-1/2 ${isOpen ? '-rotate-45 -translate-y-1/2' : 'translate-y-2'}`}></span>
    </button>
);

// --- CHART COMPONENTS ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-3 rounded-lg">
        <p className="label text-gray-300">{`${label}`}</p>
        {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }}>{`${pld.name}: ${pld.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(106, 242, 162, 0.1)'}} />
            <Legend wrapperStyle={{ color: '#a1a1aa' }} />
            <Bar dataKey="LeadsWizard" fill="#6AF2A2" />
            <Bar dataKey="Manual" fill="#A1A1AA" />
            <Bar dataKey="Templated" fill="#52525B" />
        </BarChart>
    </ResponsiveContainer>
);

const AreaChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
                <linearGradient id="colorLeadsWizard" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6AF2A2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6AF2A2" stopOpacity={0}/>
                </linearGradient>
                 <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A1A1AA" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#A1A1AA" stopOpacity={0}/>
                </linearGradient>
                 <linearGradient id="colorTemplated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52525B" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#52525B" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#a1a1aa' }} />
            <Area type="monotone" dataKey="LeadsWizard" stroke="#6AF2A2" fillOpacity={1} fill="url(#colorLeadsWizard)" />
            <Area type="monotone" dataKey="Manual" stroke="#A1A1AA" fillOpacity={1} fill="url(#colorManual)" />
            <Area type="monotone" dataKey="Templated" stroke="#52525B" fillOpacity={1} fill="url(#colorTemplated)" />
        </AreaChart>
    </ResponsiveContainer>
);

const HorizontalBarChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <YAxis type="category" dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(106, 242, 162, 0.1)'}} />
            <Bar dataKey="score">
                {
                    data.map((entry, index) => (
                        <Bar key={`cell-${index}`} fill={entry.type === 'MoE' ? '#6AF2A2' : '#737373'} />
                    ))
                }
                <LabelList dataKey="score" position="right" style={{ fill: '#e5e7eb' }} />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

const ScatterChartComponent = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" dataKey="mmlu" name="MMLU (5-shot)" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <YAxis type="number" dataKey="rsrc" name="RSRC-t" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <ZAxis dataKey="params" range={[100, 1000]} name="Parameters (B)" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Legend wrapperStyle={{ color: '#a1a1aa' }} />
            <Scatter name="MoE" data={data.filter(d => d.type === 'MoE')} fill="#6AF2A2" shape="cross" />
            <Scatter name="Dense" data={data.filter(d => d.type === 'Dense')} fill="#A1A1AA" shape="circle" />
        </ScatterChart>
    </ResponsiveContainer>
);

const VibeCheckFlowDiagram = () => (
    <div className="flex flex-col items-center justify-center p-8 font-mono">
        <div className="flex items-center gap-4">
            <div className="border-2 border-murst-green text-murst-green p-4 rounded-lg">vibe_check</div>
            <div className="text-gray-500 text-2xl font-bold">&lt;----&gt;</div>
            <div className="border-2 border-gray-500 text-gray-400 p-4 rounded-lg">vibe_learn</div>
        </div>
        <div className="mt-4 text-gray-500 text-2xl transform rotate-90">^</div>
        <div className="w-full h-0.5 bg-gray-700 mt-4"></div>
        <div className="mt-[-1px] w-0.5 h-4 bg-gray-700 self-start ml-[22%]"></div>
    </div>
);

const GemForgeTable = ({ data }) => (
    <div className="overflow-x-auto">
        <div className="grid grid-cols-3 gap-px bg-gray-700 border border-gray-700 rounded-lg">
            <div className="bg-gray-800 p-3 font-bold text-murst-green font-mono">Tool</div>
            <div className="bg-gray-800 p-3 font-bold text-murst-green font-mono">Description</div>
            <div className="bg-gray-800 p-3 font-bold text-murst-green font-mono">Key Capability</div>
            {data.map((row, index) => (
                <React.Fragment key={index}>
                    <div className="bg-gray-900 p-3 font-mono text-gray-300">{row.tool}</div>
                    <div className="bg-gray-900 p-3 text-gray-400">{row.description}</div>
                    <div className="bg-gray-900 p-3 text-gray-400">{row.capability}</div>
                </React.Fragment>
            ))}
        </div>
    </div>
);


// --- UI COMPONENTS ---

const Header = ({ onNavClick, isScrolled, onMenuToggle, isMenuOpen }) => {
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-black/20 backdrop-blur-lg border-b transition-all duration-300 ${isScrolled ? 'border-gray-800 shadow-lg shadow-black/20' : 'border-transparent'}`}>
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavClick('home')}>
                <MurstLogo className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                <span className="font-serif text-2xl font-bold text-gray-200 hidden sm:block">MURST</span>
            </div>
            <div onClick={onMenuToggle} className="cursor-pointer z-50">
                <MenuIcon isOpen={isMenuOpen} />
            </div>
        </header>
    );
};

const NavigationMenu = ({ isOpen, navItems, onNavClick }) => {
    return (
        <div className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-40 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
                {navItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => onNavClick(item.id)}
                        className="font-serif text-4xl text-gray-400 hover:text-white transition-all duration-300"
                        style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                            transitionDelay: isOpen ? `${index * 100 + 300}ms` : '0ms'
                        }}
                    >
                        <span className="font-mono text-lg text-murst-green mr-4">{item.number}</span>
                        {item.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

const Section = ({ id, children, className = '' }) => (
    <section id={id} className={`w-full max-w-5xl mx-auto px-4 sm:px-8 py-32 sm:py-40 section-observer ${className}`}>
        {children}
    </section>
);

const SectionTitle = ({ number, title }) => (
    <h2 className="flex items-baseline gap-4 mb-16 relative w-full">
        <span className="font-mono text-xl text-murst-green">{number}</span>
        <span className="font-serif text-4xl sm:text-5xl font-bold text-gray-200 tracking-wide">{title}</span>
        <span className="absolute bottom-[-10px] left-0 h-px bg-murst-green w-0 transition-all duration-700 ease-out section-underline"></span>
    </h2>
);

const LandingSection = () => (
    <div id="home" className="h-screen w-full flex flex-col items-center justify-center text-center p-4 overflow-hidden relative section-observer">
        <div className="z-10 flex flex-col items-center">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl max-w-4xl text-gray-200 leading-tight animate-title-in">
                Exploring frontier techniques to scale AI agentic intelligence
            </h1>
            <p className="font-sans text-lg sm:text-xl max-w-3xl text-gray-500 mt-6 leading-normal animate-fade-in" style={{ animationDelay: '0.5s' }}>
                We work on innovative approaches for the next epoch of AI.
            </p>
        </div>
        <div className="absolute bottom-10 animate-pulse z-10">
            <svg className="w-8 h-8 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
        </div>
    </div>
);

const AboutSection = () => (
    <Section id="about">
        <SectionTitle number="01" title="About" />
        <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-lg sm:text-xl text-gray-300 leading-relaxed">
                <span className="text-murst-green font-bold">MURST</span> stands for <span className="font-bold">Meta-Unified Recursive Systems Theory</span>.
            </p>
            <p className="font-sans text-lg sm:text-xl text-gray-400 mt-6 leading-relaxed">
                Founded and led by Pruthvi Bhat, MURST aims to be a platform for implementing unconventional research and new abstract approaches to progress AI research and implementation, bridging frontier capabilities with modern integrations.
            </p>
        </div>
    </Section>
);

const Card = ({ children, className, onClick, style }) => (
    <div
        onClick={onClick}
        style={style}
        className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-8 transition-all duration-300 ease-out card-container ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
        {children}
    </div>
);

const ProjectCard = ({ project, onClick, style }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Ongoing': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'Foundational': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
            case 'Completed': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
            case 'Archived': return 'bg-gray-700/20 text-gray-500 border-gray-700/30';
            default: return 'bg-gray-600/20 text-gray-300';
        }
    };

    return (
        <Card onClick={onClick} style={style}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-2xl font-bold text-gray-100">{project.title}</h3>
                <span className={`text-xs font-mono px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                </span>
            </div>
            <p className="text-gray-400 mb-6 font-sans">{project.tagline}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </Card>
    );
};

const ProjectsSection = ({ onProjectClick }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-card-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = Array.from(containerRef.current.children);
        cards.forEach(card => observer.observe(card));

        return () => cards.forEach(card => observer.unobserve(card));
    }, []);

    return (
        <Section id="projects">
            <SectionTitle number="02" title="Projects" />
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsData.map((p, index) => (
                    <ProjectCard
                        key={p.id}
                        project={p}
                        onClick={() => onProjectClick(p)}
                        style={{ '--stagger-delay': `${index * 100}ms` }}
                    />
                ))}
            </div>
        </Section>
    );
};


const PublicationItem = ({ pub, style }) => (
    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="block">
        <Card style={style}>
            <h3 className="text-2xl font-serif font-bold text-gray-200 mb-2">{pub.title}</h3>
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-sans">
                    {pub.authors.map((author, index) => (
                        <span key={author} className={author === pub.highlightAuthor ? 'text-murst-green' : ''}>
                            {author}{index < pub.authors.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                    ({pub.year}). <span className="italic">{pub.journal}</span>.
                </p>
                {pub.publishDate && <p className="font-mono text-xs">Published: {pub.publishDate}</p>}
                {pub.doi && <p className="font-mono text-xs">DOI: {pub.doi}</p>}
            </div>
            <div className="group inline-flex items-center gap-2 text-sm font-mono text-murst-green hover:text-white transition-colors w-fit">
                <LinkIcon />
                {pub.urlText}
            </div>
        </Card>
    </a>
);

const PublicationsSection = () => {
     const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-card-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = Array.from(containerRef.current.children);
        cards.forEach(card => observer.observe(card));

        return () => cards.forEach(card => observer.unobserve(card));
    }, []);
    
    return (
        <Section id="publications">
            <SectionTitle number="03" title="Publications" />
            <div ref={containerRef} className="space-y-8">
                {publicationsData.map((p, index) => <PublicationItem key={p.id} pub={p} style={{'--stagger-delay': `${index * 100}ms`}} />)}
            </div>
        </Section>
    );
};

const PeopleCard = ({ person }) => (
    <a href={person.websiteUrl} target="_blank" rel="noopener noreferrer" className="block">
        <Card>
            <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 10.5C16.5 12.9853 14.4853 15 12 15C9.51472 15 7.5 12.9853 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5Z" stroke="#6AF2A2" strokeWidth="1.5"/>
                        <path d="M12 15V15C8.68629 15 6 17.6863 6 21H18C18 17.6863 15.3137 15 12 15V15Z" stroke="#6AF2A2" strokeWidth="1.5"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-3xl font-serif font-bold text-gray-100">{person.name}</h3>
                    <p className="font-mono text-murst-green mb-4">{person.role}</p>
                    <p className="text-gray-400 mb-6 font-sans">{person.bio}</p>
                    <div className="flex items-center gap-6">
                        {person.links.map(link => (
                            <div key={link.name} className="group flex items-center gap-2 text-sm font-mono text-gray-400">
                                {link.name === 'GitHub' ? <GitHubIcon /> : <LinkIcon />}
                                {link.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    </a>
);

const PeopleSection = () => (
    <Section id="people">
        <SectionTitle number="04" title="People" />
        <div className="space-y-8">
            {peopleData.map(p => <PeopleCard key={p.id} person={p} />)}
        </div>
    </Section>
);

const ProjectDetail = ({ project, onClose }) => {
    const renderVisual = (visual) => {
        switch(visual.type) {
            case 'bar': return <BarChartComponent data={visual.data} />;
            case 'area': return <AreaChartComponent data={visual.data} />;
            case 'scatter': return <ScatterChartComponent data={visual.data} />;
            case 'horizontalBar': return <HorizontalBarChartComponent data={visual.data} />;
            case 'flow': return <VibeCheckFlowDiagram />;
            case 'table': return <GemForgeTable data={visual.data} />;
            case 'placeholder': return (
                <div className="bg-gray-800/50 rounded-lg aspect-video flex items-center justify-center">
                    <p className="text-gray-600">{visual.text}</p>
                </div>
            );
            default: return null;
        }
    }

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-end transition-opacity duration-300 ease-in-out ${project ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`w-full h-[95vh] bg-gray-900 border-t-2 border-murst-green rounded-t-3xl shadow-2xl shadow-murst-green/20 overflow-y-auto transition-transform duration-500 ease-in-out ${project ? 'translate-y-0' : 'translate-y-full'}`}
                onClick={e => e.stopPropagation()}
            >
                {project && (
                    <div className="max-w-4xl mx-auto p-8 sm:p-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-6">
                                <ProjectLogo projectId={project.id} className="w-20 h-20 flex-shrink-0 object-contain" />
                                <div>
                                    <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-100">{project.title}</h2>
                                    <p className="text-gray-400 mt-2 font-sans text-lg">{project.tagline}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {project.highlights && project.highlights.map(highlight => (
                                <div key={highlight} className="bg-gray-800/50 p-4 rounded-lg text-center">
                                    <p className="font-mono text-murst-green">{highlight}</p>
                                </div>
                            ))}
                        </div>

                        <div className="font-sans text-gray-400 leading-relaxed space-y-4 mb-12">
                            <h3 className="font-serif text-2xl font-bold text-gray-200 border-b border-gray-700 pb-2 mb-4">About the Project</h3>
                            <p>{project.details}</p>
                        </div>
                        
                        {project.visuals && project.visuals.length > 0 && (
                            <div className="mb-12 space-y-8">
                                <h3 className="font-serif text-2xl font-bold text-gray-200 border-b border-gray-700 pb-2 mb-4">Visuals & Diagrams</h3>
                                {project.visuals.map(visual => (
                                    <div key={visual.title}>
                                        <p className="text-sm text-gray-500 mb-2">{visual.title}</p>
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            {renderVisual(visual)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <h3 className="font-serif text-2xl font-bold text-gray-200 border-b border-gray-700 pb-2 mb-4">Links & Resources</h3>
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                {project.githubUrl && (
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 text-sm font-mono bg-gray-800 text-gray-300 hover:bg-murst-green hover:text-black rounded-full px-6 py-3 transition-all duration-300 font-bold">
                                        <GitHubIcon />
                                        View on GitHub
                                    </a>
                                )}
                                {project.url && (
                                     <a href={project.url} onClick={onClose} className="group inline-flex items-center justify-center gap-2 text-sm font-mono bg-gray-800 text-gray-300 hover:bg-murst-green hover:text-black rounded-full px-6 py-3 transition-all duration-300 font-bold">
                                        <LinkIcon />
                                        {project.urlText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const Footer = () => (
    <footer className="text-center py-8 border-t border-gray-800 mt-24">
        <p className="text-gray-600 font-mono text-sm">
            MURST Research Initiative &copy; {new Date().getFullYear()}
        </p>
    </footer>
);

const GradientBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const orbs = [
            { x: Math.random(), y: Math.random(), r: Math.random() * 0.2 + 0.1, vx: (Math.random() - 0.5) * 0.0001, vy: (Math.random() - 0.5) * 0.0001, color: 'rgba(106, 242, 162, 0.03)' },
            { x: Math.random(), y: Math.random(), r: Math.random() * 0.2 + 0.1, vx: (Math.random() - 0.5) * 0.0001, vy: (Math.random() - 0.5) * 0.0001, color: 'rgba(106, 242, 162, 0.02)' },
            { x: Math.random(), y: Math.random(), r: Math.random() * 0.2 + 0.1, vx: (Math.random() - 0.5) * 0.0001, vy: (Math.random() - 0.5) * 0.0001, color: 'rgba(106, 242, 162, 0.04)' }
        ];

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            orbs.forEach(orb => {
                orb.x += orb.vx * canvas.width;
                orb.y += orb.vy * canvas.height;

                if (orb.x > 1) orb.vx *= -1;
                if (orb.x < 0) orb.vx *= -1;
                if (orb.y > 1) orb.vy *= -1;
                if (orb.y < 0) orb.vy *= -1;

                const gradient = ctx.createRadialGradient(
                    orb.x * canvas.width, orb.y * canvas.height, 0,
                    orb.x * canvas.width, orb.y * canvas.height, orb.r * Math.min(canvas.width, canvas.height)
                );
                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1]" />;
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'about', name: 'About', number: '01' },
        { id: 'projects', name: 'Projects', number: '02' },
        { id: 'publications', name: 'Publications', number: '03' },
        { id: 'people', name: 'People', number: '04' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    
    useEffect(() => {
        if (selectedProject || isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedProject, isMenuOpen]);

    const handleNavClick = (id) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({
                behavior: 'smooth'
            });
        }, 300);
    };

    return (
        <div className="bg-black text-gray-300 font-sans">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..24,700&family=Inter:wght@400;700&family=Roboto+Mono:wght@400;700&display=swap');
                
                html {
                    scroll-behavior: smooth;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #000000;
                    color: #d1d5db;
                }
                .font-mono {
                    font-family: 'Roboto Mono', monospace;
                }
                .font-sans {
                     font-family: 'Inter', sans-serif;
                }
                .font-serif {
                    font-family: 'Source Serif 4', serif;
                }
                
                .main-container-content {
                    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                .main-container-content.detail-open {
                    transform: scale(0.95) translateY(-10px);
                    filter: blur(4px);
                    pointer-events: none;
                }

                @keyframes titleIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-title-in {
                    animation: titleIn 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
                    opacity: 0;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                .animate-card-in {
                    animation: cardIn 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
                    opacity: 0;
                    animation-delay: var(--stagger-delay, 0ms);
                }

                ::selection {
                    background-color: #6AF2A2;
                    color: #000000;
                }
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #000000;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: #1f2937;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: #374151;
                }
                .card-container {
                    transform-style: preserve-3d;
                    background-color: #111111;
                }
                .card-container:hover {
                    transform: scale(1.02) translateY(-5px);
                    box-shadow: 0 25px 40px -15px rgba(0,0,0,0.4);
                    border-color: rgba(106, 242, 162, 0.3);
                }
                `}
            </style>
            <GradientBackground />
            <div className={`main-container-content ${selectedProject ? 'detail-open' : ''}`}>
                <Header 
                    onNavClick={handleNavClick} 
                    isScrolled={isScrolled}
                    onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
                    isMenuOpen={isMenuOpen}
                />
                <main>
                    <LandingSection />
                    <AboutSection />
                    <ProjectsSection onProjectClick={setSelectedProject} />
                    <PublicationsSection />
                    <PeopleSection />
                </main>
                <Footer />
            </div>
            <NavigationMenu 
                isOpen={isMenuOpen} 
                navItems={navItems}
                onNavClick={handleNavClick}
            />
            <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}
