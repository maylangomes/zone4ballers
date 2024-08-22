async function uploadProductImage(productId: number, selectedFile: any) {
  try {
    const response = await fetch('/api/controllers/uploadImageController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        file: selectedFile,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Server error response:', errorMessage);
      throw new Error(`Error uploading image: ${errorMessage}`);
    }

    const data = await response.json();
    // console.log('Image uploaded successfully:', data.imageUrl);
    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image.');
  }
}
