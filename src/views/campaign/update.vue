<!-- eslint-disable camelcase -->
<template>
  <div>
    <NewsForm v-loading="loading" :rule-form="ruleForm" mode="update" />
  </div>
</template>

<script setup lang="ts">
import { useCampaignStore } from "@/stores/tourism/campaignStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NewsForm from "./campaignForm.vue";

const route = useRoute();

const campaignStore = useCampaignStore();

const ruleForm = ref({});
const loading = ref(false);

const getNewsDetails = async () => {
  loading.value = true;

  const { data } = await campaignStore.editCampaign({ id: route.params.id });

  ruleForm.value = data.data;

  loading.value = false;
};

onMounted(() => {
  getNewsDetails();
});
</script>
