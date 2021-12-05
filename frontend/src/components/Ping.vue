<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import pingData from '../../helpers/api';

export default {
  name: 'Ping',
  data() {
    return {
      msg: '',
    };
  },
  methods: {
    async getMessage() {
      const data = await pingData();
      console.log('Data: ', data);
      this.msg = data;
    },
  },
  async created() {
    await this.getMessage();
  },
};
</script>
