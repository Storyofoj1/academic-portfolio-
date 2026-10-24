# Joseph Okologo — Personal Academic Portfolio

A responsive multi-page academic portfolio and student activity planner built with HTML, CSS, and JavaScript.

## Pages
- `index.html` — homepage and student introduction
- `about.html` — education, career goals, skills, interests, and education table
- `projects.html` — three sample projects and an HTML video element
- `planner.html` — add, complete, filter, and delete tasks; saves tasks in browser localStorage
- `contact.html` — required-field, email-format, and digits-only phone validation

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a modern browser. For best results, use a local development server such as VS Code Live Server.
3. Keep `styles.css`, `script.js`, and the `assets` folder alongside the HTML files.

## Publish with GitHub Pages
1. Create a GitHub repository named `academic-portfolio`.
2. Upload all files and folders in this project (not just the ZIP file).
3. In the repository, open **Settings → Pages**.
4. Select deployment from the `main` branch and the `/ (root)` folder, then save.
5. After GitHub Pages publishes, test all page links and submit both the live website URL and repository URL.

## Notes
- The planner stores tasks in the current browser using `localStorage`; it does not sync between devices.
- The contact form validates input in the browser but does not send email. Connect a backend or form service if message delivery is required.
- The sample video is externally hosted and requires an internet connection.
- Replace sample project details and self-assessed skill levels with accurate information before final submission.
