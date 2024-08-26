module.exports = ({ env }) => {
  const redisURL = env("REDIS_URL");
  const splitRedis = redisURL.split(/[\/\/,:,@]+/);
  const redisPassword = splitRedis[1];
  const redisHost = splitRedis[2];
  const redisPort = splitRedis[3];
  return {
    redis: {
      config: {
        connections: {
          default: {
            connection: {
              host: redisHost,
              port: redisPort,
              db: 0,
              password: redisPassword,
            },
            settings: {
              debug: false,
            },
          },
        },
      },
    },
    "rest-cache": {
      config: {
        provider: {
          name: "redis",
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
