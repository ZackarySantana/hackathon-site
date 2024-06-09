import https from 'https';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES module scope
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create the fonts directory if it doesn't exist
const fontsDir = join(__dirname, 'fonts');
if (!existsSync(fontsDir)) {
	mkdirSync(fontsDir);
}

// Array of font URLs
const fontUrls = [
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-Medium-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-Semibold-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-SemiboldItalic-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-MediumItalic-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-Regular-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/EuclidCircularA-RegularItalic-WebXL.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MongoDBValueSerif-Regular.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/SourceCodePro-Semibold.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/SourceCodePro-SemiboldItalic.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/SourceCodePro-Regular.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/SourceCodePro-Italic.woff2?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIcons-Regular.eot?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIcons-Regular.woff?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIcons-Regular.ttf?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSOrgIcons-Regular.eot?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSOrgIcons-Regular.woff?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSOrgIcons-Regular.ttf?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIllustrations-Regular.eot?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIllustrations-Regular.woff?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74',
	'https://assets.mongodb-cdn.com/mms/static/font/MMSIllustrations-Regular.ttf?_ds=223792ae5be9379bc0152f8cc9a7a5edcb802a74'
];

// Function to download each font
fontUrls.forEach((url) => {
	const fileName = url.split('/').pop().split('?')[0]; // Get the file name from URL
	const filePath = join(fontsDir, fileName);

	https
		.get(url, (response) => {
			const fileStream = createWriteStream(filePath);
			response.pipe(fileStream);

			fileStream.on('finish', () => {
				fileStream.close();
				console.log('Downloaded:', fileName);
			});
		})
		.on('error', (error) => {
			console.error('Error downloading:', fileName, error);
		});
});
