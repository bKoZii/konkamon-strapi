"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::blog.blog');
module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    const query = strapi.db.query("api::blog.blog");

    await Promise.all(
      data.map(async (item, index) => {
        await query.findOne({
          where: {
            id: item.id,
          },
        });
      })
    );

    return { data, meta };
  },
  async findOne(ctx) {
    const { slug } = ctx.params;

    const query = {
      filters: { slug },
      ...ctx.query,
    };

    const post = await strapi.entityService.findMany("api::blog.blog", query);

    // const sanitizedEntity = await this.sanitizeOutput(post);

    return this.transformResponse(post[0]);
  },
}));
