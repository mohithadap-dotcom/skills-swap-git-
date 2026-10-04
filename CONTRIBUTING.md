# Contributing to SkillSwap

Thank you for helping improve SkillSwap. Contributions are welcome across matching, learning workflows, accessibility, security, documentation, and test coverage.

## Before you start

- Search existing issues and pull requests for related work.
- Keep each change focused on one problem.
- Discuss major architecture or product changes in an issue first.
- Use synthetic learner profiles and requests in fixtures and screenshots.
- Never commit access tokens, OAuth secrets, private repository data, or personal student information.
- Report vulnerabilities using [SECURITY.md](SECURITY.md), not a public issue.

## Local setup

SkillSwap requires Node.js 20.9 or newer.

    git clone https://github.com/mohithadap-dotcom/skills-swap-git-.git
    cd skills-swap-git-
    npm install
    Copy-Item .env.example .env.local
    npm run dev

Only configure the integrations needed for your work. The public Supabase variables are intended for the browser; GitHub and Groq credentials must remain server-only.

## Development workflow

1. Create a short, descriptive branch.
2. Reproduce the issue or describe the intended product behavior.
3. Add tests when a suitable test layer exists.
4. Keep demo data clearly separated from persisted or live data.
5. Verify responsive behavior for user-interface changes.
6. Run the available quality checks.

    npm run build
    npm run lint

The optimized production build is the current required gate. The repository has known baseline lint debt; do not introduce new violations, and clean up nearby violations when practical.

## Pull request checklist

- [ ] The change has a clear user or developer benefit.
- [ ] The production build completes successfully.
- [ ] No credentials or local environment files are committed.
- [ ] External-service failures have a clear fallback or error state.
- [ ] New interface elements are keyboard accessible and include useful labels.
- [ ] Demo data is identified as demonstration data.
- [ ] Documentation reflects the current implementation.
- [ ] Screenshots contain no private or identifying student data.

## Engineering guidelines

- Keep server-only credentials inside server code.
- Never expose privileged Supabase keys through NEXT_PUBLIC variables.
- Validate untrusted usernames, text, and integration responses.
- Model domain objects with TypeScript types rather than adding new explicit any values.
- Prefer accessible semantic elements and useful alt text.
- Keep route components focused and move reusable interface patterns into src/components.
- Make prototype-only behavior visible in both code comments and user-facing documentation.
- Do not claim learning outcomes, compatibility accuracy, or profile accuracy without measured evidence.

## Product data

Seeded profiles, compatibility scores, colleges, posts, debriefs, credits, and badges are useful for demonstrations, but they must not be presented as live community data. New demo records should use fictional names and non-sensitive assets.

## Commit messages

Use short imperative messages, for example:

- Improve peer match accessibility
- Persist request board filters
- Document Jitsi privacy boundaries

## Questions and bug reports

Open a GitHub issue with:

- a concise description;
- steps to reproduce;
- expected and actual behavior;
- browser and Node.js versions;
- screenshots or logs with secrets removed.
