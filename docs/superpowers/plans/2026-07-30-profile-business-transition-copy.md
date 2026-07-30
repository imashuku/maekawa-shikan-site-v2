# Public Profile Business Transition Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove references to legal proceedings from the public profile and describe the move from regional business to Maekawa Shikan content positively and consistently.

**Architecture:** This is a focused copy change in the existing profile page. No new component, data source, route, or dependency is needed; verification uses a repository text scan, lint, and visual inspection of the running profile page.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, ESLint

---

### Task 1: Unify the public transition narrative

**Files:**
- Modify: `src/app/profile/page.tsx:215`
- Modify: `src/app/profile/page.tsx:280-282`
- Modify: `src/app/profile/page.tsx:367`

- [ ] **Step 1: Verify the sensitive wording is currently present**

Run:

```bash
rg -n '法的整理|破産' src/app/profile/page.tsx
```

Expected: three matches containing `法的整理`.

- [ ] **Step 2: Replace the career entry**

Replace the 2026 career entry with:

```tsx
{
  year: "2026",
  body: "地域事業から近江史コンテンツ事業へ活動の軸足を移し、「転戦」の第二章へ",
  highlight: true,
}
```

- [ ] **Step 3: Replace the experience summary**

Use:

```tsx
<p className="mb-6 text-base leading-8 text-kinari/90 md:leading-loose">
  10期にわたる地域事業では、地域資源を見つけ、育て、社会へ届ける挑戦を続けました。
  <br />
  その経験は、いまの活動へつながっています。
</p>
```

- [ ] **Step 4: Replace the personal narrative**

Use:

```tsx
<p>
  10年の地域事業で得た経験を次の活動へつなぎ、2026年からは
  <strong className="text-kokihi">「転戦」</strong>
  の第二章として、近江史コンテンツ事業へ活動の軸足を移しました。
</p>
```

- [ ] **Step 5: Verify sensitive wording is absent**

Run:

```bash
if rg -n '法的整理|破産' src/app/profile/page.tsx; then exit 1; fi
```

Expected: exit code 0 with no matches.

- [ ] **Step 6: Verify code quality and the local page**

Run:

```bash
npm run lint
```

Expected: exit code 0.

Open `http://localhost:3001/profile`, reload, and confirm the career, experience, and personal narrative read naturally.

- [ ] **Step 7: Commit**

```bash
git add src/app/profile/page.tsx docs/superpowers/plans/2026-07-30-profile-business-transition-copy.md
git commit -m "fix: refine public profile transition story"
```
