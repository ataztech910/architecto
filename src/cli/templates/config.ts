export const configTemplate = `name: My Project
version: 0.1.0
description: An Architecto project

specs:
  directory: ./specs

  # Optional: validate specs on every save
  validateOnSave: false

  # Optional: which spec kinds to validate
  kinds:
    - flow
    - interface
    - artifact
    - policy
    - behavior
    - workspace

# Generation targets (optional, for v0.2)
generation:
  # Example framework targets
  # - framework: nextjs
  #   outputDir: ./app
  #   templates: ./templates
  # - framework: fastapi
  #   outputDir: ./api
  #   templates: ./templates
`;
