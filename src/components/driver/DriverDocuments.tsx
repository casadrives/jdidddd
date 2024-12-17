import React, { useState } from 'react';
import { FileText, Upload, Check, AlertTriangle, RefreshCw } from 'lucide-react';

interface Document {
  id: string;
  type: 'license' | 'insurance' | 'medical' | 'background';
  name: string;
  status: 'valid' | 'expired' | 'pending';
  expiryDate?: string;
  uploadDate: string;
}

export function DriverDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      type: 'license',
      name: 'Driver License',
      status: 'valid',
      expiryDate: '2025-03-15',
      uploadDate: '2024-03-15',
    },
    {
      id: '2',
      type: 'insurance',
      name: 'Vehicle Insurance',
      status: 'valid',
      expiryDate: '2025-03-15',
      uploadDate: '2024-03-15',
    },
    {
      id: '3',
      type: 'medical',
      name: 'Medical Certificate',
      status: 'expired',
      expiryDate: '2024-02-15',
      uploadDate: '2023-02-15',
    },
  ]);

  const handleFileUpload = (type: Document['type']) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/pdf,image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In production, upload file to server
        console.log('Uploading file:', file);
      }
    };
    input.click();
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Document Management</h2>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                    {doc.expiryDate && (
                      <p className="text-sm text-gray-500">
                        Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <button
                    onClick={() => handleFileUpload(doc.type)}
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {doc.status === 'expired' && (
                <div className="mt-4 bg-red-50 rounded-lg p-3 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <div className="text-sm text-red-700">
                    <p className="font-medium">Action Required</p>
                    <p>This document has expired. Please upload a new one to continue accepting rides.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Upload New Document */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Upload New Document</h3>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload
                        console.log('Uploading file:', file);
                      }
                    }}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}