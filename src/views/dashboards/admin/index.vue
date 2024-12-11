

<template>
  <div>
    <VRow class="py-6">
      <!-- 👉 Welcome -->
      <VCol
        cols="12"
        md="6"
        :class="$vuetify.display.mdAndUp ? 'border-e' : 'border-b'"
      >
        <ElCard class="mb-4">
          <h5 class="text-h5 mb-2">
            Welcome back to,<span class="text-h4"> Cox's bazar admin panel </span>
          </h5>

          <div
            class="text-wrap text-body-1"
            style="max-inline-size: 360px"
          >
            Your progress this week is Awesome. let's keep it up and get a lot
            of points reward!
          </div>
        </ElCard>
        
        <ElCard>
          <div class="d-flex justify-space-between align-center py-4">
            <div class="d-flex flex-column ps-3">
              <h5 class="text-h5 mb-1 text-no-wrap">
                Total Visitors
              </h5>
             
              <p class="text-h4 mb-2">
                1,231
              </p>
              <div class="text-body-1 ">
                Total Download
              </div>
              <p class=" mb-2">
                46,54,654 times
              </p>
              <div>
                <VChip
                  color="primary"
                  label
                  size="small"
                >
                  +18.4%
                </VChip>
                <VChip
                  color="success"
                  label
                  size="small"
                  class="ms-2"
                >
                  +20.4%
                </VChip>
              </div>
            </div>
          </div>
          <div class="d-flex justify-space-between align-center py-4">
            <div class="d-flex flex-column ps-3">
              <h5 class="text-h5 mb-1 text-no-wrap">
                Total Visitors
              </h5>
             
              <p class="text-h4 mb-2">
                1,231
              </p>
              <div class="text-body-1 ">
                Total Download
              </div>
              <p class=" mb-2">
                46,54,654 times
              </p>
              <div>
                <VChip
                  color="primary"
                  label
                  size="small"
                >
                  +18.4%
                </VChip>
                <VChip
                  color="success"
                  label
                  size="small"
                  class="ms-2"
                >
                  +20.4%
                </VChip>
              </div>
            </div>
          </div>
        </ElCard>
      </VCol>

      
      
      <VCol
        cols="12"
        md="6"
      >
        <VRow>
          <VCol
            v-for="{ title, value, icon, color } in [
              {
                title: 'Hotel',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
              {
                title: 'Locker',
                value: '82%',
                icon: customLightbulb,
                color: 'info',
              },
              {
                title: 'Bank',
                value: '14',
                icon: customCheck,
                color: 'warning',
              },
              {
                title: 'ATM',
                value: '14',
                icon: customCheck,
                color: 'warning',
              },
              {
                title: 'Life Guard',
                value: '14',
                icon: customCheck,
                color: 'success',
              },
              {
                title: 'Beach Volunteer',
                value: '14',
                icon: customCheck,
                color: 'success',
              },
              {
                title: 'Police',
                value: '82',
                icon: customLightbulb,
                color: 'info',
              },
              {
                title: 'Campaign',
                value: '82',
                icon: customLightbulb,
                color: 'info',
              },
              {
                title: 'Transport',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
              {
                title: 'Doctor',
                value: '34',
                icon: customLaptop,
                color: 'info',
              },
              {
                title: 'Events',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
              {
                title: 'Tourist Spot',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
              {
                title: 'Doctor',
                value: '34',
                icon: customLaptop,
                color: 'info',
              },
              {
                title: 'Events',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
              {
                title: 'Tourist Spot',
                value: '34',
                icon: customLaptop,
                color: 'primary',
              },
            ]"
            :key="title"              
            cols="12"
            md="4"
          >
            <ElCard>
              <div class="d-flex align-center">
                <VAvatar
                  variant="tonal"
                  :color="color"
                  rounded
                  size="40"
                  class="text-primary me-4"
                >
                  <VIcon
                    :icon="icon"
                    size="30"
                  />
                </VAvatar>
                <div>
                  <h6 class="text-h6 text-medium-emphasis">
                    {{ title }}
                  </h6>
                  <h4
                    class="text-h4"
                    :class="`text-${color}`"
                  >
                    {{ value }}
                  </h4>
                </div>
              </div>
            </ElCard>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <ElCard>
          <div class="d-flex justify-space-between align-center py-4">
            <div class="d-flex flex-column ps-3">
              <h5 class="text-h5 mb-1 text-no-wrap">
                Total Visitors
              </h5>
             
              <p class="text-h4 mb-2">
                1,231
              </p>
              <div class="text-body-1 ">
                Total Download
              </div>
              <p class=" mb-2">
                46,54,654 times
              </p>
              <div>
                <VChip
                  color="primary"
                  label
                  size="small"
                >
                  +18.4%
                </VChip>
                <VChip
                  color="success"
                  label
                  size="small"
                  class="ms-2"
                >
                  +20.4%
                </VChip>
              </div>
            </div>
          </div>
        </ElCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
