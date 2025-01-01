<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { getToken, getUserData, removeApiDomain, removeToken, removeUserAbilityRules, removeUserData } from '@/utils/auth'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const router = useRouter()
const ability = useAbility()
const token = getToken()
const userAuthStore = useAuthStore()

// TODO: Get type from backend
const userData = getUserData()

const logout = async () => {

  try {
    
    // Logout user
    await userAuthStore.logout()

    // Remove "accessToken" from cookie
    removeToken()

    // Remove "userData" from cookie
    removeUserData()

    // Remove "apiDomain" from cookie
    removeApiDomain()

    // Redirect to login page
    await router.push('/login')

    // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

    // Remove "userAbilities" from cookie
    removeUserAbilityRules()

    // Reset ability to initial ability
    ability.update([])

    // Notify user
    notify('Successfull!', 'You have been logged out successfully.', 'success', 'top-right')

  } catch (error) {
    notify(error?.response?.data?.error, error?.response?.data?.message, 'error', 'top-right')
  }
}

const profile = () => {
  router.push({ name: 'profile' })
}



const userProfileList = [
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'tabler-user',
    title: 'Profile',
    onClick: profile,
  },
  {
    type: 'navItem',
    icon: 'tabler-logout',
    title: 'Logout',
    onClick: logout,
  },
  
]


token  == undefined || !token ? router.push({ name: "login" }) : null
</script>

<template>
  <VBadge
    v-if="userData"
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      :color="!(userData && userData.avatar) ? 'primary' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <RouterLink :to="{ name: 'profile' }">
                <VListItemAction start>
                  <VBadge
                    dot
                    location="bottom right"
                    offset-x="3"
                    offset-y="3"
                    color="success"
                    bordered
                  >
                    <VAvatar
                      :color="!(userData && userData.avatar) ? 'primary' : undefined"
                      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
                    >
                      <VImg
                        v-if="userData && userData.avatar"
                        :src="userData.avatar"
                      />
                      <VIcon
                        v-else
                        icon="tabler-user"
                      />
                    </VAvatar>
                  </VBadge>
                </VListItemAction>
              </RouterLink>
            </template>
            <RouterLink :to="{ name: 'profile' }">
              <VListItemTitle class="font-weight-medium">
                {{ userData.first_name || userData.username }}
              </VListItemTitle>
            </RouterLink>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <template #prepend>
                  <VIcon
                    class="me-2"
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge v-bind="item.badgeProps" />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-2"
              />
            </template>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
