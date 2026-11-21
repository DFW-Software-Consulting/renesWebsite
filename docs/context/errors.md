# Error log

Entries go newest first.

Entry format:

```
## <short error signature, the message text you would grep for>
- Cause: <root cause>
- Fix: <what resolved it>
- Date: YYYY-MM-DD
```

## The service ID not found
- Cause: the EmailJS service id hard-coded in `src/pages/Contact.jsx` no longer existed in the EmailJS account, so every contact form submission was rejected with HTTP 400.
- Fix: point `EMAILJS` at the account's active service id (PR #11), and log send failures with `console.error` so the status is visible (PR #12).
- Date: 2026-11-10
