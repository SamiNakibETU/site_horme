import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL?.replace(/\/$/, '') || 'http://localhost:3000'

export default defineConfig({
  name: 'cie-horme',
  title: 'Cie. Horme',
  projectId: projectId || 'replace-with-project-id',
  dataset,
  plugins: [
    structureTool({ structure }),
    media(),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
})
