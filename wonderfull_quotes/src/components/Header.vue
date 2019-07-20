<template>
  <div class="row mt-3 mb-3">
    <div class="col-md-12">
      <h3>Quotes Added</h3>
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :style="{width: (quoteCount / maxQuotes) * 100 + '%'}">
          {{ quoteCount }} / {{ maxQuotes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['quoteCount', 'maxQuotes']
  }
</script>

<style>

</style>
