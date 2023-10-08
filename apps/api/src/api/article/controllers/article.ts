/**
 * article controller
 */

import { factories } from "@strapi/strapi";
import type { Strapi } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);
      data.forEach((d) => {
        const base = process.env.API_URL;
        const relativePath = d.attributes.cover.data.attributes.url;
        d.attributes.cover.data.attributes.url = base + relativePath;
      });
      return { data, meta };
    },
  }),
);
