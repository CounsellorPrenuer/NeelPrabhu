import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Neel Prabhu Studio",
  projectId: "ivm39if0",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings (images & logo)")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["siteSettings"].includes(item.getId() || ""),
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
