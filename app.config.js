import 'dotenv/config';

module.exports = ({ config }) => {
    if (process.env.REACT_APP_ENV === 'production') {
        return {
            /* your production config */
            ...config,

            // All values in extra will be passed to your app.
            extra: {
                appName: process.env.REACT_APP_NAME,
                appSlug: process.env.REACT_APP_SLUG,
                appVersion: process.env.REACT_APP_VERSION || '1.0.0',
                appEnvironment: process.env.REACT_APP_ENV,
                appApiUrl: process.env.REACT_APP_API_URL,
                appCloudinaryCloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
                appCloudinaryApiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
                appCloudinaryApiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
                appCloudinaryUploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            },
        };
    } else {
        return {
            /* your development config */
            ...config,

            // All values in extra will be passed to your app.
            extra: {
                appName: process.env.REACT_APP_NAME,
                appSlug: process.env.REACT_APP_SLUG,
                appVersion: process.env.REACT_APP_VERSION || '1.0.0',
                appEnvironment: process.env.REACT_APP_ENV,
                appApiUrl: process.env.REACT_APP_API_URL,
                appCloudinaryCloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
                appCloudinaryApiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
                appCloudinaryApiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
                appCloudinaryUploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            },
        };
    }
}