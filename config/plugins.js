module.exports = ({ env }) => {
  return {

    "rest-cache": {
      config: {
        provider: {
          name: "memory",
          options: {
            max: 32767,
            updateAgeOnGet: false,
            connection: "default",
          },
        },
        strategy: {
          maxAge: 604800,
          contentTypes: ["api::blog.blog", "api::category.category"],
        },
      },
    },

    upload: {
      config: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
        actionOptions: {
          upload: { asset_folder: "blogsImage" },
        },
        uploadStream: { asset_folder: "blogsImage" },
        delete: {},
      },
    },
    "wysiwyg-react-md-editor": {
      enabled: true,
    }
  };
};
