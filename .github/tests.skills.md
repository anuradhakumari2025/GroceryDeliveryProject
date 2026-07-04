Skill: Test Generation
Purpose: Guidance and steps for generating unit and e2e tests for this repository.

Steps:
1. Identify the target: controller, model, route, or React component.
2. For backend unit tests use Jest. Mock database interactions (`mongoose` models) and external services (`cloudinary`, `razorpay`).
3. For frontend component tests use React Testing Library with Jest. Render components with required context from `src/context/AppContext.jsx`.
4. For e2e use Playwright under `e2e-tests/tests/specs` and point tests at `http://localhost:5173` (frontend) and backend API base (default `http://localhost:3000`).
5. Add fixtures in `e2e-tests/tests/fixtures` and avoid storing secrets—use placeholders documented in the generated README snippet.

Filenames and placement:
- Backend unit tests: `backend/tests/<module>.spec.js`.
- Frontend component tests: `frontend/src/__tests__/<Component>.test.jsx`.
- Playwright specs: `e2e-tests/tests/specs/<feature>.spec.js`.

Run commands to add to run snippet:
```
# Backend unit tests
cd backend && npm install --save-dev jest @types/jest supertest
npx jest --runInBand

# Frontend unit tests
cd frontend && npm install --save-dev @testing-library/react @testing-library/jest-dom jest
npx jest

# Playwright e2e
cd e2e-tests && npm install
npx playwright test
```

Checklist for generated tests:
- Include clear `describe`/`it` blocks with one assertion per `it` where practical.
- Mock network and filesystem where appropriate.
- Provide short run instructions and environment placeholders.
