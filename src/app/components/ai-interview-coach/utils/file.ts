// A helper to safely get the pdfjsLib, waiting up to 10 seconds for it to load.
const getPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const timeout = 10000; // 10 seconds
    const startTime = Date.now();

    const checkInterval = setInterval(() => {
      const pdfjsLib = (window as any).pdfjsLib;
      if (pdfjsLib) {
        clearInterval(checkInterval);
        // Configure the worker as soon as the library is available. This is the correct place.
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        resolve(pdfjsLib);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error("Timed out waiting for PDF.js to load."));
      }
    }, 100);
  });
};

// A single function to handle reading different file types
export const readFileContent = (file: File): Promise<string> => {
  // Use file extension as a fallback if mime type is generic
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    // --- PDF Reading Logic ---
    return new Promise(async (resolve, reject) => {
      try {
        const pdfjs = await getPdfJs();
        const reader = new FileReader();

        reader.onload = async (event) => {
          if (!event.target?.result) {
            return reject(new Error("Failed to read file buffer."));
          }
          try {
            const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
            const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              // Join text items with a space, and pages with a newline
              const pageText = textContent.items.map((item: any) => item.str).join(' ');
              fullText += pageText + '\n';
            }
            resolve(fullText.trim());
          } catch (error) {
            console.error("Error parsing PDF:", error);
            reject(new Error("Could not parse the PDF file. It might be corrupted or image-based."));
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      } catch (error) {
        // This will catch the rejection from getPdfJs (e.g., timeout)
        console.error("Failed to load PDF.js library:", error);
        reject(new Error("PDF.js library not found. Please check your network connection or try refreshing the page."));
      }
    });
  } else {
    // --- Plain Text Reading Logic (for .txt, .md, etc.) ---
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
};