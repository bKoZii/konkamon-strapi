const env = (key) => {
  return process.env[key]
}
const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
const firebaseKey = {
  type: "service_account",
  project_id: "konkamon-nuxt-vue",
  private_key_id: env("FIREBASE_PRIVATE_KEY_ID"),
  private_key: privateKey,
  client_email: env("FIREBASE_CLIENT_EMAIL"),
  client_id: env("FIREBASE_CLIENT_ID"),
  auth_uri: env("FIREBASE_AUTH_URI"),
  token_uri: env("FIREBASE_TOKEN_URI" ),
  auth_provider_x509_cert_url: env("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
  client_x509_cert_url: env("FIREBASE_CLIENT_X509_CERT_URL"),
  universe_domain: env("FIREBASE_UNIVERSE_DOMAIN"),
};

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-firebase-storage",
      providerOptions: {
        serviceAccount: firebaseKey,
        bucket: env("STORAGE_BUCKET_URL", "gs://konkamon-nuxt-vue.appspot.com"),
        sortInStorage: true,
        debug: false,
      },
    },
  },
});
