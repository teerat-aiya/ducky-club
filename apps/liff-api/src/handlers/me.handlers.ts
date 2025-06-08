import * as sdk from "@directus/sdk";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const getMe = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  try {
    const { id } = c.get("jwtPayload");
    const profiles = await directus.request(
      sdk.readItems("advanced_profile", {
        fields: [
          "full_name",
          "contact_number",
          "house_number",
          "street",
          "soi",
          "moo",
          "village",
          "province",
          "city",
          "sub_district",
          "zip_code",
          { uid: ["uid", "display_name", "profile_picture"] },
        ],
        filter: {
          uid: {
            _eq: id,
          },
        },
      })
    );

    if (profiles.length === 0) {
      return c.json({ error: "Profile not found" }, 404);
    }

    const profile = profiles[0];
    const { uid, display_name, profile_picture } = profile.uid || {};

    return c.json(
      {
        ...profile,
        uid,
        display_name,
        profile_picture,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: "Invalid credentials" }, 401);
  }
});

export const updateMe = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  try {
    const { id } = c.get("jwtPayload");

    // First fetch the current profile to check if assessment_date exists
    const profiles = await directus.request(
      sdk.readItems("advanced_profile", {
        filter: {
          uid: {
            _eq: id,
          },
        },
      })
    );

    if (profiles.length === 0) {
      return c.json({ error: "Profile not found" }, 404);
    }

    const currentProfile = profiles[0];
    const body = await c.req.json();

    // Only set assessment_date if it doesn't already exist
    if (!currentProfile.assessment_date) {
      const now = formatDateBangkok();
      body.assessment_date = now;
    }

    const updatedProfile = await directus.request(
      sdk.updateItems(
        "advanced_profile",
        { filter: { uid: { _eq: id } } },
        body
      )
    );

    return c.json(updatedProfile);
  } catch (error) {
    console.error("Error updating advanced profile:", error);
    return c.json(0, 500);
  }
});
