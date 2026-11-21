# Contact form

`src/pages/Contact.jsx` sends the contact form straight from the browser with `@emailjs/browser` (`emailjs.sendForm`), using an `EMAILJS` constant at the top of the file (service id, template id, public key). The public key is a client-side key by design. No environment variables are used.

- The field `name` attributes must stay `name`, `email` and `message` to match the EmailJS template.
- On success it shows a `sonner` toast and resets the form. On failure it shows an error toast with the business phone number and logs the error with `console.error` (added in PR #12 so failures are visible).
- If submissions fail, open the browser console first: the logged EmailJS status and text show whether the service id, template id or key is wrong. The ids must match what exists in the EmailJS account.
- Changing the recipient or Reply-To is done in the EmailJS template, not in the repo.
