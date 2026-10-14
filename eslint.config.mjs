import next from "eslint-config-next"

// components/ui and hooks are unused shadcn scaffolding.
const config = [...next, { ignores: [".next/**", "components/ui/**", "hooks/**"] }]

export default config
