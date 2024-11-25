# JSON Bridge

JSON Bridge is a Next.js 15 application for seamless data conversion and API generation.

## Features
- Convert data formats: JSON, CSV, SQL
- Generate APIs in various languages: JavaScript, Python, etc.
- Responsive UI with TailwindCSS

## Development
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`

## Deployment
1. Build the app: `npm run build`
2. Start the app: `npm run start`

```
bridge-app/
├── app/
│   ├── api/
│   │   ├── conversion/
│   │   │   └── route.ts
│   │   ├── generate-api/
│   │   │   └── route.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ConverterPage.tsx
│   │   ├── APIGeneratorPage.tsx
│   ├── components/
│   │   ├── UploadForm.tsx
│   │   ├── DropdownMenu.tsx
│   │   ├── CodePreview.tsx
│   │   └── ConversionSummary.tsx
│   ├── global.d.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── dataConversionService.ts
│   ├── dbAdapterService.ts
│   └── apiTemplateService.ts
├── node_modules/
├── public/
├── .env.local
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tsconfig.json
```txt
