import { portfolioData } from '../../data/portfolioData';

export interface CommandResult {
  output: string;
  isError?: boolean;
  action?: 'TOGGLE_MODE' | 'OPEN_RESUME' | 'CLEAR' | 'CHANGE_THEME';
  payload?: string;
}

export interface CommandDefinition {
  name: string;
  alias?: string[];
  description: string;
  category: 'General' | 'Portfolio' | 'System';
}

export const COMMANDS_LIST: CommandDefinition[] = [
  { name: 'help', alias: ['?', 'commands'], description: 'List all available terminal commands', category: 'General' },
  { name: 'about', alias: ['bio', 'whoami'], description: 'Display background, education and engineering focus', category: 'Portfolio' },
  { name: 'skills', alias: ['tech', 'stack'], description: 'List technical skills across Full-Stack & DevOps', category: 'Portfolio' },
  { name: 'projects', alias: ['work', 'repos'], description: 'Browse featured projects with repository links', category: 'Portfolio' },
  { name: 'experience', alias: ['exp', 'jobs'], description: 'Display internship and contribution history', category: 'Portfolio' },
  { name: 'education', alias: ['edu', 'college'], description: 'Show university degree and coursework', category: 'Portfolio' },
  { name: 'accomplishments', alias: ['awards', 'hackathons'], description: 'View hackathon honors and achievements', category: 'Portfolio' },
  { name: 'contact', alias: ['email', 'reach'], description: 'Show direct contact information and links', category: 'Portfolio' },
  { name: 'resume', alias: ['cv', 'download'], description: 'View and download resume PDF', category: 'Portfolio' },
  { name: 'ls', alias: ['dir'], description: 'List virtual directory contents', category: 'System' },
  { name: 'cat', description: 'Read a file (e.g. cat about.txt, cat projects.json)', category: 'System' },
  { name: 'theme', description: 'Change theme (cyber, matrix, dracula, nord, classic, monochrome)', category: 'System' },
  { name: 'neofetch', alias: ['fetch', 'sysinfo'], description: 'Display system profile and specifications', category: 'System' },
  { name: 'gui', alias: ['web', 'minimal', 'exit'], description: 'Switch to Minimalist GUI mode', category: 'General' },
  { name: 'clear', alias: ['cls'], description: 'Clear terminal buffer', category: 'General' },
  { name: 'date', description: 'Display current timestamp', category: 'System' },
  { name: 'echo', description: 'Print arguments to the terminal', category: 'General' },
];

export const VIRTUAL_FILES: Record<string, string> = {
  'about.txt': `${portfolioData.name} - ${portfolioData.role}\n\n${portfolioData.bio}\n\nLocation: ${portfolioData.location}\nInstitution: ${portfolioData.education.institution} (${portfolioData.education.period})`,
  'skills.md': `# Technical Stack\n\n- Languages: C, C++, Java, JavaScript, TypeScript, Python\n- Web: React, Node.js, Express.js, Socket.IO, Tailwind CSS\n- Cloud & DevOps: Docker, Kubernetes, AWS EC2, Jenkins, Terraform\n- Databases: MongoDB, MySQL, Prometheus, Grafana`,
  'projects.json': JSON.stringify(
    portfolioData.projects.map(p => ({
      title: p.title,
      category: p.category,
      tech: p.techStack.join(', '),
      github: p.githubUrl || 'N/A'
    })),
    null,
    2
  ),
  'experience.log': portfolioData.experiences.map(e => `[${e.period}] ${e.role} @ ${e.company} (${e.type})\n${e.description.join('\n')}`).join('\n\n'),
  'contact.sh': `curl -X POST "mailto:${portfolioData.email}" \\\n  -H "Sender: $(whoami)" \\\n  -d "msg=Hello Virshin"`,
  'resume.pdf': `[ATTACHMENT: Virshin_Resume.pdf] -> Type 'resume' or 'gui' to open.`,
};

export const executeCommand = (cmdInput: string): CommandResult => {
  const trimmed = cmdInput.trim();
  if (!trimmed) return { output: '' };

  const parts = trimmed.split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
    case '?':
    case 'commands':
      return {
        output: `Available Commands:
------------------------------------------------------------
[ Portfolio ]
  about          Display bio, background and focus
  skills         View technical skills and stacks
  projects       Explore projects with repository links
  experience     Work history and contributions
  education      Degree and university details
  accomplishments Hackathon placements and recognitions
  contact        Direct email, phone and links
  resume         Open and download resume PDF

[ Navigation & System ]
  gui / web      Switch to Minimalist GUI Mode (Shortcut: Ctrl+G)
  theme <name>   Switch theme: [monochrome | cyber | matrix | dracula | nord | classic]
  neofetch       Display system profile and specifications
  ls             List virtual directory files
  cat <filename> View file content (e.g. cat about.txt)
  clear / cls    Clear the terminal window
  help           Show this list of commands
------------------------------------------------------------
Tip: Use TAB for auto-completion and UP/DOWN arrows for history.`
      };

    case 'gui':
    case 'web':
    case 'minimal':
    case 'exit':
      return {
        output: 'Switching to Minimalist GUI mode...',
        action: 'TOGGLE_MODE'
      };

    case 'resume':
    case 'cv':
    case 'download':
      return {
        output: `Opening resume viewer for ${portfolioData.name}...`,
        action: 'OPEN_RESUME'
      };

    case 'about':
    case 'bio':
    case 'whoami':
      return {
        output: `------------------------------------------------------------
${portfolioData.name} - ${portfolioData.role}
------------------------------------------------------------
Location:    ${portfolioData.location}
Degree:      ${portfolioData.education.degree}
Institution: ${portfolioData.education.institution} (${portfolioData.education.period})

${portfolioData.bio}

Engineering Focus:
- Full-stack web applications (React, Node, Express, Socket.IO)
- Cloud infrastructure and container orchestration (Docker, Kubernetes, AWS, Terraform)
- System reliability, payment gateway integration, and AI benchmark tasks.`
      };

    case 'skills':
    case 'tech':
    case 'stack':
      return {
        output: `TECHNICAL SKILLS & TOOLSETS
------------------------------------------------------------
Languages:
  JavaScript (ES6+), TypeScript, Python, C, C++, Java

Web & Full-Stack:
  React, Vite, Node.js, Express.js, Socket.IO, Tailwind CSS, REST APIs, JWT

DevOps & Cloud Infrastructure:
  Docker, Kubernetes, AWS EC2, Terraform (IaC), Jenkins CI/CD, Linux SysAdmin

Databases & Monitoring:
  MongoDB, MySQL, Prometheus, Grafana, Git & GitHub Workflows`
      };

    case 'projects':
    case 'work':
    case 'repos':
      return {
        output: `FEATURED PROJECTS (${portfolioData.projects.length} Repositories)
------------------------------------------------------------
1. TransitLive [Full-Stack]
   - Real-Time Public Transit Tracking & Vehicle Telemetry Dashboard
   - Tech: React, Node.js, Express, MongoDB, Socket.IO, JWT, GTFS Simulator
   - Link: https://github.com/Virshin1/TransitLive

2. PS-120 [Cloud & DevOps]
   - Custom Container Orchestration Engine & Scheduler Strategy
   - Tech: Docker, Linux Systems, Distributed Architecture, API Design
   - Type: Academic & Faculty-Supervised

3. AI-Powered Teacher Tools Platform [AI & Tools]
   - Suite of automation utilities for educators
   - Tech: React, TypeScript, Node.js, OpenAI APIs, Tailwind CSS
   - Link: https://github.com/Virshin1/Ai-Tools

4. Buildathon 3.0 Platform [Top 5 Hackathon]
   - Collaborative web platform engineered under hackathon constraints
   - Link: https://github.com/Virshin1/Buildathon-3.0

5. Hero MotoCorp Experience [Frontend]
   - Responsive web clone and product specifications portal
   - Link: https://github.com/Virshin1/Hero-Motocorp`
      };

    case 'experience':
    case 'exp':
    case 'jobs':
      return {
        output: `WORK EXPERIENCE & CONTRIBUTIONS
------------------------------------------------------------
1. Web Development Intern
   Company:  Hari Om Thalassic Private Limited | Navi Mumbai
   Duration: Jun 2025 - Nov 2025
   - Architected and deployed secure B2B rural payment gateway solution.
   - Streamlined transaction handling, payment polling, and error recovery.
   - Skills: React, Node.js, Express, Payment Gateways, REST APIs

2. Part-Time Contributor
   Company:  Parsewave | Remote
   Duration: 2025
   - Authored Terminal-Bench & Harbor benchmark tasks for AI agent evaluation.
   - Built deterministic Dockerized testbeds and grading scripts.
   - Skills: Docker, Linux Shell, Python, AI Evaluation Benchmarking`
      };

    case 'education':
    case 'edu':
    case 'college':
      return {
        output: `EDUCATION & ACADEMICS
------------------------------------------------------------
Institution: ${portfolioData.education.institution}, Navi Mumbai
Degree:      ${portfolioData.education.degree}
Timeline:    ${portfolioData.education.period}

Relevant Coursework:
- System Design & Distributed Architectures
- Cloud Infrastructure & Virtualization
- DevOps & CI/CD Automation
- Data Structures & Algorithms
- Database Management Systems
- Linux System Administration`
      };

    case 'accomplishments':
    case 'awards':
    case 'hackathons':
      return {
        output: `ACHIEVEMENTS & HACKATHONS
------------------------------------------------------------
- Top 5 Finalist: Buildathon 3.0
  Secured Top 5 position in college-wide 24hr buildathon competition.

- MumbaiHacks Competitor
  Engineered collaborative real-world solutions at Mumbai hackathon.

- AI Evaluation Contributor (Parsewave / Harbor)
  Created benchmarking tasks for testing autonomous AI agent environments.`
      };

    case 'contact':
    case 'email':
    case 'reach':
      return {
        output: `CONTACT INFORMATION
------------------------------------------------------------
Email:    ${portfolioData.email}
Phone:    ${portfolioData.phone}
Location: ${portfolioData.location}
GitHub:   ${portfolioData.github}`
      };

    case 'ls':
    case 'dir':
      return {
        output: Object.keys(VIRTUAL_FILES).join('    ')
      };

    case 'cat':
      if (!args[0]) {
        return { output: 'Usage: cat <filename> (e.g. cat about.txt, cat skills.md)', isError: true };
      }
      const filename = args[0].toLowerCase();
      if (VIRTUAL_FILES[filename]) {
        return { output: VIRTUAL_FILES[filename] };
      }
      return { output: `cat: ${args[0]}: No such file or directory. Try 'ls' to view files.`, isError: true };

    case 'clear':
    case 'cls':
      return { output: '', action: 'CLEAR' };

    case 'theme':
      const validThemes = ['monochrome', 'cyber', 'matrix', 'dracula', 'nord', 'classic'];
      if (!args[0] || !validThemes.includes(args[0].toLowerCase())) {
        return {
          output: `Usage: theme <name>\nAvailable themes: ${validThemes.join(', ')}`,
          isError: true
        };
      }
      return {
        output: `Theme switched to '${args[0].toLowerCase()}'.`,
        action: 'CHANGE_THEME',
        payload: args[0].toLowerCase()
      };

    case 'date':
      return { output: new Date().toISOString() };

    case 'echo':
      return { output: args.join(' ') };

    case 'neofetch':
    case 'fetch':
    case 'sysinfo':
      return {
        output: `       .---.       virshin@dev
      /     \\      -----------
     | () () |     OS: Minimal Unix x86_64
      \\  _  /      Host: ITM Skills University
       /   \\       Kernel: 6.8.0-devops
      /|   |\\      Uptime: 2 years (Since Aug 2024)
     (_|   |_)     Shell: zsh 5.9 (x86_64-apple-darwin)
       |   |       Terminal: Minimal-v2
       |   |       CPU: B.Tech CSE Core (8 Cores)
       '---'       Memory: 45 Repositories
                   Status: Available for Opportunities`
      };

    default:
      return {
        output: `command not found: ${command}. Type 'help' to view available commands.`,
        isError: true
      };
  }
};
