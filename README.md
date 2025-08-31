# AI-Powered To-Do List App

A full-stack Next.js to-do list application with persistent storage in Supabase and an AI-enhanced chatbot integrated via N8N. This project demonstrates building automations that improve productivity and leverage AI to enrich user tasks.

## Features
## Core To-Do List (Foundation)

- Add, edit, and mark tasks as complete

- Tasks are persisted in Supabase

- Basic user identification (email)

## AI Chatbot Enhancement

- Integrates with N8N for workflow automation

- Enhances task titles using AI: makes tasks clearer and more actionable


## Tech Stack

- Frontend: Next.js

- Database: Supabase

- Hosting: Vercel

- AI Assistant: openai 

- Automation: N8N

## Demo

Deployed App: [Webapp URL](https://todoapp-staging.vercel.app/)

Loom Walkthrough Video: [Loom Video URL](https://www.loom.com/share/dccd085d38f149e8b9d0d674ffa9a924?sid=590ec7ad-b4ad-4fe9-b8b5-40072c3f6ba8)

## Installation (for local setup)

Clone the repository:

- git clone [GitHub Repo URL](https://github.com/Yourfavdarkskinnedguy/todo-app/tree/main)

- Install dependencies:

- cd todo-app
npm install


Set up environment variables (create .env.local):

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


Run the development server:

npm run dev

N8N Workflow

The N8N workflow is configured to enhance task titles with AI whenever a new task is added.

## How It Works

- User adds a task in the web app

- Task is stored in Supabase with persistent storage

- N8N workflow triggers AI enhancement for the task title

- Enhanced task title is updated in Supabase

- (Future) WhatsApp integration allows triggering tasks via messages
