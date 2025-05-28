# Deployment Guide

This guide will help you deploy the English Test Preparation App to production using Netlify.

## Prerequisites

1. Create a [Netlify account](https://app.netlify.com/signup) if you don't have one
2. Create a [Supabase account](https://supabase.com) and set up a new project
3. Install the Netlify CLI (already included in project dependencies)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment Steps

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
```bash
npm run deploy
```

3. Set up environment variables in Netlify:
   - Go to Site settings > Build & deploy > Environment
   - Add the same environment variables from your `.env` file

## Database Setup

1. Create the necessary tables in Supabase:
   - Tests
   - Sections
   - Questions
   - UserResults

2. Enable Row Level Security (RLS) and set up appropriate policies

3. Set up authentication if required

## Continuous Deployment

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x

## Post-Deployment

1. Set up a custom domain (optional)
2. Configure SSL/TLS
3. Set up redirects for client-side routing

## Monitoring

1. Monitor site performance in Netlify analytics
2. Check Supabase database usage and performance
3. Set up error tracking (optional)

For more detailed instructions, visit the [Netlify Docs](https://docs.netlify.com/).