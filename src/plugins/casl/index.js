import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'
import { getUserAbilityRules } from '@/utils/auth'

export default async function (app) {

  const userAbilityRules = JSON.parse(getUserAbilityRules())

  const initialAbility = createMongoAbility(userAbilityRules ?? [])

  app.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
}
