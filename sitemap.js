// sitemap.js
const fs = require('fs');
const { SitemapStream } = require('sitemap');
const path = require('path');

async function generateSitemap() {
  try {
    const links = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'weekly', priority: 0.8 },
      { url: '/microgreens', changefreq: 'weekly', priority: 0.9 },
      { url: '/cart', changefreq: 'daily', priority: 0.7 },
      { url: '/schedule', changefreq: 'monthly', priority: 0.6 },
    ];

    const sitemap = new SitemapStream({ hostname: 'https://www.folsommicrogreens.com' });
    const writePath = path.join(__dirname, 'public', 'sitemap.xml');
    const writeStream = fs.createWriteStream(writePath);

    // Listen for errors on the write stream
    writeStream.on('error', (err) => {
      console.error('Write stream error:', err);
    });

    // Pipe the sitemap to the write stream
    sitemap.pipe(writeStream);

    // Write each link to the sitemap
    links.forEach((link) => sitemap.write(link));
    
    // End the sitemap stream
    sitemap.end();

    // Wait for the sitemap to finish writing
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    console.log('Sitemap created successfully');
  } catch (error) {
    console.error('Error creating sitemap:', error);
  }
}

generateSitemap();
