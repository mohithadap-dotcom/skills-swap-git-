# Security Policy

SkillSwap connects identity, public developer data, AI-assisted analysis, mapping, and video-session services. Please handle security findings privately and avoid exposing student or credential data.

## Supported version

Security updates target the current main branch. Historical commits and forks are not actively maintained.

## Reporting a vulnerability

Do not publish exploit details, access tokens, OAuth material, private repository information, or personal student data in a public issue.

Use GitHub's private vulnerability reporting option from the repository Security tab when available. Include:

- a concise description of the issue;
- affected pages, components, or integrations;
- reproducible steps using synthetic data;
- expected and observed behavior;
- likely impact;
- a suggested mitigation, if known.

If private reporting is unavailable, open a minimal public issue asking the repository owner for a private contact channel. Do not include technical exploit details in that issue.

## High-priority findings

Please report issues involving:

- exposure of GitHub, Groq, Supabase, or OAuth credentials;
- misuse of Supabase access controls or authentication callbacks;
- access to another learner's profile, requests, credits, or session data;
- script injection through profiles, analysis output, posts, or debrief content;
- unauthorized Jitsi room discovery or access;
- server-side requests reaching unintended hosts;
- leakage of video, audio, map, or profile information;
- privilege escalation caused by client-controlled local state.

## Safe research guidelines

- Test only accounts, projects, rooms, and data you own or are authorized to use.
- Use fictional learner data and disposable test rooms.
- Do not access private repositories without explicit authorization.
- Do not degrade third-party services or another user's session.
- Remove secrets and personal data from logs and screenshots.

## Deployment guidance

- Keep GitHub and Groq credentials server-only.
- Use only the public anonymous Supabase key in browser configuration.
- Configure Supabase row-level security before persisting user data.
- Add authorization and room-policy controls before using Jitsi sessions with real learners.
- Review the privacy and retention terms of every external integration.
