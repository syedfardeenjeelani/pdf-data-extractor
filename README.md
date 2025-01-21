# PDF Information Extractor

A React-based application that extracts information (Name, Role, Phone Number, and Address) from PDF documents using PDF.js and automatically populates form fields. Built with React, TypeScript, and Tailwind CSS.

![PDF Extractor Demo]c:\Users\Syedf\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20250121-0944-40.5377217.mp4

## Features

- 📄 PDF file upload and processing
- 🔍 Automatic extraction of:
  - Names
  - Roles/Positions
  - Phone Numbers
  - Addresses
- ✏️ Editable form fields for manual corrections
- 💅 Modern UI with Tailwind CSS and shadcn/ui components
- 📱 Responsive design 

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/syedfardeenjeelani/pdf-data-extractor.git
cd pdf-data-extractor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Project Structure

```
pdf-data-extractor/
├── src/
│   ├── components/
│   │   └── PDFExtractor.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Dependencies

- React
- TypeScript
- PDF.js
- Tailwind CSS
- shadcn/ui
- Lucide React Icons

## Usage

1. Open the application in your web browser
2. Click the upload area or drag and drop a PDF file
3. The application will automatically:
   - Process the PDF
   - Extract relevant information
   - Populate the form fields
4. Review and edit the extracted information if needed

## Supported PDF Formats

The extractor works best with PDFs that have:
- Clearly labeled fields (e.g., "Name:", "Phone:", etc.)
- Text-based content (not scanned images)
- Standard formatting for contact information

## Pattern Recognition

The application looks for the following patterns:
- Names: Following "name:" or similar labels
- Roles: Following "role:", "position:", "title:", or "designation:"
- Phone Numbers: Following "phone:", "tel:", or "mobile:"
- Addresses: Following "address:" until the next section

## Customization

### Adding New Fields

1. Update the `FormData` interface:
```typescript
interface FormData {
  name: string;
  phone: string;
  address: string;
  role: string;
  // Add your new field here
}
```

2. Add a new regex pattern in `extractInformation`:
```typescript
const newFieldPattern = /(?:fieldName[:\s]+)([A-Za-z0-9\s]+)/i;
```

3. Add the corresponding form field in the JSX

### Modifying Extraction Patterns

Adjust the regex patterns in `extractInformation` to match your specific PDF formats:
```typescript
const namePattern = /(?:name[:\s]+)([A-Za-z\s]+)/i;  // Modify as needed
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat/fix: AmazingFeature/fix'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- PDF.js for PDF parsing capabilities
- shadcn/ui for the beautiful UI components
- Tailwind CSS for styling
- Vite for the build system

## Support

For support, please open an issue in the GitHub repository or contact [syedfardeenjeelani13@gmail.com]