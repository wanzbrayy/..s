const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 3000; // Port untuk menjalankan server proxy
const OPENAI_API_KEY =
  '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'; // API Key Anda

app.use(express.json());

// Endpoint proxy "Awan"
app.post('/awan', async (req, res) => {
  try {
    console.log('Proxy: Awan | Agama: Islam'); // Log identitas proxy

    // Kirim permintaan ke OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      req.body, // Data permintaan dari klien
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`, // API Key hanya digunakan di backend
          'Content-Type': 'application/json',
        },
      }
    );

    // Kembalikan hasil dari OpenAI ke klien
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Kesalahan:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Terjadi kesalahan saat memproses permintaan.',
    });
  }
});

// Menjalankan server proxy
app.listen(PORT, () => {
  console.log(`Proxy "Awan" berjalan di http://localhost:${PORT}`);
});
