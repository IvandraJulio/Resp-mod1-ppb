# 📚 Library Loans API

A minimal yet production‑ready REST API for managing book‑loan records in a library. Built with **Node.js**, **Express**, and **Supabase** (PostgreSQL‑as‑a‑service) and ready for one‑click deployment on **Vercel**.

---

## 🎯 Project purpose
- Store loan transactions (`member_id`, `book_id`, dates, status).
- Provide classic **CRUD** operations.
- Offer **filterable queries** (e.g. `GET /api/loans?status=Late`).
- Deployable as a serverless function → publicly reachable URL.

---

## 🔧 Data schema
| Column       | Type | Description |
|--------------|------|-------------|
| `id`         | `uuid` (PK) | Auto‑generated identifier |
| `member_id`  | `text` | Library member identifier |
| `book_id`    | `text` | Book identifier |
| `loan_date`  | `timestamp` | When the loan started |
| `due_date`   | `timestamp` | Expected return date |
| `return_date`| `timestamp` (nullable) | Actual return date |
| `status`     | `text` (`Ongoing`, `Returned`, `Late`) | Current state |

### Supabase table creation (SQL)
```sql
create table loans (
  id uuid primary key default uuid_generate_v4(),
  member_id text not null,
  book_id text not null,
  loan_date timestamptz default now(),
  due_date timestamptz,
  return_date timestamptz,
  status text check (status in ('Ongoing','Returned','Late')) default 'Ongoing'
);
```
> **Tip:** In Supabase → *Table editor* → “New Table”, paste the columns above; Supabase automatically creates the `uuid_generate_v4()` extension.

---

## 📦 Installation & local development
```bash
# Clone the repo (once pushed)
git clone https://github.com/IvandraJulio/Resp-mod1-ppb.git
cd Resp-mod1-ppb/library-loans-api

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env and paste your Supabase URL & anon key

# Run locally
npm run dev   # http://localhost:3000
```

### Available endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/loans` | Create a new loan |
| `GET`  | `/api/loans` | List all loans (filters via query) |
| `GET`  | `/api/loans/:id` | Retrieve a single loan |
| `PATCH`| `/api/loans/:id` | Partial update (e.g., mark returned) |
| `DELETE`| `/api/loans/:id` | Delete a loan |

#### Sample request
```bash
curl -X POST https://<your‑vercel‑url>/api/loans \
  -H "Content-Type: application/json" \
  -d '{"member_id":"M001","book_id":"B123","due_date":"2026-11-01T00:00:00Z"}'
```

#### Sample response
```json
{
  "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  "member_id": "M001",
  "book_id": "B123",
  "loan_date": "2026-10-09T22:00:00.000Z",
  "due_date": "2026-11-01T00:00:00.000Z",
  "return_date": null,
  "status": "Ongoing"
}
```

---

## 🚀 Deploy to Vercel (one‑click)
1. **Create a GitHub repository** (public) and push the code (see below for git commands).
2. Go to **Vercel → New Project** → import the GitHub repo.
3. In the **Environment Variables** section, add:
   - `SUPABASE_URL` – your Supabase project URL
   - `SUPABASE_ANON_KEY` – your anon key
   - `PORT` (optional) – Vercel overrides it automatically
4. Click **Deploy** – Vercel will run `npm install` then start the server via `@vercel/node`.
5. After deployment, Vercel shows a **Base URL** (e.g. `https://library-loans-api.vercel.app`).
   Use that URL to call the API exactly as you would locally.

---

## 📂 Repository layout (quick reference)
```
/library-loans-api
│─ package.json
│─ .gitignore
│─ .env.example
│─ vercel.json
│─ README.md
└─ src/
   │─ index.js            ← Express app entry
   │─ db/
   │   └─ supabaseClient.js
   └─ routes/
       └─ loans.js       ← CRUD + filter logic
```

---

## 📝 License
MIT – feel free to fork, extend, or ship it as part of a larger system.

---

## 🔗 Next steps for you
1. **Push the code** to the repo you shared (`Resp-mod1-ppb`). Use the Git commands below.
2. **Create a Supabase project** (if you don’t have one) and run the SQL schema.
3. **Add the Supabase credentials** to the `.env` file locally.
4. **Deploy to Vercel** following the guide above.

Once deployed, you’ll have a **public REST API** ready for any front‑end (mobile, web) to consume. 🎉
