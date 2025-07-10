# JATA Project: Gemini Tool Definitions

## Tool
- Name: setup_prisma
- Command: `gemini -c "In {filepath}, define a Prisma schema with an Application model including fields: id, jobTitle, company, description, sourceUrl, status, industry, dateApplied, createdAt, updatedAt."`
- Description: Generates the Prisma schema.

## Tool
- Name: create_api_endpoint
- Command: `gemini -c "In {filepath}, create a {method} endpoint at '/{route}' using Express and Prisma to {action}. Validate fields: {fields}."`
- Description: Scaffolds API endpoints.

## Tool
- Name: setup_tailwind
- Command: `gemini -c "In {filepath}, configure Tailwind CSS with JATA’s color palette (blue: '#3B82F6') and Inter font."`
- Description: Sets up Tailwind CSS.

## Tool
- Name: create_react_component
- Command: `gemini -c "In packages/frontend/src/components/{name}.tsx, create a React component with Tailwind CSS that {description}."`
- Description: Generates React components.