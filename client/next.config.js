const path = require('path');

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:5000/:path*',
			},
		];
	},
};
