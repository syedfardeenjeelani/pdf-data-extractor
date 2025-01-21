import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

// Define types
interface FormData {
  name: string;
  phone: string;
  address: string;
  role: string;
}

// Declare PDF.js types
declare global {
  interface Window {
    "pdfjs-dist/build/pdf": any;
  }
}

// Initialize PDF.js
const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

const PDFExtractor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    role: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const extractInformation = (text: string): FormData => {
    // Enhanced regex patterns
    const namePattern = /(?:name[:\s]+)([A-Za-z\s]+)/i;
    const phonePattern = /(?:phone|tel|mobile)[:\s]+([0-9+\-\s()]{10,})/i;
    const addressPattern = /(?:address[:\s]+)([A-Za-z0-9\s,.-]+)/i;
    const rolePattern =
      /(?:role|position|title|designation)[:\s]+([A-Za-z\s]+)/i;

    const nameMatch = text.match(namePattern);
    const phoneMatch = text.match(phonePattern);
    const addressMatch = text.match(addressPattern);
    const roleMatch = text.match(rolePattern);

    return {
      name: nameMatch ? nameMatch[1].trim() : "",
      phone: phoneMatch ? phoneMatch[1].trim() : "",
      address: addressMatch ? addressMatch[1].trim() : "",
      role: roleMatch ? roleMatch[1].trim() : "",
    };
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = "";

      // Extract text from all pages
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: { str: string }) => item.str)
          .join(" ");
        fullText += pageText + " ";
      }

      // Extract information using regex patterns
      const extractedData = extractInformation(fullText);
      setFormData(extractedData);
    } catch (error) {
      console.error("Error processing PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>PDF Information Extractor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF files only</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
              </label>
            </div>

            {loading && (
              <div className="text-center text-gray-500">Processing PDF...</div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Extracted name will appear here"
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Extracted role will appear here"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Extracted phone number will appear here"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Extracted address will appear here"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFExtractor;
