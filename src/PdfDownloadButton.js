import React from 'react';
import axios from 'axios';

const PdfDownloadButton = () => {
    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:8090/pagedAndSorted1', {
                responseType: 'blob', // Specify the response type as blob
            });
            // Create a URL for the PDF blob
            const pdfUrl = window.URL.createObjectURL(new Blob([response.data]));
            // Create an anchor element
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', 'user_details.pdf'); // Set the filename for the downloaded file
            // Trigger a click event to start downloading the file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <button onClick={handleDownload} className="btn btn-primary">
            Download PDF
        </button>
    );
};

export default PdfDownloadButton;
